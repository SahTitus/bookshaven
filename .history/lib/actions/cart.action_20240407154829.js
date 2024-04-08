"use server"
import Book from "@lib/database/models/book.model"
import { connectDb } from "@lib/database"
import { revalidatePath } from "next/cache"
import User from "@lib/database/models/user.model"
import { projection } from "@utils/mongoConditions"
import { handleError } from "@/utils"
import Cart from "@lib/database/models/cart.model"

export const addToCart = async (cart) => {

    try {
        await connectDb();

        const user = await User.findById(cart.userID);

        if (!user._id) {
            throw new Error("User does exist");
        }

        const newCart = await Cart.create(cart);
        revalidatePath('/')

        return JSON.parse(JSON.stringify(newCart));
    } catch (error) {
        handleError(error.message)
        return JSON.parse(JSON.stringify('Something went wrong'));
    }
}

export const fetchCartItemsk = async (slug) => {
    try {
        await connectDb();

        // Populate the creator field in the new Book with specific fields from the User model
        const populatedBook = await Book.findOne({ slug: slug }).populate({
            path: 'creator',
            select: 'name photo profile_url',
        });

        revalidatePath('/');

        return JSON.parse(JSON.stringify(populatedBook));
    } catch (error) {
        handleError(error.message)
    }
}

export async function updateCart(data) {
    try {
        await connectDb();

        const userData = await User.findById(data.userId)
        const itemToUpdate = await Cart.findById(data.cart_id)

        if (!itemToUpdate._id || itemToUpdate.userID != userData._id.toHexString()) {
            throw new Error('Unauthorized or Item not found')
        }

        if (data.action === 'inc') {
            itemToUpdate.quantity = itemToUpdate.quantity + 1;
        } else {
            if (itemToUpdate.quantity > 1) {
                itemToUpdate.quantity = itemToUpdate.quantity - 1;
            }
        }

        console.log(itemToUpdate)
        const updatedCart = await Cart.findByIdAndUpdate(data.cart_id, itemToUpdate, { new: true });

        return JSON.parse(JSON.stringify(updatedCart))
    } catch (error) {
        handleError(error.message)
    }
}

export const deleteCart = async (id, user_id) => {
    try {
        await connectDb();

        const BookToDelete = await Book.findById(id)

        if (!BookToDelete || BookToDelete.creator._id.toHexString() !== user_id) {
            throw new Error('Unauthorized or Book not found')
        }

        await Book.deleteOne({ _id: id });

        revalidatePath('/')
        revalidatePath('/blog')

        return { status: 200 };
    } catch (error) {
        handleError(error.message)
    }
};

//Handles fecthing Books by category, title, and subcategory
export const fetchCartItems = async (userId) => {
    try {
        await connectDb();

        const cartItems = await Cart.find({ userID: userId })
            .sort({ createdAt: 'descending' })

        const cartItemsCount = await Cart.countDocuments({ userID: userId })

        return { data: JSON.parse(JSON.stringify(cartItems)), totalItems: cartItemsCount }
    } catch (error) {
        handleError(error.message);
    }
};

