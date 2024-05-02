const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Define routes for categories
router.get('/', categoriesController.getAllCategories);
router.get('/:categoryId', categoriesController.getCategoryById);
router.post('/', categoriesController.createCategory);
router.put('/:categoryId', categoriesController.updateCategoryById);
router.delete('/:categoryId', categoriesController.deleteCategoryById); 

module.exports = router;
