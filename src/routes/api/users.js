const express = require('express');
const users = express.Router();

const usersController = require('../../controllers/users');

users.route('/users')
    .get(usersController.listAllUsers);

users.route('/users')
    .post(usersController.insertUsers);

users.route('/users/:user_id')
    .put(usersController.updateUsers);

users.route('/users/:user_id')
    .delete(usersController.deleteUsers);

users.route('/users/:active')
    .get(usersController.listUsersByActive);

users.route('/users/id/:user_id')
    .get(usersController.listUsersById);

module.exports = users;