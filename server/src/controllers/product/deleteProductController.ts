import { Request, Response } from "express";
const Product = require('../../schemas/productSchema')
async function deleteProductController(req:Request, res:Response) {
    const { id } = req.params
    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.json({ message: "Product id Cannot be found" })
        }

        res.json({ message: "Product has been deleted Successfully", deletedProduct })
    } catch (error:any) {
        res.json({ error: error.message })
    }
}

module.exports = deleteProductController