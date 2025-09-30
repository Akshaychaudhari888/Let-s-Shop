import userModel from '../models/userModel.js';

const getCart = async(req, res) => {
    try{
    const { userId } = req.body;
    let cartData = await userModel.findById(userId,{_id:0,cartData:1}).lean();
    res.status(200).json({ success:true, ...cartData });
    }catch(error){
        console.error("Error getting cart:", error);
        return res.status(500).json({ message: 'Error while getting cart ' });
    }
 }

export default getCart; 