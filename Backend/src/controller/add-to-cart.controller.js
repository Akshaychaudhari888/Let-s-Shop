import userModel from '../models/userModel.js';

const addToCart = async(req, res) => {
    try{
    const { userId, itemId } = req.body;
    let userData = await userModel.findById(userId).lean();
    let cartData = userData.cartData || {};
    if(!cartData[itemId]){
        cartData[itemId] = 1;
    }else{
        cartData[itemId] += 1;  
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Item added to cart' });
    }catch(error){
        console.error("Error adding item to cart:", error);
        return res.status(500).json({ message: 'Error while item adding in cart ' });
    }
}

export default addToCart;