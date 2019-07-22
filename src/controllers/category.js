const knex = require('../middleware/knex');

const consts = require('../configs/consts');

module.exports = {
  listAllCategories(req, res) {
    knex.from('category')
      .select("*")
      .then((categories) => {
        res.send({ categories });
      })
      .catch((err) => {
        console.log('Error raised >> ', err);
      });
  },

  listCategoriesByActive(req, res) {
    const { active } = req.params;
    knex.where({
      is_active: active
    }).from('category')
      .select("*")
      .then((categories) => {
        res.send({ categories });
      })
      .catch((err) => {
        console.log('Error raised >> ', err);
      })
  },

  listCategoryById(req, res) {
    const { category_id } = req.params;
    knex.where({
      category_id
    }).from('category')
      .select("*")
      .then((categories) => {
        res.send({ categories });
      })
      .catch((err) => {
        console.log('Error raised >> ', err);
      })
  },

  insertCategory(req, res) {
    const { name, is_active } = req.body;

    if (!name) {
      res.status(consts.codeErrorStatus);
      res.send('Please provide valid info');
      return;
    }

    knex('category').insert({ name, is_active})
      .then((categoryInserted) => {
        res.send({ categoryInserted });
      })
      .catch((err) => {
        console.log('Error raised >> ', err);
      })
  },

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
}