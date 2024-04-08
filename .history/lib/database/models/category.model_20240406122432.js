import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
    category_id: { type: String, required: true },
    name: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
});

const Category = models.Category || model('Category', CategorySchema);

export default Category;