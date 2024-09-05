const Category = require('../../schemas/categorySchema')

async function getCategoriesController(req, res) {
    const categories = await Category.find()
    res.json({ message: "List of Categories are ", categories })
}

async function getCategoryByIdController(req, res) {
    const { id } = req.params
    try {
        const category = await Category.findById(id)
        if (!category) {
            return res.json({ message: "Category id Did not match" })
        }
        res.json({ message: "Category info is the following ", category })
    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = {
    getCategoriesController,
    getCategoryByIdController
}