import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as todoService from '../services/todoService';
import { findtodo, todoValidator } from '../validators/todoValidator';

const router = Router();

/**
 * GET /api/todo
 */
router.get('/', (req, res, next) => {
  todoService
    .getAlltodos()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});
router.get('/:id', (req, res, next) => {
  todoService
    .gettodo(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});
/**
 * POST /api/todo
 */
router.post('/', (req, res, next) => {
  todoService
    .createTodo(req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/todo/:id
 */
router.put('/:id', findtodo, todoValidator, (req, res, next) => {
  todoService
    .updateTodo(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/todo/:id
 */
router.delete('/:id', findtodo, (req, res, next) => {
  todoService
    .deleteTodo(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});


export default router;
