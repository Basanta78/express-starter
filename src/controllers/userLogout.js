import { userloginValidator } from "../validators/userValidator";
import * as userService from "../services/userService";
import { Router } from "express";
import * as HttpStatus from "http-status-codes";
const router = Router();
let jwt = require('jsonwebtoken');
/**
 * POST /api/users
 */
router.delete('/', (req, res, next) => {
  let authorizationString = req.headers.authorization.substring(7);
  userService
    .deleteUser(authorizationString)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});
export default router;
