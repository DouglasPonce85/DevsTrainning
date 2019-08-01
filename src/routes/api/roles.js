const express = require('express');
const roles = express.Router();

const rolesController = require('../../controllers/roles');

roles.route('/roles')
    .get(rolesController.listAllRoles);

roles.route('/roles')
    .post(rolesController.insertRoles);

roles.route('/roles/:rol_id')
    .put(rolesController.updateRoles);

roles.route('/roles/:rol_id')
    .delete(rolesController.deleteRoles);

roles.route('/roles/id/:rol_id')
    .get(rolesController.listRolesById);

module.exports = roles;