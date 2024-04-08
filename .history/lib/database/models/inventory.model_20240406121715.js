import { Schema, model, models } from "mongoose";

const InventorySchema = new Schema({
    articleId: {type: Schema.Types.ObjectId, ref: 'Article', required: true,},
    quantity: { type: Number, required: true },
    publishedAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
})

const Inventory = models.Inventory || model('Inventory', InventorySchema);

export default Inventory;