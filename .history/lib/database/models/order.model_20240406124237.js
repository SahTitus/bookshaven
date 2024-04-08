import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    quantity: { type: Number, required: true },
    status: String,
    
    orderdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
})

const Order = models.Order || model('Order', OrderSchema);

export default Order;

({
    orderID: Number,
    userID: Number,
    orderDate: Date,
    bookID: Number,
    quantity: Number
});