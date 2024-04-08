import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    quantity: { type: Number, required: true },
    status: { type: String, required: true },
    userID: { type:String, required: true },
    bookIDs: { type:Array,  required: true },
    price: { type: Number, required: true },
    orderedAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
})

const Order = models.Order || model('Order', OrderSchema);

export default Order;