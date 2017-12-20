import { userloginValidator } from "../validators/userValidator";
import * as userService from "../services/userService";
import { Router } from "express";
import * as HttpStatus from "http-status-codes";
const router = Router();
let jwt = require('jsonwebtoken');
/**
 * POST /api/users
 */
router.get('/',ensureToken, (req, res, next) => {
    userService
      .verifyUser(req.token)
      .then(data => res.status(HttpStatus.CREATED).json({ data }))
      .catch(err => res.sendStatus(401));

});
function ensureToken(req,res,next){
  const bearerHeader = req.headers["authorization"];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else{
    res.sendStatus(403);
  }
}

export default router;
