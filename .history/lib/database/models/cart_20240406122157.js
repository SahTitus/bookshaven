const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
    cartID: Number,
    userID: Number,
    bookID: Number,
    quantity: Number
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;



import { Schema, model, models } from "mongoose";

const SubCategorySchema = new Schema({
    subCategory_id: String,
    name: String,
});

const CategorySchema = new Schema({
    category_id: { type: String, required: true },
    name: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
});

const Category = models.Category || model('Category', CategorySchema);

export default Category;