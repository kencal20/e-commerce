const Product = require('../../schemas/productSchema')

async function updateProductController(req,res) {
    const { id } = req.params
    const { productName, description, price, stock, imageUrl } = req.body

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,
            { productName, description, price, stock, imageUrl }, { new: true, runValidators: true }
        ).populate('category', 'name')
        if (!updatedProduct) {
            return res.json({ message: "The id to be updated does not exist" })
        }
        res.json({ message: "Product has been Updated Sucessfully", updatedProduct })
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

module.exports = updateProductController