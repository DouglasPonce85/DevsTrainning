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

categories.route('/sucursales/:active')
    .get(sucursalesController.listCategoriesByActive);
*/
module.exports = sucursales;