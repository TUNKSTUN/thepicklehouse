// app/models/cart.model.ts
import mongoose, { Schema } from "mongoose";
import type { Cart } from "~/types/Cart";

const cartItemSchema = new Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const cartSchema = new Schema<Cart>(
  {
    cartId: { type: String, required: true, unique: true },
    userId: { type: String, default: null }, // Remove unique constraint
    items: [cartItemSchema],
    isCheckOut: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { id: false }
);

export const CartModel =
  mongoose.models.Cart || mongoose.model<Cart>("Cart", cartSchema);