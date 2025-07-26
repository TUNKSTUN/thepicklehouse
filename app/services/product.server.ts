import mongoose from "mongoose";
import { ProductModel } from "../models/product.model";
import { UserModel } from "../models/user.model";
// import { authenticator } from "../lib/security/session.server";
import { generateId, EntityType } from "../lib/utils";
import type { Product } from "../types/Product";
import type { Request } from "@remix-run/node";

// User-facing functions
export class ProductService {
  /**
   * Fetch products with filtering and sorting (user and admin accessible).
   * @param query - MongoDB query object for filtering (e.g., category, spiceLevel, isVeg, size).
   * @param sort - MongoDB sort object (e.g., { price: 1 }).
   * @returns Array of products.
   * @throws Error if database query fails.
   */
  static async getProducts(
    query: any = {},
    sort: any = {}
  ): Promise<Product[]> {
    try {
      const products = await ProductModel.find(query).sort(sort).lean();
      return products.map((product) => ({
        ...product,
        productId: product.productId,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        expiryDate: product.expiryDate
          ? product.expiryDate.toISOString()
          : undefined,
      }));
    } catch (error) {
      console.error("ProductService.getProducts error:", error);
      throw new Error("Failed to fetch products");
    }
  }

  /**
   * Count products matching a query (user and admin accessible).
   * @param query - MongoDB query object for filtering.
   * @returns Number of matching products.
   * @throws Error if database query fails.
   */
  static async countProducts(query: any = {}): Promise<number> {
    try {
      return await ProductModel.countDocuments(query);
    } catch (error) {
      console.error("ProductService.countProducts error:", error);
      throw new Error("Failed to count products");
    }
  }

  /**
   * Get a product by productId or slug (user and admin accessible).
   * @param identifier - ProductId or slug.
   * @returns Product or null if not found.
   * @throws Error if database query fails.
   */
  static async getProduct(identifier: string): Promise<Product | null> {
    try {
      if (!identifier) {
        throw new Error("Identifier is required");
      }
      const product = await ProductModel.findOne({
        $or: [{ slug: identifier }, { productId: identifier }],
      }).lean();
      if (!product) return null;
      return {
        ...product,
        productId: product.productId,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        expiryDate: product.expiryDate
          ? product.expiryDate.toISOString()
          : undefined,
      };
    } catch (error) {
      console.error("ProductService.getProduct error:", error);
      throw new Error("Failed to fetch product");
    }
  }

  /**
   * Get featured products (user and admin accessible).
   * @param limit - Maximum number of products to return.
   * @returns Array of featured products.
   * @throws Error if database query fails.
   */
  static async getFeaturedProducts(limit: number = 6): Promise<Product[]> {
    try {
      if (limit < 0) {
        throw new Error("Limit must be non-negative");
      }
      return await ProductService.getProducts(
        { isFeatured: true },
        { rating: -1 }
      ).then((products) => products.slice(0, limit));
    } catch (error) {
      console.error("ProductService.getFeaturedProducts error:", error);
      throw new Error("Failed to fetch featured products");
    }
  }

