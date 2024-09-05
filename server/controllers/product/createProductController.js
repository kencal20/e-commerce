const Product = require('../../schemas/productSchema')
const Category = require('../../schemas/categorySchema')

async function createProductController(req, res) {
    const { productName, description, price, category, stock, imageUrl } = req.body;


    if (!category) {
        return res.status(400).json({ message: "Category name is required" });
    }

    try {
        const foundCategory = await Category.findOne({ categoryName: category });


        if (!foundCategory) {
            return res.status(404).json({ message: `Category ${category} cannot be found` });
        }

        const product = new Product({
            productName,
            description,
            price,
            category: foundCategory._id,
            stock,
            imageUrl
        });

        const newProduct = await product.save();
        res.status(201).json({ message: "New Product Created", newProduct });

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

module.exports = createProductController