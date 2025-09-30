import orderModel from "../models/orderModel.js";

const verifyOrder = async (req, res) => {
  try {
    const {orderId,success}= req.body;

    if(success=="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message:"Paid"})
    }else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success: false})
    }

} catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default verifyOrder;
