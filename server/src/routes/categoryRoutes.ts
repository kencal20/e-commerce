import { Request, Response } from "express"

const express = require('express')
const router = express.Router()


const createCategoryController = require('../controllers/category/createCategoryController')
const deleteCatgoryController = require('../controllers/category/deleteCategoryController')
const { getCategoriesController, getCategoryByIdController } = require('../controllers/category/getCategoryController')
const updateCategoryController = require('../controllers/category/updateCategoryController')

export async function categoryRoutes() {
    // Assign routes to the controller functions
    router.post('/create', (req: Request, res: Response) => createCategoryController(req, res))
    router.get('/', (req: Request, res: Response) => getCategoriesController(req, res))
    router.get('/:id', (req: Request, res: Response) => getCategoryByIdController(req, res))
    router.put('/:id', (req: Request, res: Response) => updateCategoryController(req, res))
    router.delete('/:id', (req: Request, res: Response) => deleteCatgoryController(req, res))

    return router
}
