import Boom from 'boom';
import User from '../models/user';
import todo from '../models/todo';
import token from '../models/tokens';
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
  return new User({ id }).fetch().then(user => {
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
  return new User({email}).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }
    return user;
  });
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
    password: bcrypt.hashSync(user.password,8)
  }).save().then(user => user.refresh());
}

export function validateUser(user){
  console.log(user);
  return getUserByEmail(user.email).then(obtainUser=>{
    return bcrypt.compareSync(user.password, obtainUser.get('password'));
  })
}
async function storeToken(user,refreshToken){
  return new token({
    user_id: user.id,
    token: refreshToken
  }).save().then(token => token.refresh());
}
export async function loginUser (user) {
    let validate  = await validateUser(user);

    if(validate){
      try{
        let accessToken = await jwt.generateAccessToken(user);
        let refreshToken = await jwt.generateRefreshToken(user);
         console.log(refreshToken)
        // await storeToken(user,refreshToken);
        return  {
          user: user.email,
          token:{
              access:accessToken,
              refresh: refreshToken
            }

        };
        // return userInfo;

      }

      catch(err) {
        throw( err );
      }
    }

}

/**
 * Verify user registration.
 *
 */
export async function verifyUser(token) {
  await jwt.verifyAccessToken(token);
  // var decoded = jwt.decode(token);
  // console.log(decoded);
  return {"verified":true};
}
/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user) {
  return new User({ id })
    .save({ name: user.name })
    .then(user => user.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}
