import { Schema, model, models } from "mongoose";

const BookSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: String,
  title: String,
  author_firstName: { type: String, required: true },
  author_lastName: { type: String, required: true },
  genre: { type: String, required: true },
  ISBN: { type: String, required: true },
  price: { type: Number, required: true },
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