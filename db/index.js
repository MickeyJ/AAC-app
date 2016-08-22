const knex = require('./knex');

exports.User = () => knex('user');
exports.Category = () => knex('category');
exports.Phrase = () => knex('phrase');

