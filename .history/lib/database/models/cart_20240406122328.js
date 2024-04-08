import { Schema, model, models } from "mongoose";

cartID: Number,


const CartSchema = new Schema({
    name: { type: String, required: true },
    userID: Number,
    publishedAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
});

const Cart = models.Cart || model('Cart', CartSchema);

export default Cart;