const Product = require('../../schemas/productSchema')


async function getProductsController(req, res) {
    try {
        const products = await Product.find().populate('category', 'categoryName')
        res.json({ message: "This is the list of Products", products })
    } catch (error) {
        res.json({ error: error.message })
    }

}

async function getProductsByIdController(req, res) {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).populate('category', 'categoryName');
        if (!product) {
            return res.json({ message: "The id Cannot be found" });
        }
        res.json({ message: "The result for the id inputted is", product });
    } catch (error) {
        res.json({ error: error.message });
    }
}


module.exports = {
    getProductsController,
    getProductsByIdController
}