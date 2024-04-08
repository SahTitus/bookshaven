import { Schema, model, models } from "mongoose";

const CartSchema = new Schema({
    image:  { type: String, required: true },
    userID: Number,
    bookID: String,
    title: String,
    price: Number,
    quantity: Number,
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
});

const Cart = models.Cart || model('Cart', CartSchema);

export default Cart;