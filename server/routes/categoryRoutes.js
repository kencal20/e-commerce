const express = require('express')
const router = express.Router()


const createCategoryController = require('../controllers/category/createCategoryController')
const deleteCatgoryController = require('../controllers/category/deleteCategoryController')
const { getCategoriesController, getCategoryByIdController } = require('../controllers/category/getCategoryController')
const updateCategoryController = require('../controllers/category/updateCategoryController')

module.exports = function () {
    // Assign routes to the controller functions
    router.post('/create', createCategoryController)
    router.get('/', getCategoriesController)
    router.get('/:id', getCategoryByIdController)
    router.put('/:id', updateCategoryController)
    router.delete('/:id', deleteCatgoryController)

    return router
}
