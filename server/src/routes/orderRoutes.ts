const express = require('express');
const { getOrderController, getOrderByIdController } = require('../controllers/order/getOrderController');
const createOrderController = require('../controllers/order/createOrderController');
const deleteOrderController = require('../controllers/order/deleteOrderController');
const router = express.Router()


export async function orderRoutes() {
    router.get('/', (req: Request, res: Response) => getOrderController(req, res));
    router.get('/:id', (req: Request, res: Response) => getOrderByIdController(req, res));
    router.post('/create', (req: Request, res: Response) => createOrderController(req, res));
    router.delete('/:id', (req: Request, res: Response) => deleteOrderController(req, res))


    return router
}