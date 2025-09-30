import foodModel from "../models/foodModel.js";

const addFood = async (req, res) => {
    try{
        const {name, description, price, category} = req.body;

        if (!name || !description || !price || !category || !req.file) {
            return res.status(400).json({message: "All fields are required"});
        }

        const image = `${req.file.filename}`;
        const food = new foodModel({
            name,
            description,
            price,
            image,
            category
        });
        await food.save();
        res.status(201).json({message:"Food added successfully"});
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export default addFood;