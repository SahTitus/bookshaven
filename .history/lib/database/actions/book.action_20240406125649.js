"use server"
import { handleError, readingTime } from "@utils"
import Bool from "@lib/database/models/Bool.model"
import { connectDb } from "@lib/database"
import { revalidatePath } from "next/cache"
import User from "@lib/database/models/user.model"
import { mongoSearchPipeline, projection } from "@utils/mongoConditions"

const limitNumber = (value) => {
    const defaultLimit = value || 10
    // to ensure the value doesn't exceed 10
    return Math.min(defaultLimit, 20);
}

export const createBool = async (Bool, user_id) => {
    try {
        await connectDb();

        const creator = await User.findById(user_id)

        Bool.creator = creator._id,
            Bool.modifiedAt = new Date();
        Bool.publishedAt = new Date();
        Bool.readingTime = readingTime(Bool.content);

        await Bool.create({ ...Bool, bookmarks: [] });

        revalidatePath('/')
        revalidatePath('/blog')
        revalidatePath('/(app)/layout')
        revalidatePath('/(blog)/')

        return JSON.parse(JSON.stringify({ status: 'ok' }));
    } catch (error) {
        handleError(error.message)
        return JSON.parse(JSON.stringify('Something went wrong'));
    }
}

export const fetchBool = async (slug) => {
    try {
        await connectDb();

        // Populate the creator field in the new Bool with specific fields from the User model
        const populatedBool = await Bool.findOne({ slug: slug }).populate({
            path: 'creator',
            select: 'name photo profile_url',
        });

        revalidatePath('/');
        revalidatePath('/Bool');
        revalidatePath('/blog');

        return JSON.parse(JSON.stringify(populatedBool));
    } catch (error) {
        handleError(error.message)
    }
}

export async function updateBool(Bool, user_id) {
    try {
        await connectDb();

        const BoolToUpdate = await Bool.findById(Bool._id)

        if (!BoolToUpdate || BoolToUpdate.creator._id.toHexString() !== user_id) {
            throw new Error('Unauthorized or Bool not found')
        }

        Bool.modifiedAt = new Date();
        const updatedBool = await Bool.findByIdAndUpdate(Bool._id, Bool, { new: true });

        revalidatePath(`/Bool/${Bool._id}`)

        return JSON.parse(JSON.stringify(updatedBool))
    } catch (error) {
        handleError(error.message)
    }
}

export const deleteBool = async (id, user_id) => {
    try {
        await connectDb();

        const BoolToDelete = await Bool.findById(id)

        if (!BoolToDelete || BoolToDelete.creator._id.toHexString() !== user_id) {
            throw new Error('Unauthorized or Bool not found')
        }

        await Bool.deleteOne({ _id: id });

        revalidatePath('/')
        revalidatePath('/blog')

        return { status: 200 };
    } catch (error) {
        handleError(error.message)
    }
};

//Handles fecthing Bools by category, title, and subcategory
export const fetchBools = async ({ query, page, limit }) => {

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

        const Bools = await Bool.find(conditions)
            .select(projection)
            .sort({ publishedAt: 'desc' })
            .skip(skipAmount)
            .limit(limitValue);

        const BoolsCount = await Bool.countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(Bools)), totalPages: Math.ceil(BoolsCount / limit) }
    } catch (error) {
        handleError(error.message);
    }
};

export const fetchTrendingBools = async ({ limit }) => {
    try {
        await connectDb();

        const limitValue = limitNumber(limit);

        // Fetch random Bools
        const trendingBools = await Bool.aggregate([
            { $sort: { publishedAt: -1 } },
            { $sample: { size: limitValue } },
            { $project: projection, }
        ]);

        return { data: JSON.parse(JSON.stringify(trendingBools)) };
    } catch (error) {
        handleError(error.message);
    }
};

export const RelatedBoolsByCategory = async ({ BoolId, categoryId, page, limit }) => {
    try {
        await connectDb();

        const categoryCondition = categoryId ? { category_id: categoryId } : {};
        // const subCategoryCondition = subCategoryId ? { subCategory_id: subCategoryId } : {};

        const conditions = { $and: [categoryCondition, { _id: { $ne: BoolId } }] };

        const limitValue = limitNumber(limit);
        const skipAmount = (Number(page) - 1) * limitValue;

        const Bools = await Bool.find(conditions)
            .select(projection)
            .sort({ publishedAt: 'desc' })
            .skip(skipAmount)
            .limit(limitValue);

        const BoolsCount = await Bool.countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(Bools)), totalPages: Math.ceil(BoolsCount / limit) }
    } catch (error) {
        handleError(error.message)
    }
}

export const fetchBoolsByTags = async ({ tag, page, limit }) => {
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

        const Bools = await Bool.find(tagCondition)
            .select(projection)
            .sort({ publishedAt: 'desc' })
            .skip(skipAmount)
            .limit(limitValue);

        const BoolsCount = await Bool.countDocuments(tagCondition);

        return { data: JSON.parse(JSON.stringify(Bools)), totalPages: Math.ceil(BoolsCount / limit) };
    } catch (error) {
        handleError(error.message);
    }
};

export const fetchBoolsBySearch = async ({ query, page, limit }) => {
    try {
        await connectDb();

        const skip = (Number(page) - 1) * limitNumber(limit);
        const searchPipeline = mongoSearchPipeline(query, skip, limitNumber(limit));

        const Bools = await Bool.aggregate(searchPipeline);

        // Count documents based on the search criteria - LIMIT MUST BE ZERO
        const countSearchPipeline = mongoSearchPipeline(query, skip, limitNumber(0));
        const BoolsCount = await Bool.aggregate([
            ...countSearchPipeline,
            {
                $count: 'totalCount',
            },
        ]);

        // Extract the count value from the result (if available)
        const totalCount = BoolsCount[0] ? BoolsCount[0].totalCount : 0
        revalidatePath('/search?q')
        return { data: JSON.parse(JSON.stringify(Bools)), totalPages: Math.ceil(totalCount / limit) };
    } catch (error) {
        handleError(error.message);
    }
};

export const bookmarkBool = async ({ userId, BoolId }) => {
    try {
        await connectDb();

        const Bool = await Bool.findOne({ _id: BoolId });
        const userData = await User.findOne({ _id: userId });

        if (!userData || !Bool) {
            return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
        }

        const index = userData.bookmarks.findIndex((id) => id === BoolId);

        if (index === -1) {
            userData.bookmarks.push(BoolId);
            Bool.bookmarks.push(userId);
        } else {
            userData.bookmarks = userData.bookmarks.filter(
                (id) => id !== BoolId
            );
            Bool.bookmarks = Bool.bookmarks.filter((id) => id !== userId);
        }

        await User.findByIdAndUpdate(userId, userData, { new: true });

        const bookmarkedBool = await Bool.findByIdAndUpdate(BoolId, Bool, { new: true });

        return JSON.parse(JSON.stringify(bookmarkedBool));
    } catch (error) {
        handleError(error.message);
    }
};