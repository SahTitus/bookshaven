"use server"
import { handleError } from "@utils"
// import Article from "@lib/database/models/Article.model"
import { connectDb } from "@lib/database"
import { revalidatePath } from "next/cache"
import User from "@lib/database/models/user.model"
import Comment from "@lib/database/models/comment.model"


export const createComment = async (comment, user_id) => {
    try {
        await connectDb();

        const creator = await User.findById(user_id)

        comment.creator = creator._id,
            comment.modifiedAt = new Date();
        comment.publishedAt = new Date();

        const newArticle = await Comment.create(comment);

        revalidatePath('/')
        revalidatePath('/blog')

        return JSON.parse(JSON.stringify(newArticle));
    } catch (error) {
        handleError(error.message)
        return JSON.parse(JSON.stringify('Something went wrong'));
    }
}

export async function updateComment(comment, user_id) {
    try {
        await connectDb();

        const commentToUpdate = await Comment.findById(comment._id)

        if (!commentToUpdate || commentToUpdate.creator._id.toHexString() !== user_id) {
            throw new Error('Unauthorized or comment not found')
        }

        comment.modifiedAt = new Date();
        const updatedComment = await Comment.findByIdAndUpdate(comment._id, comment, { new: true });

        revalidatePath(`/comment/${comment._id}`)

        return JSON.parse(JSON.stringify(updatedComment))
    } catch (error) {
        handleError(error.message)
    }
}

export const deleteComment = async (id) => {
    try {
        await connectDb();

        await Comment.deleteOne({ _id: id });

        revalidatePath('/')
        revalidatePath('/blog')

        return JSON.parse(JSON.stringify('Deleted comment successfully'));
    } catch (error) {
        handleError(error.message)
    }
};

//Handles fecthing comments by category, title, and subcategory
export const fetchComments = async ({ query,  }) => {
    try {
        await connectDb();

        const conditions = {
            $or: [
                { title: query },
            ]
        };



        const comments = await Comment.find(conditions)
            .sort({ publishedAt: 'desc' })

        return { data: JSON.parse(JSON.stringify(comments)),  }
    } catch (error) {
        handleError(error.message);
    }
};