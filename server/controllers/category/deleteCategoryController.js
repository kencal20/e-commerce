const Category = require('../../schemas/categorySchema')

async function deleteCatgoryController(req,res){
    const { id } = req.params
        
    try {
        const deletedUser = await Category.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.json({ message: "Category Id to be deleted Cannot be found" })
        }
        res.json({ message: "Category has been deleted Successfully", deletedUser })
    } catch (error) {
        res.json({ error: error.message })
    }
}
module.exports=deleteCatgoryController