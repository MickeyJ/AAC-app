
exports.up = function(knex, Promise) {
  return knex.schema.createTable('category', table =>{
    table.increments('category_id').primary();
    table.integer('user_category_id').unsigned().references('user_id').inTable('user');
    table.string('title');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('category');
};
