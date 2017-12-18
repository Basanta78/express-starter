import auth from '../env'
var jwt = require('jsonwebtoken');
/**
 * Return access token.
 *
 * @param data
 * @returns {string}
 */
export function generateAccessToken(data) {
  return jwt.sign({ encryptedData: 'data' }, "secret", { expiresIn: 120 });
}
/**
 * Return refresh token.
 *
 * @param data
 * @returns {string}
 */
export function generateRefreshToken(data) {
  return jwt.sign({ encryptedData: data },"refreshsecret", { expiresIn: 12000});
}

/**
 * Verify access token.
 *
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, "secret");
}

/**
 * Verify refresh token.
 *
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, "refreshsecret");
}
