var _ = require('lodash');

const knex = require('../middleware/knex');

const consts = require('../configs/consts');
const helper = require('../services/helper');
const listCategoryMock = require('../../data/category');

function getCategoryFromDB(res) {
  knex.from('category')
    .select("*")
    .then((category) => {
      res.send({ category });
    })
    .catch((err) => {
      helper.controllerErrorRaised('knex.select >> [ getCategoryFromDB ]', err, consts.typeErrors.DB_ERROR_RAISED, next);
    });
}

function getCategoryFromMock(res) {
  res.send({ result: listCategoryMock });
}

function getCategoryByIdFromDB(res, category_id) {
  knex.where({
    category_id
  }).from('category')
    .select("*")
    .then((categories) => {
      res.send({ categories });
    })
    .catch((err) => {
      helper.controllerErrorRaised('knex.select() >> [ getCategoryByIdFromDB ]', err, consts.typeErrors.DB_ERROR_RAISED, next);
    })
}

function getCategoryByIdFromMock(res, category_id) {
  try {
    let categoryFound = null;
    _.findIndex(listCategoryMock, (category) => {
      if (category.category_id == category_id)
        categoryFound = category;
    });

    res.send({ result: categoryFound });
  } catch (err) {
    helper.controllerErrorRaised('getCategoryByIdFromMock', err, consts.typeErrors.CONTROLLER_RAISED, next);
  }
}

module.exports = {
  listAllCategories(req, res) {
    if (helper.isUsingMockData())
      getCategoryFromMock(res);
    else
      getCategoryFromDB(res);
  },

  listCategoryById(req, res) {
    const { category_id } = req.params;
    if (helper.isUsingMockData())
      getCategoryByIdFromMock(res, category_id);
    else
      getCategoryByIdFromDB(res, category_id);
  },

  listCategoriesByActive(req, res) {
    try {
      const { active } = req.params;
      knex.where({
        is_active: active
      }).from('category')
        .select("*")
        .then((categories) => {
          res.send({ categories });
        })
        .catch((err) => {
          helper.controllerErrorRaised('Knex trying to read from DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
        })
    } catch (err) {
      helper.controllerErrorRaised('listCategoriesByActive', err, consts.typeErrors.CONTROLLER_RAISED, next);
    }
  },

  insertCategory(req, res, next) {
    try {
      const { name, is_active } = req.body;

      if (!name) {
        res.status(consts.codeErrorStatus);
        res.send('Please provide valid info');
        return;
      }

      knex('category').insert({ name, is_active })
        .then((categoryInserted) => {
          res.send({ categoryInserted });
        }).catch((err) => {
          helper.controllerErrorRaised('knex trying to insert on DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
        })

    } catch (err) {
      helper.controllerErrorRaised('insertCategory', err, consts.typeErrors.CONTROLLER_RAISED, next);
    }
  },

  updateCategory(req, res) {
    try {
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
          helper.controllerErrorRaised('Knex trying to update on DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
        })
    } catch (err) {
      helper.controllerErrorRaised('updateCategory', err, consts.typeErrors.CONTROLLER_RAISED, next);
    }
  },

  deleteCategory(req, res) {
    try {
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
          helper.controllerErrorRaised('Knex trying to delete on DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
        })
    } catch (err) {
      helper.controllerErrorRaised('deleteCategory', err, consts.typeErrors.CONTROLLER_RAISED, next);
    }
  }
}