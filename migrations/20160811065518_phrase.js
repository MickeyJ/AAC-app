
exports.up = function(knex, Promise) {
  return knex.schema.createTable('phrase', table =>{
    table.increments('phrase_id').primary();
    table.integer('category_phrase_id').unsigned().references('category_id').inTable('category');
    table.string('text');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('phrase');
};

