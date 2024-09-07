import { Request, Response } from "express"
import { Category } from "../../schemas/categorySchema"

export async function getCategoriesController(req:Request, res:Response) {
    const categories = await Category.find()
    res.json({ message: "List of Categories are ", categories })
}

export async function getCategoryByIdController(req:Request, res:Response) {
    const { id } = req.params
    try {
        const category = await Category.findById(id)
        if (!category) {
            return res.json({ message: "Category id Did not match" })
        }
        res.json({ message: "Category info is the following ", category })
    } catch (error:any) {
        res.json({ error: error.message })
    }
}

