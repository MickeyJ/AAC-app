const knex = require('./knex');
const query = require('./query');

exports.User     = () => knex('user');
exports.Category = () => knex('category');
exports.Phrase   = () => knex('phrase');

exports.getMe       = query.getMe;
exports.setUser     = query.setUser;
exports.getUser     = query.getUser;
exports.getCategory = query.getCategory;
exports.getPhrases  = query.getPhrases;

