import { Schema, model, models } from "mongoose";

const BookSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: String,
  title: String,
    author: String,
    genre: String,
    ISBN: String,
{ type: String, required: true }
    availability: { type: String, required: true },
  category: { type: String, required: true },
  category_id: { type: String, required: true },
  subCategory: { type: String, },
  image: { type: String, required: true },
  image_id: { type: String, required: true },
  tags: { type: Array, required: true },
  peges: { type: Array, required: true },
  bookmarks: { type: Array },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  publishedAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
})

const Book = models.Book || model('Book', BookSchema);

export default Book;