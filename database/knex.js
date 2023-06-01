const database = require('../knexfile.js');

module.exports = require('knex')(database);
