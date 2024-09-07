import { Request, Response } from "express";
import { Order } from "../../schemas/orderSchema";


export async function getOrderController(req:Request, res:Response) {
   
        const orders = await Order.find();
        res.json({ message: 'Hello all orders', orders });
    }

export async function getOrderByIdController(req:Request,res:Response) {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.json({ message: "The id Cannot be found" })
        }
        res.json({ messsage: "The result for the id inputed is ", order })
    } catch (error:any) {
        res.json({ error: error.message })
    }
}
