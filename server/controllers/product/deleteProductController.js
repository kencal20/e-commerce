const Product = require('../../schemas/productSchema')

async function deleteProductController(req, res) {
    const { id } = req.params
    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.json({ message: "Product id Cannot be found" })
        }

        res.json({ message: "Product has been deleted Successfully", deletedProduct })
    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = deleteProductController