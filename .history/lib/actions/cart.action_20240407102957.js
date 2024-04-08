"use server"
import Book from "@lib/database/models/book.model"
import { connectDb } from "@lib/database"
import { revalidatePath } from "next/cache"
import User from "@lib/database/models/user.model"
import {  projection } from "@utils/mongoConditions"
import { handleError } from "@/utils"
import Cart from "@lib/database/models/cart.model"

export const addToCart = async (cart) => {
    try {
        await connectDb();

        const user = await User.findById(user_id)

        // cart.creator = creator._id,
        //     cart.modifiedAt = new Date();
        // cart.publishedAt = new Date();

        await Cart.create(cart);

        revalidatePath('/')

        return JSON.parse(JSON.stringify({ status: 'ok' }));
    } catch (error) {
        handleError(error.message)
        return JSON.parse(JSON.stringify('Something went wrong'));
    }
}

export const fetchCartItems = async (slug) => {
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

export async function updateCart(Book, user_id) {
    try {
        await connectDb();

        const BookToUpdate = await Book.findById(Book._id)

        if (!BookToUpdate || BookToUpdate.creator._id.toHexString() !== user_id) {
            throw new Error('Unauthorized or Book not found')
        }

        Book.modifiedAt = new Date();
        const updatedBook = await Book.findByIdAndUpdate(Book._id, Book, { new: true });

        revalidatePath(`/Book/${Book._id}`)

        return JSON.parse(JSON.stringify(updatedBook))
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
export const fetchBooks = async ({ query, page, limit }) => {

    try {
        await connectDb();

        const conditions = query ? {
            $or: [
                { title: query },
                { category_id: query },
                { subCategory_id: query }
            ]
        } : {};

        const limitValue = limitNumber(limit);
        const skipAmount = (Number(page) - 1) * limitValue;

        const Books = await Book.find(conditions)
            .select(projection)
            .sort({ publishedAt: 'desc' })
            .skip(skipAmount)
            .limit(limitValue);

        const BooksCount = await Book.countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(Books)), totalPages: Math.ceil(BooksCount / limit) }
    } catch (error) {
        handleError(error.message);
    }
};

