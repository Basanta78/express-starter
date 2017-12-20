import bookshelf from '../db';
import todo from '../models/todo';
import token from './tokens';



const TABLE_NAME = 'users';

/**
 * Users model.
 */
class User extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
  todo(){
    return this.hasMany(todo)
  }
  token(){
    return this.hasOne(token)
  }
}

export default User;
