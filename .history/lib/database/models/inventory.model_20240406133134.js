import { Schema, model, models } from "mongoose";

const InventorySchema = new Schema({
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
})

const Inventory = models.Inventory || model('Inventory', InventorySchema);

export default Inventory;