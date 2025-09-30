import orderModel from "../models/orderModel.js";

const getOrdersList = async (req, res) => {
  try {
    let query = {};
    if(req?.query?.status)
      query.status = req.query.status;
    const orders = await orderModel.find(query).sort({_id:-1});
    res.json({success:true, data:orders});
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success:false, message: "Failed to fetch orders" });
  }
}

export default getOrdersList;