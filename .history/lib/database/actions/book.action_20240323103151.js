"use server"
import { handleError, readingTime } from "@utils"
import Article from "@lib/database/models/article.model"
import { connectDb } from "@lib/database"
import { revalidatePath } from "next/cache"
import User from "@lib/database/models/user.model"
import { mongoSearchPipeline, projection } from "@utils/mongoConditions"

const limitNumber = (value) => {
    const defaultLimit = value || 10
    // to ensure the value doesn't exceed 10
    return Math.min(defaultLimit, 20);
}

export const createArticle = async (article, user_id) => {
    try {
        await connectDb();

        const creator = await User.findById(user_id)

        article.creator = creator._id,
            article.modifiedAt = new Date();
        article.publishedAt = new Date();
        article.readingTime = readingTime(article.content);

        await Article.create({ ...article, bookmarks: [] });

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

export const fetchArticle = async (slug) => {
    try {
        await connectDb();

        // Populate the creator field in the new article with specific fields from the User model
        const populatedArticle = await Article.findOne({ slug: slug }).populate({
            path: 'creator',
            select: 'name photo profile_url',
        });

        revalidatePath('/');
        revalidatePath('/article');
        revalidatePath('/blog');

        return JSON.parse(JSON.stringify(populatedArticle));
    } catch (error) {
        handleError(error.message)
    }
}

export async function updateArticle(article, user_id) {
    try {
        await connectDb();

        const articleToUpdate = await Article.findById(article._id)

        if (!articleToUpdate || articleToUpdate.creator._id.toHexString() !== user_id) {
            throw new Error('Unauthorized or article not found')
        }

        article.modifiedAt = new Date();
        const updatedArticle = await Article.findByIdAndUpdate(article._id, article, { new: true });

        revalidatePath(`/article/${article._id}`)

        return JSON.parse(JSON.stringify(updatedArticle))
    } catch (error) {
        handleError(error.message)
    }
}

export const deleteArticle = async (id, user_id) => {
    try {
        await connectDb();

        const articleToDelete = await Article.findById(id)

        if (!articleToDelete || articleToDelete.creator._id.toHexString() !== user_id) {
            throw new Error('Unauthorized or article not found')
        }

        await Article.deleteOne({ _id: id });

        revalidatePath('/')
        revalidatePath('/blog')

        return { status: 200 };
    } catch (error) {
        handleError(error.message)
    }
};

//Handles fecthing articles by category, title, and subcategory
export const fetchArticles = async ({ query, page, limit }) => {

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

        const articles = await Article.find(conditions)
            .select(projection)
            .sort({ publishedAt: 'desc' })
            .skip(skipAmount)
            .limit(limitValue);

        const articlesCount = await Article.countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(articles)), totalPages: Math.ceil(articlesCount / limit) }
    } catch (error) {
        handleError(error.message);
    }
};

export const fetchTrendingArticles = async ({ limit }) => {
    try {
        await connectDb();

        const limitValue = limitNumber(limit);

        // Fetch random articles
        const trendingArticles = await Article.aggregate([
            { $sort: { publishedAt: -1 } },
            { $sample: { size: limitValue } },
            { $project: projection, }
        ]);

        return { data: JSON.parse(JSON.stringify(trendingArticles)) };
    } catch (error) {
        handleError(error.message);
    }
};

export const RelatedArticlesByCategory = async ({ articleId, categoryId, page, limit }) => {
    try {
        await connectDb();

        const categoryCondition = categoryId ? { category_id: categoryId } : {};
        // const subCategoryCondition = subCategoryId ? { subCategory_id: subCategoryId } : {};

        const conditions = { $and: [categoryCondition, { _id: { $ne: articleId } }] };

        const limitValue = limitNumber(limit);
        const skipAmount = (Number(page) - 1) * limitValue;

        const articles = await Article.find(conditions)
            .select(projection)
            .sort({ publishedAt: 'desc' })
            .skip(skipAmount)
            .limit(limitValue);

        const articlesCount = await Article.countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(articles)), totalPages: Math.ceil(articlesCount / limit) }
    } catch (error) {
        handleError(error.message)
    }
}

export const fetchArticlesByTags = async ({ tag, page, limit }) => {
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

        const articles = await Article.find(tagCondition)
            .select(projection)
            .sort({ publishedAt: 'desc' })
            .skip(skipAmount)
            .limit(limitValue);

        const articlesCount = await Article.countDocuments(tagCondition);

        return { data: JSON.parse(JSON.stringify(articles)), totalPages: Math.ceil(articlesCount / limit) };
    } catch (error) {
        handleError(error.message);
    }
};

export const fetchArticlesBySearch = async ({ query, page, limit }) => {
    try {
        await connectDb();

        const skip = (Number(page) - 1) * limitNumber(limit);
        const searchPipeline = mongoSearchPipeline(query, skip, limitNumber(limit));

        const articles = await Article.aggregate(searchPipeline);

        // Count documents based on the search criteria - LIMIT MUST BE ZERO
        const countSearchPipeline = mongoSearchPipeline(query, skip, limitNumber(0));
        const articlesCount = await Article.aggregate([
            ...countSearchPipeline,
            {
                $count: 'totalCount',
            },
        ]);

        // Extract the count value from the result (if available)
        const totalCount = articlesCount[0] ? articlesCount[0].totalCount : 0
        revalidatePath('/search?q')
        return { data: JSON.parse(JSON.stringify(articles)), totalPages: Math.ceil(totalCount / limit) };
    } catch (error) {
        handleError(error.message);
    }
};

export const bookmarkArticle = async ({ userId, articleId }) => {
    try {
        await connectDb();

        const article = await Article.findOne({ _id: articleId });
        const userData = await User.findOne({ _id: userId });

        if (!userData || !article) {
            return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
        }

        const index = userData.bookmarks.findIndex((id) => id === articleId);

        if (index === -1) {
            userData.bookmarks.push(articleId);
            article.bookmarks.push(userId);
        } else {
            userData.bookmarks = userData.bookmarks.filter(
                (id) => id !== articleId
            );
            article.bookmarks = article.bookmarks.filter((id) => id !== userId);
        }

        await User.findByIdAndUpdate(userId, userData, { new: true });

        const bookmarkedArticle = await Article.findByIdAndUpdate(articleId, article, { new: true });

        return JSON.parse(JSON.stringify(bookmarkedArticle));
    } catch (error) {
        handleError(error.message);
    }
};