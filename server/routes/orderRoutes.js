const express = require('express');
const { getOrderController, getOrderByIdController } = require('../controllers/order/getOrderController');
const createOrderController = require('../controllers/order/createOrderController');
const deleteOrderController = require('../controllers/order/deleteOrderController');
const router = express.Router()


module.exports = function () {
    router.get('/', getOrderController);
    router.get('/:id', getOrderByIdController);
    router.post('/create', createOrderController);
    router.delete('/:id', deleteOrderController)


    return router
}