import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
    content: { type: String, required: true },
    articleId: {type: Schema.Types.ObjectId, ref: 'Article', required: true,},
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    publishedAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
})

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;

bookID: Number,
quantity: Number