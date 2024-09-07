import { Request, Response } from "express"
import { Category } from "../../schemas/categorySchema"

async function deleteCatgoryController(req:Request,res:Response){
    const { id } = req.params
        
    try {
        const deletedUser = await Category.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.json({ message: "Category Id to be deleted Cannot be found" })
        }
        res.json({ message: "Category has been deleted Successfully", deletedUser })
    } catch (error:any) {
        res.json({ error: error.message })
    }
}
module.exports=deleteCatgoryController