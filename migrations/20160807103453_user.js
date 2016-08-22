
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', table =>{
    table.increments('user_id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('password_hash');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};