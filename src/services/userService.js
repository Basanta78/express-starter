import Boom from 'boom';
import User from '../models/user';
import todo from '../models/todo';
import Token from '../models/tokens';
import * as jwt from '../utils/jwt';

let bcrypt = require('bcrypt');


/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id) {
  return new User({
    id
  }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }

    return user;
  });
}
/**
 * Get a user by email.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUserByEmail(email) {
  let user = new User({
    email
  }).fetch();
  return user.then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }
    return user;
  })
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createUser(user) {
  return new User({
    name: user.name,
    email: user.email,
    password: bcrypt.hashSync(user.password, 8)
  }).save().then(user => user.refresh());
}

export async function validateUser(user) {
  try {
    let users = await getUserByEmail(user.email);
    if (bcrypt.compareSync(user.password, users.toJSON().password)) {
      return users
    } else {
      throw new Boom.notFound('Invalid password');
    }
  } catch (err) {
    throw err;
  }

}

export async function loginUser(user) {
  try {
    let validUser = await validateUser(user);
    let accessToken = await jwt.generateAccessToken(user);
    let refreshToken = await jwt.generateRefreshToken(user);
    validUser.token().save({
      token:refreshToken
    });
    return {
      user: validUser,
      token: {
        access: accessToken,
        refresh: refreshToken
      }
    };
  } catch (err) {
    throw err;
  }

}

/**
 * Verify user registration.
 *
 */
export async function verifyUser(token) {

  return await jwt.verifyAccessToken(token);
}
/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user) {
  return new User({
      id
    })
    .save({
      name: user.name
    })
    .then(user => user.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}ls
 */
export function deleteUser(token) {
  try {
    // jwt.verifyRefreshToken(token);
    return new Token({
      token
    }).fetch().then(token => token.destroy());
  } catch (error) {
    throw error;
  }
}
export function validateRefreshToken(token) {
  return new Token({
    token
  }).fetch().then(token => {
    if (!token) {
      throw new Boom.notFound('Token not found');
    }

    return token;
  });
}
