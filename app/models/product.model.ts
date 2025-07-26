import mongoose, { Schema } from "mongoose";
import {
  Product,
  ProductCategory,
  ProductType,
  NutritionalInfo,
} from "../types/Product";

const NutritionalInfoSchema = new Schema<NutritionalInfo>({
  servingSize: { type: String, required: true },
  calories: { type: Number, required: true },
  fat: { type: String, required: true },
  sodium: { type: String, required: true },
  carbs: { type: String, required: true },
  fiber: { type: String, required: true },
  protein: { type: String },
  sugar: { type: String },
});

const ProductSchema = new Schema<Product>({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  category: {
    type: String,
    enum: ["pickle", "sauce", "chutney"],
    required: true,
  },
  type: { type: String, enum: ["veg", "non-veg"], required: true },
  ingredients: { type: [String], required: true },
  nutritionalInfo: { type: NutritionalInfoSchema },
  price: { type: Number, required: true },
  discount: { type: Number, min: 0, max: 100 }, // Discount as percentage
  stock: { type: Number, required: true, min: 0 },
  inStock: { type: Boolean, required: true, default: true },
  expiryDate: { type: Date },
  bestBeforeDays: { type: Number },
  spiceLevel: { type: Number, required: true, min: 1, max: 5 },
  isVeg: { type: Boolean, required: true },
  imageUrl: { type: String, required: true },
  images: { type: [String], default: [] },
  weight: { type: String },
  size: { type: String },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  rating: { type: Number, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  wishListed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes for performance
ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ productId: 1 });

export const ProductModel =
  mongoose.models.Product || mongoose.model<Product>("Product", ProductSchema);
