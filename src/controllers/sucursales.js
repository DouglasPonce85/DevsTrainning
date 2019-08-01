var _ = require('lodash');

const knex = require('../middleware/knex');

const consts = require('../configs/consts');
const helper = require('../services/helper');
const listSucursalesMock = require('../../data/sucursales');

function getSucursalesFromDB(res) {
  knex.from('sucursales')
  .select("*")
  .then((sucursales) => {
    res.send({ sucursales });
  })
  .catch((err) => {
    helper.controllerErrorRaised('knex.select >> [ getSucursalesFromDB ]', err, consts.typeErrors.DB_ERROR_RAISED, next);
  });
}

function getSucursalesFromMock(res) {
  res.send({ result: listSucursalesMock });
}

function getSucursalesByIdFromDB(res, sucursales_id) {
  knex.where({
    sucursales_id
  }).from('sucursales')
    .select("*")
    .then((sucursales) => {
      res.send({ sucursales });
    })
    .catch((err) => {
      helper.controllerErrorRaised('knex.select() >> [ getSucursalesByIdFromDB ]', err, consts.typeErrors.DB_ERROR_RAISED, next);
    })
}

function getSucursalesByIdFromMock(res, sucursalesId) {
  try{
    let sucursalFound = null;
    _.findIndex(listSucursalesMock, (sucursal) => {
      console.log("Sucursal >> ", sucursal);
      if (sucursal.sucursales_id == sucursalesId)
        sucursalFound = sucursal;
    });
    res.send({ result: sucursalFound });
  }catch (err){
    helper.controllerErrorRaised('getSucursalesByIdFromMock', err, consts.typeErrors.CONTROLLER_RAISED, next);
  }
  
}

module.exports = {
  listAllSucursales(req, res) {
    if (helper.isUsingMockData())
      getSucursalesFromMock(res);
    else
      getSucursalesFromDB(res);
  },

  listSucursalesById(req, res) {
    const { sucursales_id } = req.params;

    if (helper.isUsingMockData())
      getSucursalesByIdFromMock(res, sucursales_id);
    else
      getSucursalesByIdFromDB(res, sucursales_id);
  },

  listSucursalesByActive(req, res) {
    try{
    const { active } = req.params;
    knex.where({
      is_active: active
    }).from('sucursales')
      .select("*")
      .then((sucursales) => {
        res.send({ sucursales });
      })
      .catch((err) => {
        helper.controllerErrorRaised('Knex trying to read from DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
      })
     } catch (err){
        helper.controllerErrorRaised('listSucursalesByActive', err, consts.typeErrors.CONTROLLER_RAISED, next);  
      }
  },

  insertSucursales(req, res, next) {
    try{
      const { name, is_active } = req.body;

    /*  if (!name) {
        res.status(consts.codeErrorStatus);
        res.send('Please provide valid info');
        return;
      }
    */
      knex('sucursales').insert({ name, is_active})
        .then((sucursalesInserted) => {
          res.send({ sucursalesInserted });
        })
        .catch((err) => {
          helper.controllerErrorRaised('knex trying to insert on DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
        })

      }  catch (err){
          helper.controllerErrorRaised('insertSucursales', err, consts.typeErrors.CONTROLLER_RAISED, next);
        }
    },

  updateSucursales(req, res) {
    try{
    const { sucursales_id } = req.params;
    const { name, is_active } = req.body;

    if (!sucursales_id) {
      res.status(consts.codeErrorStatus);
      res.send('Please provide a sucursales id');
      return;
    }

    knex('sucursales')
    .where('sucursales_id', sucursales_id)
    .update({
      name,
      is_active
    }).then((result) => {
      res.send({ result });
    }).catch((err) => {
      helper.controllerErrorRaised('updateSucursales', err, consts.typeErrors.CONTROLLER_RAISED, next);
    })
  }catch (err) {
    helper.controllerErrorRaised('updateSucursales', err, consts.typeErrors.CONTROLLER_RAISED, next);
  }
  },

  deleteSucursales(req, res) {
    try{
    const { sucursales_id } = req.params;

    if (!sucursales_id) {
      res.status(consts.codeErrorStatus);
      res.send('Please provide a sucursales id');
      return;
    }

    knex('sucursales')
    .where('sucursales_id', sucursales_id)
    .del()
    .then((result) => {
      res.send({ result });
    }).catch((err) => {
      helper.controllerErrorRaised('Knex trying to delete on DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
    })
  } catch (err) {
    helper.controllerErrorRaised('deletesucursales', err, consts.typeErrors.CONTROLLER_RAISED, next);
  }
  }
}