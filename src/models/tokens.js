import bookshelf from '../db';
import todo from '../models/todo';
import user from '../models/user';



const TABLE_NAME = 'users';

/**
 * User model.
 */
class Tokens extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
  user(){
    return this.belongsTo(user)
  }
}

export default Tokens;
