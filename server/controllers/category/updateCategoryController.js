const Category = require('../../schemas/categorySchema')

async function updateCategoryController(req, res) {
    const { id } = req.params
    try {
        const { categoryName } = req.body
        const updatedCategory = await Category.findByIdAndUpdate(
            id, { categoryName }, { new: true, runValidators: true })

        if (!updatedCategory) {
            return res.json({ message: "Category to Update Failed" })
        }

        res.json({ message: "Category Updated successfully", updatedCategory })
    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = updateCategoryController