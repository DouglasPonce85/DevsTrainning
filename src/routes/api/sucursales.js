const express = require('express');
const sucursales = express.Router();

const sucursalesController = require('../../controllers/sucursales');

sucursales.route('/sucursales')
    .get(sucursalesController.listAllSucursales);

sucursales.route('/sucursales')
    .post(sucursalesController.insertSucursales);

sucursales.route('/sucursales/:sucursales_id')
    .put(sucursalesController.updateSucursales);

sucursales.route('/sucursales/:sucursales_id')
    .delete(sucursalesController.deleteSucursales);

sucursales.route('/sucursales/:active')
    .get(sucursalesController.listSucursalesByActive);

sucursales.route('/sucursales/id/:sucursales_id')
    .get(sucursalesController.listSucursalesById);

module.exports = sucursales;