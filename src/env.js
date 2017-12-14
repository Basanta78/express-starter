import dotenv from 'dotenv';

/**
 * Initialize environment variables.
 */
dotenv.config();
export default {
  auth: {
    accessTokenExpiry: process.env.ACCESS_TOKEN_DURATION || 120,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_DURATION || 86400000,
    accessTokenSalt: process.env.ACCESS_TOKEN_SALT || 'authenTICaTION',
    refreshTokenSalt: process.env.REFRESH_TOKEN_SALT || 'authenTICaTION',
  }
}
