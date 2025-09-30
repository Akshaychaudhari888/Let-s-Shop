import foodModel from "../models/foodModel.js";
import fs from "fs"; 

export default async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id); 
        if(!food){
            return res.status(404).json({message:"Food not found"});
        }
        fs.unlink(`uploads/${food.image}`, async(err)=>{
            if (err) {
                console.error("Error deleting file:", err);
                return res.status(500).json({message: "Error deleting file"});
            }
            await foodModel.findByIdAndDelete(req.body.id);
            res.json({success:true, message:"Food removed successfully"});
        });
    }catch(error){
        console.error("Error:", error); 
        res.status(500).json({message: "Error while getting list"});
    }
}