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
    console.log('Error raised >> ', err);
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
      console.log('Error raised >> ', err);
    })
}

function getSucursalesByIdFromMock(res, sucursalesId) {
  let sucursalFound = null;
  _.findIndex(listSucursalesMock, (sucursal) => {
    console.log("Sucursal >> ", sucursal);
    if (sucursal.sucursales_id == sucursalesId)
      sucursalFound = sucursal;
  });

  res.send({ result: sucursalFound });
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
    const { active } = req.params;
    knex.where({
      is_active: active
    }).from('sucursales')
      .select("*")
      .then((sucursales) => {
        res.send({ sucursales });
      })
      .catch((err) => {
        console.log('Error raised >> ', err);
      })
  },

  insertSucursales(req, res) {
    const { name, is_active } = req.body;

    if (!name) {
      res.status(consts.codeErrorStatus);
      res.send('Please provide valid info');
      return;
    }

    knex('sucursales').insert({ name, is_active})
      .then((sucursalesInserted) => {
        res.send({ sucursalesInserted });
      })
      .catch((err) => {
        console.log('Error raised >> ', err);
      })
  },

  updateSucursales(req, res) {
    const { sucursales_id } = req.params;
    const { name, is_active } = req.body;

    if (!sucursales_id) {
      res.status(consts.codeErrorStatus);
      res.send('Please provide a category id');
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
        console.log('Error raised >> ', err);
    })
  },

  deleteSucursales(req, res) {
    const { sucursales_id } = req.params;

    if (!sucursales_id) {
      res.status(consts.codeErrorStatus);
      res.send('Please provide a category id');
      return;
    }

    knex('sucursales')
    .where('sucursales_id', sucursales_id)
    .del()
    .then((result) => {
      res.send({ result });
    }).catch((err) => {
        console.log('Error raised >> ', err);
    })
  }
}