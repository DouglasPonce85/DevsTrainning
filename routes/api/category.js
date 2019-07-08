const express = require('express');
const categories = express.Router();

const categoryController = require('../../controllers/category');

categories.route('/category/list')
    .get(categoryController.listAllCategories);

categories.route('/category/list/:active')
    .get(categoryController.listCategoriesByActive);

categories.route('/category/add')
    .post(categoryController.insertCategory);

module.exports = categories;
