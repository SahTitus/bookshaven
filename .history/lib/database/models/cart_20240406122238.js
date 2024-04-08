const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({

});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;



import { Schema, model, models } from "mongoose";

const SubCategorySchema = new Schema({
    subCategory_id: String,
    name: String,
});

const CartSchema = new Schema({
    Cart_id: { type: String, required: true },
    name: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
});

const Cart = models.Cart || model('Cart', CartSchema);

export default Cart;