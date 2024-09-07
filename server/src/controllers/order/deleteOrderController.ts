import { Request, Response } from "express";
import { Order } from "../../schemas/orderSchema";

export async function deleteOrderController(req:Request, res:Response) {
    const { id } = req.params
    try {
        const trimmedId = id.trim();
        const deletedOrder = await Order.findByIdAndDelete(trimmedId);
        if (!deletedOrder) {
            res.json({ message: "Id stated for order is invalid" });
        } else {
            res.json({ message: "Order has been deleted Successfully", deletedOrder });
        }
    } catch (error:any) {
        res.json({ error: error.message });
    }
}

