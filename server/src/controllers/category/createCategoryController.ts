import { Request, Response } from "express"
import { Category } from "../../schemas/categorySchema"

async function createCategoryController(req:Request,res:Response) {
    const { categoryName } = req.body
    try {
        const category = new Category({
            categoryName
        })

        const newCategory = await category.save()
        res.json({ message: "New Category Saved", newCategory })
    } catch (error:any) {
        res.json({ error: error.message })
    }
}

module.exports = createCategoryController