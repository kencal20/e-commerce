import { Request, Response } from "express";
const Product = require('../../schemas/productSchema')

export async function getProductsController(req:Request, res:Response) {
    try {
        const products = await Product.find().populate('category', 'categoryName')
        res.json({ message: "This is the list of Products", products })
    } catch (error:any) {
        res.json({ error: error.message })
    }

}

export async function getProductsByIdController(req:Request, res:Response) {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).populate('category', 'categoryName');
        if (!product) {
            return res.json({ message: "The id Cannot be found" });
        }
        res.json({ message: "The result for the id inputted is", product });
    } catch (error:any) {
        res.json({ error: error.message });
    }
}


