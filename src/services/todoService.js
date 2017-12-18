import Boom from 'boom';
import todo from '../models/todo';
import user from '../models/user';
import tags from '../models/tags';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAlltodos() {
  return todo.fetchAll({withRelated:['user','tags']});
}

/**
 * Get user todo
 * @param id
 */
export function gettodo(id) {
  return new todo({ id }).fetch().then(todos => {
    if (!todo) {
      throw new Boom.notFound('User not found');
    }

    return todo;
  });
}

/**
 * Get usertodo
 * @param uid
 * @return promise
 */
export function getUserTodo(uid){
  let promise = todo.query({where: {user_id: uid}}).fetchPage({withRelated:['tags']});
  return promise.then(todos=>{
    let next = todos.pagination.page < todos.pagination.pageCount ? todos.pagination.page + 1 : null;
    let prev =todos.pagination.page > 1 ?todos.pagination.page - 1 : null;
    let current = todos.pagination.page;
    return{
      "Todos":todos.models,
      "metadata": {
        "nextpage":next,
        "prevpage":prev,
        "currentpage":current,
      }
    }
  }

)
}
/**
 * Create new todo list.
 *
 * @param  {Object}  todo
 * @return {Promise}
 */
export function createTodo(todos) {
  return new todo({ task: todos.task, userId: todos.user_id }).save().then(todos => todos.refresh());
}

// export function createUserTodo (user_id,todos) {
//   return new todo({ task: todos.task, details: todos.details}).save({userId: user_id}).then(todos => todos.related('tags').attach({tag:'book'}));
// }

export function createUserTodo (user_id,todos) {
  return new todo({ task: todos.task, details: todos.details}).save({userId: user_id})
    .then(todos => todos.tags().attach([2,3]));
}
/**
 * Update a todo.
 *
 * @param  {Number|String}  id
 * @param  {Object} todo
 * @return {Promise}
 */
export function updateTodo(id, todos) {
  return new todo({ id })
    .save({ task: todos.task })
    .then(todos=> todos.refresh());
}

/**
 * Delete a todo.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteTodo(id) {
  return new todo({ id }).fetch().then(todos => todos.destroy());
}

export function searchText ( id ,search ) {
 return todo.query((qb)=>{
   qb.where({user_id: id}).andWhere('details','like','%'+search+'%').orWhere('task', 'like', '%'+search+'%')

 }).fetchAll({withRelated:['user','tags']})
   .then(todos => todos.related('tags'));
     // return td.where(x, 'like','%'+search+'%');

}
