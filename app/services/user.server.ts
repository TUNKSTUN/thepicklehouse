import { ProductModel } from "../models/product.model";
import { UserModel } from "../models/user.model";
import { Product } from "../types/Product";
import { v4 as uuidv4 } from "uuid";

export class ProductService {
  static async getAllProducts({
    limit = 10,
    skip = 0,
    category,
  }: {
    limit?: number;
    skip?: number;
    category?: string;
  }): Promise<Product[]> {
    const query = category ? { category } : {};
    return ProductModel.find(query).skip(skip).limit(limit).lean();
  }

  static async getProduct(identifier: string): Promise<Product | null> {
    return ProductModel.findOne({
      $or: [{ slug: identifier }, { productId: identifier }],
    }).lean();
  }

  static async createProduct(
    productData: Omit<
      Product,
      "_id" | "createdAt" | "updatedAt" | "productId" | "wishListed"
    >
  ): Promise<Product> {
    const productId = `PROD-${uuidv4().slice(0, 16)}`;
    const product = new ProductModel({
      ...productData,
      productId,
      wishListed: 0,
    });
    return product.save();
  }

  static async updateProduct(
    id: string,
    updateData: Partial<Product>
  ): Promise<Product | null> {
    return ProductModel.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    ).lean();
  }

  static async addToWishlist(
    userId: string,
    productId: string
  ): Promise<Product | null> {
    const product = await ProductModel.findOneAndUpdate(
      { productId },
      { $inc: { wishListed: 1 }, updatedAt: new Date() },
      { new: true }
    ).lean();
    if (!product) return null;

    // Add to user's wishlist
    await UserModel.updateOne(
      { userId },
      {
        $addToSet: { "wishlist.0.products": productId },
        updatedAt: new Date(),
      },
      { upsert: true }
    );
    return product;
  }

  static async deleteProduct(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id);
  }
}
