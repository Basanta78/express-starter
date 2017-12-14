import bookshelf from '../db';
import todo from '../models/todo';
import tokens from '../models/tokens';



const TABLE_NAME = 'users';

/**
 * User model.
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
    return this.hasOne(tokens)
  }
}

export default User;
