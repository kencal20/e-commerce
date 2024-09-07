import { Request, Response } from "express";
import { Order } from "../../schemas/orderSchema";

export async function updateOrderController(req:Request,res:Response) {
    const { userId, products, totalAmount, status, orderDate } = req.body;
    const order = new Order({
        userId,
        products,
        totalAmount,
        status,
        orderDate
    });
    await order.save();
    res.json({ message: "Order has been successfuly made", order });
}
