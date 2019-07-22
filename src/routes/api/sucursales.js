const express = require('express');
const sucursales = express.Router();

const sucursalesController = require('../../controllers/sucursales');

sucursales.route('/sucursales')
    .get(sucursalesController.listAllSucursales);

/*categories.route('/sucursales')
    .post(sucursalesController.insertsucursales);

categories.route('/sucursales/:sucursales_id')
    .put(sucursalesController.updatesucursales);

categories.route('/sucursales/:sucursales_id')
    .delete(sucursalesController.deletesucursales);
*/
sucursales.route('/sucursales/:active')
    .get(sucursalesController.listSucursalesByActive);

module.exports = sucursales;