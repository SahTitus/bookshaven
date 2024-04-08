import { Schema, model, models } from "mongoose";

const CartSchema = new Schema({
    name: { type: String, required: true },
    image:  { type: String, required: true },
    userID: Number,
    bookID: Number,
    title: String,
    price: Number,
    quantity: Number,
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
});

const Cart = models.Cart || model('Cart', CartSchema);

export default Cart;