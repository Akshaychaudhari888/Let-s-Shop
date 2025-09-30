import orderModel from '../models/orderModel.js'

const getOrders=  async(req,res)=>{
 try{
    const orders = await orderModel.find({userId: req.body.userId}).sort({_id:-1});
    res.json({success:true,data: orders})
 }catch(error){
    console.log(error)
    res.json({success:false,message: "Error"})
 }
}

export default getOrders;