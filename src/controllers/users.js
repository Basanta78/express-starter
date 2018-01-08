import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as userService from '../services/userService';
import * as todoService from '../services/todoService';

import { findUser, userValidator } from '../validators/userValidator';
import { findtodo, todoValidator, todoPutValidator } from '../validators/todoValidator';

import * as jwt from "../utils/jwt";

const router = Router();
function ensureToken(req,res,next){
  const bearerHeader = req.headers["authorization"];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    try{
      jwt.verifyAccessToken(req.token);
      next();
    }
    catch (err){
      res.sendStatus(401);
    }


  }
  else{
    res.sendStatus(400);
  }
}

/**
 * GET /api/users
 */
router.get('/', (req, res, next) => {
  userService
    .getAllUsers()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});


/**
 * GET /api/users/:id
 */
router.get('/:id', (req, res, next) => {
  userService
    .getUser(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/users/:id/todo
 */
router.get('/:id/todo',ensureToken, (req, res, next) => {
  todoService
    .getUserTodo(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});
router.get('/:id/todo/:pageNo', (req, res, next) => {
  todoService
    .getUserPageTodo(req.params.id, req.params.pageNo)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});
router.get('/:id/:search/',(req,res,next) =>{
  todoService
    .searchText(req.params.id,req.params.search)
    .then(data => res.json({data}))
    .catch(err => next(err));

});


/**
 * POST /api/users
 */
router.post('/', userValidator, (req, res, next) => {
  userService
    .createUser(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

router.post('/:id/todo',ensureToken,todoValidator, (req, res, next) => {
  todoService
    .createUserTodo(req.params.id, req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});
/**
 * PUT /api/users/:id/todo/:todoId
 */
router.put('/:id/todo/:todoId', ensureToken,findtodo,todoPutValidator, (req, res, next) => {

  todoService
    .updateTodo(req.params.todoId, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/users/:id/todo/:todoId
 */

router.delete( '/:id/todo/:todoId',ensureToken, findtodo, ( req, res, next ) => {
  todoService
    .deleteTodo( req.params.todoId )
    .then(data => res.json({"message": "delete success" }))
    .catch(err => next(err));
});


export default router;
