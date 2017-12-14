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
  // let token = req.params.token;
  console.log(req.token);
  userService
    .verifyUser(req.token)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
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
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjoiZGF0YSIsImlhdCI6MTUxMzA5MjY1MSwiZXhwIjoxNTEzMDkyNzcxfQ.N0SfbH5YdFL7hmjMTaJqPm3rWUg2Z7-IAFk0zux7HLw
