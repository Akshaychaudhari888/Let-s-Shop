import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,required: true },
    items: {type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Processing" },
    data: { type: Date, default: Date.now},
    payment: { type: Boolean, default: false },
}, { timestamps: true 
})

export default mongoose.model("Order", orderSchema);