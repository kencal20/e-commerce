const Category = require('../../schemas/categorySchema')

async function createCategoryController(req, res) {
    const { categoryName } = req.body
    try {
        const category = new Category({
            categoryName
        })

        const newCategory = await category.save()
        res.json({ message: "New Category Saved", newCategory })
    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = createCategoryController