  /**
   * Search products by name or description (user and admin accessible).
   * @param searchTerm - Term to search in name or description.
   * @param limit - Maximum number of products to return.
   * @returns Array of matching products.
   * @throws Error if database query fails.
   */
  static async searchProducts(
    searchTerm: string,
    limit: number = 10
  ): Promise<Product[]> {
    try {
      if (!searchTerm) {
        throw new Error("Search term is required");
      }
      if (limit < 0) {
        throw new Error("Limit must be non-negative");
      }
      return await ProductService.getProducts(
        {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
          ],
        },
        { rating: -1 }
      ).then((products) => products.slice(0, limit));
    } catch (error) {
      console.error("ProductService.searchProducts error:", error);
      throw new Error("Failed to search products");
    }
  }

  /**
   * Add a product to a user's wishlist (user accessible, requires authentication).
   * @param userId - ID of the user.
   * @param productId - ID of the product.
   * @returns Updated product or null if not found.
   * @throws Error if product or user is not found, or update fails.
   */
  static async addToWishlist(
    userId: string,
    productId: string
  ): Promise<Product | null> {
    try {
      if (!userId || !productId) {
        throw new Error("User ID and product ID are required");
      }

      const product = await ProductModel.findOneAndUpdate(
        { productId },
        { $inc: { wishListed: 1 }, updatedAt: new Date() },
        { new: true }
      ).lean();
      if (!product) {
        throw new Error(`Product ${productId} not found`);
      }

      const user = await UserModel.findOne({ userId }).lean();
      if (!user) {
        throw new Error(`User ${userId} not found`);
      }

      await UserModel.updateOne(
        { userId },
        {
          $addToSet: { "wishlist.0.products": productId },
          $setOnInsert: { wishlist: [{ products: [] }] },
          updatedAt: new Date(),
        },
        { upsert: true }
      );

      return {
        ...product,
        productId: product.productId,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        expiryDate: product.expiryDate
          ? product.expiryDate.toISOString()
          : undefined,
      };
    } catch (error) {
      console.error("ProductService.addToWishlist error:", error);
      throw new Error("Failed to add product to wishlist");
    }
  }

  /**
   * Remove a product from a user's wishlist (user accessible, requires authentication).
   * @param userId - ID of the user.
   * @param productId - ID of the product.
   * @returns Updated product or null if not found.
   * @throws Error if product or user is not found, or update fails.
   */
  static async removeFromWishlist(
    userId: string,
    productId: string
  ): Promise<Product | null> {
    try {
      if (!userId || !productId) {
        throw new Error("User ID and product ID are required");
      }

      const product = await ProductModel.findOneAndUpdate(
        { productId },
        { $inc: { wishListed: -1 }, updatedAt: new Date() },
        { new: true }
      ).lean();
      if (!product) {
        throw new Error(`Product ${productId} not found`);
      }

      const user = await UserModel.findOne({ userId }).lean();
      if (!user) {
        throw new Error(`User ${userId} not found`);
      }

      await UserModel.updateOne(
        { userId },
        {
          $pull: { "wishlist.0.products": productId },
          updatedAt: new Date(),
        }
      );

      return {
        ...product,
        productId: product.productId,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        expiryDate: product.expiryDate
          ? product.expiryDate.toISOString()
          : undefined,
      };
    } catch (error) {
      console.error("ProductService.removeFromWishlist error:", error);
      throw new Error("Failed to remove product from wishlist");
    }
  }

  // Admin-facing functions
  /**
   * Create a new product (admin only).
   * @param request - Remix request object for authentication.
   * @param productData - Product data excluding productId, createdAt, updatedAt, wishListed.
   * @returns Created product.
   * @throws Error if authentication fails, required fields are missing, or creation fails.
   */
  static async createProduct(
    request: Request,
    productData: Omit<
      Product,
      "productId" | "createdAt" | "updatedAt" | "wishListed"
    >
  ): Promise<Product> {
    try {
      if (!productData.name || !productData.price || !productData.slug) {
        throw new Error("Name, price, and slug are required");
      }

      const productId = generateId(EntityType.Product);
      const product = new ProductModel({
        ...productData,
        productId,
        wishListed: 0,
      });
      return await product.save().then((doc) => ({
        ...doc.toObject(),
        productId: doc.productId,
        createdAt: doc.createdAt.toISOString(),
        updatedAt: doc.updatedAt.toISOString(),
        expiryDate: doc.expiryDate ? doc.expiryDate.toISOString() : undefined,
      }));
    } catch (error) {
      console.error("ProductService.createProduct error:", error);
      throw new Error("Failed to create product");
    }
  }

  /**
   * Bulk create products (admin only).
   * @param request - Remix request object for authentication.
   * @param productsData - Array of product data excluding productId, createdAt, updatedAt, wishListed.
   * @returns Array of created products.
   * @throws Error if authentication fails, required fields are missing, or creation fails.
   */
  static async bulkCreateProducts(
    request: Request,
    productsData: Array<
      Omit<Product, "productId" | "createdAt" | "updatedAt" | "wishListed">
    >
  ): Promise<Product[]> {
    try {
      const products = productsData.map((data) => {
        if (!data.name || !data.price || !data.slug) {
          throw new Error(
            "Name, price, and slug are required for all products"
          );
        }
        return {
          ...data,
          productId: generateId(EntityType.Product),
          wishListed: 0,
        };
      });

      const inserted = await ProductModel.insertMany(products);
      return inserted.map((doc) => ({
        ...doc.toObject(),
        productId: doc.productId,
        createdAt: doc.createdAt.toISOString(),
        updatedAt: doc.updatedAt.toISOString(),
        expiryDate: doc.expiryDate ? doc.expiryDate.toISOString() : undefined,
      }));
    } catch (error) {
      console.error("ProductService.bulkCreateProducts error:", error);
      throw new Error("Failed to create products");
    }
  }

  /**
   * Update a product by productId (admin only).
   * @param request - Remix request object for authentication.
   * @param productId - ID of the product.
   * @param updateData - Partial product data to update.
   * @returns Updated product or null if not found.
   * @throws Error if authentication fails, productId is invalid, or update fails.
   */
  static async updateProduct(
    request: Request,
    productId: string,
    updateData: Partial<Product>
  ): Promise<Product | null> {
    try {
      if (!productId) {
        throw new Error("Product ID is required");
      }

      const product = await ProductModel.findOneAndUpdate(
        { productId },
        { ...updateData, updatedAt: new Date() },
        { new: true }
      ).lean();
      if (!product) {
        throw new Error(`Product ${productId} not found`);
      }

      return {
        ...product,
        productId: product.productId,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        expiryDate: product.expiryDate
          ? product.expiryDate.toISOString()
          : undefined,
      };
    } catch (error) {
      console.error("ProductService.updateProduct error:", error);
      throw new Error("Failed to update product");
    }
  }

  /**
   * Update product stock by productId (admin only).
   * @param request - Remix request object for authentication.
   * @param productId - ID of the product.
   * @param stock - New stock quantity.
   * @returns Updated product or null if not found.
   * @throws Error if authentication fails, productId is invalid, or update fails.
   */
  static async updateStock(
    request: Request,
    productId: string,
    stock: number
  ): Promise<Product | null> {
    try {
      if (!productId || stock < 0) {
        throw new Error("Product ID and non-negative stock are required");
      }

      const product = await ProductModel.findOneAndUpdate(
        { productId },
        { inStock: stock > 0, stock, updatedAt: new Date() },
        { new: true }
      ).lean();
      if (!product) {
        throw new Error(`Product ${productId} not found`);
      }

      return {
        ...product,
        productId: product.productId,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        expiryDate: product.expiryDate
          ? product.expiryDate.toISOString()
          : undefined,
      };
    } catch (error) {
      console.error("ProductService.updateStock error:", error);
      throw new Error("Failed to update product stock");
    }
  }

  /**
   * Delete a product by productId (admin only).
   * @param request - Remix request object for authentication.
   * @param productId - ID of the product.
   * @throws Error if authentication fails, productId is invalid, or deletion fails.
   */
  static async deleteProduct(
    request: Request,
    productId: string
  ): Promise<void> {
    try {
      if (!productId) {
        throw new Error("Product ID is required");
      }

      const product = await ProductModel.findOneAndDelete({ productId });
      if (!product) {
        throw new Error(`Product ${productId} not found`);
      }
    } catch (error) {
      console.error("ProductService.deleteProduct error:", error);
      throw new Error("Failed to delete product");
    }
  }
}
