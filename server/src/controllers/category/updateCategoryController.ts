import { Request, Response } from "express"

const Category = require('../../schemas/categorySchema')

export async function updateCategoryController(req:Request, res:Response) {
    const { id } = req.params
    try {
        const { categoryName } = req.body
        const updatedCategory = await Category.findByIdAndUpdate(
            id, { categoryName }, { new: true, runValidators: true })

        if (!updatedCategory) {
            return res.json({ message: "Category to Update Failed" })
        }

        res.json({ message: "Category Updated successfully", updatedCategory })
    } catch (error:any) {
        res.json({ error: error.message })
    }
}

