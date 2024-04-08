import { Schema, model, models } from "mongoose";

const InventorySchema = new Schema({
    content: { type: String, required: true },
    articleId: {type: Schema.Types.ObjectId, ref: 'Article', required: true,},
    quauntity: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    publishedAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
})

const Inventory = models.Inventory || model('Inventory', InventorySchema);

export default Inventory;