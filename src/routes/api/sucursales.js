const express = require('express');
const sucursales = express.Router();

const sucursalesController = require('../../controllers/sucursales');

sucursales.route('/sucursales')
    .get(sucursalesController.listAllSucursales);

sucursales.route('/sucursales')
    .post(sucursalesController.insertSucursales);
/*
categories.route('/sucursales/:sucursales_id')
    .put(sucursalesController.updatesucursales);

categories.route('/sucursales/:sucursales_id')
    .delete(sucursalesController.deletesucursales);
*/
sucursales.route('/sucursales/:active')
    .get(sucursalesController.listSucursalesByActive);

sucursales.route('/sucursales/id/:sucursales_id')
    .get(sucursalesController.listSucursalesById);

module.exports = sucursales;