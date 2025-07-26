import mongoose, { Schema, Document } from "mongoose";
import {
  User,
  UserRole,
  Address,
  PurchaseHistory,
  Wishlist,
} from "../types/User";

const AddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const PurchaseHistorySchema = new Schema<PurchaseHistory>({
  productId: { type: String, required: true }, // References Product.productId
  totalPaid: { type: String, required: true },
  purchasedDate: { type: String, required: true },
  purchaseStatus: { type: String, required: true },
  quantity: { type: String, required: true },
});

const WishlistSchema = new Schema<Wishlist>({
  products: [{ type: String }], // Array of Product.productId
});

const UserSchema = new Schema<User>({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "guest"], required: true },
  phone: { type: String },
  address: { type: [AddressSchema], default: [] },
  isActive: { type: Boolean, required: true, default: true },
  orderHistory: { type: [PurchaseHistorySchema], default: [] },
  wishlist: { type: [WishlistSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes for performance
UserSchema.index({ userId: 1 });
UserSchema.index({ email: 1 });

// Prevent model redefinition
export const UserModel =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);
