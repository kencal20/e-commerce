const Order = require('../../schemas/orderSchema')


async function getOrderController(req, res) {
    router.get('/', async (req, res) => {
        const orders = await Order.find();
        res.json({ message: 'Hello all orders', orders });
    });



}

async function getOrderByIdController() {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.json({ message: "The id Cannot be found" })
        }
        res.json({ messsage: "The result for the id inputed is ", order })
    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports={
    getOrderController,
    getOrderByIdController
}