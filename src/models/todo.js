import bookshelf from '../db';
import user from '../models/user';
import tags from '../models/tags';


const TABLE_NAME = 'todo';

/**
 * Todo model.
 */
class ToDo extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
  user(){
  return this.belongsTo(user);
  }
  tags(){
    return this.belongsToMany(tags);
  }
}

export default ToDo;
