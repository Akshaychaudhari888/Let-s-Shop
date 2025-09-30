import userModel from '../models/userModel.js';

const removeFromCart = async(req, res) => {
    try{
    const { userId, itemId } = req.body;
    let userData = await userModel.findById(userId).lean();
    let cartData = userData.cartData || {};
    if(cartData[itemId]>0){
        cartData[itemId] -= 1;
    }
     await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ message: 'Item removed from cart' });
    }catch(error){
        console.error("Error removing item from cart:", error);
        return res.status(500).json({ message: 'Error while item removing from cart ' });
    }
}

export default removeFromCart;