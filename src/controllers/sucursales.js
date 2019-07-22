const knex = require('../middleware/knex');

const consts = require('../configs/consts');

module.exports = {
  listAllSucursales(req, res) {
    knex.from('sucursales')
      .select("*")
      .then((sucursales) => {
        res.send({ sucursales });
      })
      .catch((err) => {
        console.log('Error raised >> ', err);
      });
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

  
  listSucursalesById(req, res) {
    const { sucursales_id } = req.params;
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
  }
/*
  updateCategory(req, res) {
    const { category_id } = req.params;
    const { name, is_active } = req.body;

    if (!category_id) {
      res.status(consts.codeErrorStatus);
      res.send('Please provide a category id');
      return;
    }

    knex('category')
    .where('category_id', category_id)
    .update({
      name,
      is_active
    }).then((result) => {
      res.send({ result });
    }).catch((err) => {
        console.log('Error raised >> ', err);
    })
  },

  deleteCategory(req, res) {
    const { category_id } = req.params;

    if (!category_id) {
      res.status(consts.codeErrorStatus);
      res.send('Please provide a category id');
      return;
    }

    knex('category')
    .where('category_id', category_id)
    .del()
    .then((result) => {
      res.send({ result });
    }).catch((err) => {
        console.log('Error raised >> ', err);
    })
  }
  */
}