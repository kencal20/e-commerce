const Order = require('../../schemas/orderSchema')

async function deleteOrderController(req, res) {
    const { id } = req.params
    try {
        const trimmedId = id.trim();
        const deletedOrder = await Order.findByIdAndDelete(trimmedId);
        if (!deletedOrder) {
            res.json({ message: "Id stated for order is invalid" });
        } else {
            res.json({ message: "Order has been deleted Successfully", deletedOrder });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
}

module.exports = deleteOrderController