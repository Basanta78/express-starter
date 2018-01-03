import Joi from 'joi';
import validate from '../utils/validate';
import * as todoService from '../services/todoService';

const SCHEMA = {
  task: Joi.string()
    .label('task')
    .max(90)
    .required(),
  details: Joi.string()
    .label('details')
    .max(90)
    .required(),
    tags: Joi.array()
    .label('tags')
    .required()
};

/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function todoValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}
const PUTSCHEMA = {
  task: Joi.string()
    .label('task')
    .max(90)
    .required(),
  details: Joi.string()
    .label('details')
    .max(90)
    .required(),
};
function todoPutValidator(req, res, next) {
  return validate(req.body, PUTSCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findtodo(req, res, next) {
  return todoService
    .gettodo(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findtodo, todoValidator, todoPutValidator };
