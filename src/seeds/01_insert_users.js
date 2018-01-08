/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          updated_at: new Date(),
          name: 'Saugat Acharya',
          email: 'saugat@gmail.com',
          password: 'saugatpassword',

        }),
        // knex('users').insert({ name: 'John Doe', updated_at: new Date() })
      ]);
    });
}
