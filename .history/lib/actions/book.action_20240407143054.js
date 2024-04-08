"use server"
import Book from "@lib/database/models/book.model"
import { connectDb } from "@lib/database"
import { revalidatePath } from "next/cache"
import User from "@lib/database/models/user.model"
import { mongoSearchPipeline, projection } from "@utils/mongoConditions"
import { handleError } from "@/utils"

const limitNumber = (value) => {
    const defaultLimit = value || 10
    // to ensure the value doesn't exceed 10
    return Math.min(defaultLimit, 20);
}

export const createBook = async (book, user_id) => {
    console.log(book)
    try {
        await connectDb();

        const creator = await User.findById(user_id);

        

        book.creator = creator._id,

        await Book.create({ ...book, bookmarks: [] });

        revalidatePath('/')

        return JSON.parse(JSON.stringify({ status: 'ok' }));
    } catch (error) {
        handleError(error.message)
        return JSON.parse(JSON.stringify('Something went wrong'));
    }
}

export const fetchBook = async (slug) => {
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

export async function updateBook(Book, user_id) {
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

export const deleteBook = async (id, user_id) => {
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

export const fetchTrendingBooks = async ({ limit }) => {
    try {
        await connectDb();

        const limitValue = limitNumber(limit);

        // Fetch random Books
        const trendingBooks = await Book.aggregate([
            { $sort: { publishedAt: -1 } },
            { $sample: { size: limitValue } },
            { $project: projection, }
        ]);

        return { data: JSON.parse(JSON.stringify(trendingBooks)) };
    } catch (error) {
        handleError(error.message);
    }
};

export const RelatedBooksByCategory = async ({ BookId, categoryId, page, limit }) => {
    try {
        await connectDb();

        const categoryCondition = categoryId ? { category_id: categoryId } : {};
        // const subCategoryCondition = subCategoryId ? { subCategory_id: subCategoryId } : {};

        const conditions = { $and: [categoryCondition, { _id: { $ne: BookId } }] };

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
        handleError(error.message)
    }
}

export const fetchBooksByTags = async ({ tag, page, limit }) => {
    try {
        await connectDb();
        const lowercaseTag = tag ? tag.toLowerCase() : null;

        // Define tag condition for querying using a case-insensitive regex
        const tagCondition = lowercaseTag ? {
            $or: [
                { tags: { $regex: new RegExp(lowercaseTag, 'i') } },
                { category_id: { $regex: new RegExp(lowercaseTag, 'i') } },
                { subCategory_id: { $regex: new RegExp(lowercaseTag, 'i') } }
            ]
        } : {};

        const limitValue = limitNumber(limit);
        const skipAmount = (Number(page) - 1) * limitValue;

        const Books = await Book.find(tagCondition)
            .select(projection)
            .sort({ publishedAt: 'desc' })
            .skip(skipAmount)
            .limit(limitValue);

        const BooksCount = await Book.countDocuments(tagCondition);

        return { data: JSON.parse(JSON.stringify(Books)), totalPages: Math.ceil(BooksCount / limit) };
    } catch (error) {
        handleError(error.message);
    }
};

export const fetchBooksBySearch = async ({ query, page, limit }) => {
    try {
        await connectDb();

        const skip = (Number(page) - 1) * limitNumber(limit);
        const searchPipeline = mongoSearchPipeline(query, skip, limitNumber(limit));

        const Books = await Book.aggregate(searchPipeline);

        // Count documents based on the search criteria - LIMIT MUST BE ZERO
        const countSearchPipeline = mongoSearchPipeline(query, skip, limitNumber(0));
        const BooksCount = await Book.aggregate([
            ...countSearchPipeline,
            {
                $count: 'totalCount',
            },
        ]);

        // Extract the count value from the result (if available)
        const totalCount = BooksCount[0] ? BooksCount[0].totalCount : 0
        revalidatePath('/search?q')
        return { data: JSON.parse(JSON.stringify(Books)), totalPages: Math.ceil(totalCount / limit) };
    } catch (error) {
        handleError(error.message);
    }
};

export const bookmarkBook = async ({ userId, BookId }) => {
    try {
        await connectDb();

        const Book = await Book.findOne({ _id: BookId });
        const userData = await User.findOne({ _id: userId });

        if (!userData || !Book) {
            return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
        }

        const index = userData.bookmarks.findIndex((id) => id === BookId);

        if (index === -1) {
            userData.bookmarks.push(BookId);
            Book.bookmarks.push(userId);
        } else {
            userData.bookmarks = userData.bookmarks.filter(
                (id) => id !== BookId
            );
            Book.bookmarks = Book.bookmarks.filter((id) => id !== userId);
        }

        await User.findByIdAndUpdate(userId, userData, { new: true });

        const bookmarkedBook = await Book.findByIdAndUpdate(BookId, Book, { new: true });

        return JSON.parse(JSON.stringify(bookmarkedBook));
    } catch (error) {
        handleError(error.message);
    }
};