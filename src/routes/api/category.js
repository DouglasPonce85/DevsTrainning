const express = require('express');
const categories = express.Router();

const categoryController = require('../../controllers/category');

categories.route('/category')
    .get(categoryController.listAllCategories);

categories.route('/category')
    .post(categoryController.insertCategory);

categories.route('/category/:category_id')
    .put(categoryController.updateCategory);

categories.route('/category/:category_id')
    .delete(categoryController.deleteCategory);

categories.route('/category/:active')
    .get(categoryController.listCategoriesByActive);

categories.route('/category/id/:category_id')
    .get(categoryController.listCategoryById);


module.exports = categories;
