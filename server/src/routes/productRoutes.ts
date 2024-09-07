import { Request, Response } from "express";

const express = require('express')
const router = express.Router()


const createProductController = require('../controllers/product/createProductController');
const { getProductsController, getProductsByIdController } = require('../controllers/product/getProductController');
const updateProductController = require('../controllers/product/updateProductController');
const deleteProductController = require('../controllers/product/deleteProductController');

export async function productRoutes() {

    router.post('/create', (req: Request, res: Response) => createProductController(req, res));
    router.get('/', (req: Request, res: Response) => getProductsController(req, res))
    router.get('/:id', (req: Request, res: Response) => getProductsByIdController(req, res))
    router.put('/:id', (req: Request, res: Response) => updateProductController(req, res));
    router.delete('/:id', (req: Request, res: Response) => deleteProductController(req, res))

    return router
}