const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
    cartID: Number,
    userID: Number,
    bookID: Number,
    quantity: Number
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;
