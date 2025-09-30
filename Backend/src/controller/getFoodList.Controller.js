import foodModel from "../models/foodModel.js";
export default async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ sucess: true, data: foods });
  } catch (error) {
    res.json(500).json({ message: "Error while getting foodList" });
  }
};
