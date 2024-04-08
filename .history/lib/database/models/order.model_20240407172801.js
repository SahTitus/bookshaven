import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    quantity: { type: Number, required: true },
    status: { type: String, required: true },
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookIDs: { Array,  required: true },
    price: { type: Schema.Types.price, ref: 'Book', required: true },
    orderedAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
})

const Order = models.Order || model('Order', OrderSchema);

export default Order;