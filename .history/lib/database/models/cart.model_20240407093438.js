import { Schema, model, models } from "mongoose";

const CartSchema = new Schema({
    name: { type: String, required: true },
    i: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userID: Number,
    bookID: Number,
    bookID: Number,
    quantity: Number,
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
});

const Cart = models.Cart || model('Cart', CartSchema);

export default Cart;