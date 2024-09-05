const express = require('express')
const router = express.Router()


const createProductController = require('../controllers/product/createProductController');
const { getProductsController, getProductsByIdController } = require('../controllers/product/getProductController');
const updateProductController = require('../controllers/product/updateProductController');
const deleteProductController = require('../controllers/product/deleteProductController');

module.exports = function () {

    router.post('/create', createProductController);
    router.get('/', getProductsController)
    router.get('/:id', getProductsByIdController)
    router.put('/:id', updateProductController);
    router.delete('/:id', deleteProductController)

    return router
}