const Order = require('../../schemas/orderSchema')

async function updateOrderController(req,res) {
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
module.exports = updateOrderController