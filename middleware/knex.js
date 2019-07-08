const helper = require('../services/helper');
const knex = require('knex')(helper.getDBConfig());

module.exports = knex;
