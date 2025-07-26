import { json } from "@remix-run/node";
import { CartModel } from "../models/cart.model";
import { ProductModel } from "../models/product.model";
import { CouponModel } from "../models/coupon.model";
import { OrderService } from "../services/order.server";
import {
  generateId,
  validateId,
  checkIdUniqueness,
  EntityType,
} from "../lib/utils";
import type { Cart, CartItem } from "~/types/Cart";
import type { Product } from "../types/Product";
import type { Address } from "../types/User";
import type { Order, PaymentMethod } from "../types/Order";

export class CartService {
  /**
   * Get cart details for a user or guest.
   * @param userId - ID of the user (optional for guest carts).
   * @param cartId - ID of the guest cart (from session).
   * @returns Cart items with product details and checkout status.
   */
  static async getCart(
    userId?: string,
    cartId?: string
  ): Promise<{
    cartItems: Array<{
      productId: string;
      name: string;
      description: string;
      price: number;
      originalPrice?: number;
      quantity: number;
      image: string;
      inStock: boolean;
      category: string;
    }>;
    isCheckOut: boolean;
  }> {
    try {
      let cart: Cart | null = null;
      if (userId) {
        if (
          !validateId(userId, EntityType.User) &&
          !validateId(userId, EntityType.Guest)
        ) {
          throw new Error("Invalid user ID format");
        }
        cart = (await CartModel.findOne({ userId }).lean()) as Cart;
      } else if (cartId) {
        if (!validateId(cartId, EntityType.Cart)) {
          throw new Error("Invalid cart ID format");
        }
        cart = (await CartModel.findOne({ cartId }).lean()) as Cart;
      }

      const items = cart?.items || [];
      const isCheckOut = cart?.isCheckOut || false;

      if (!items.length) {
        return { cartItems: [], isCheckOut: false };
      }

      const productIds = items.map((item) => item.productId);
      const products = await ProductModel.find({
        productId: { $in: productIds },
      }).lean();

      const cartItems = items
        .map((item) => {
          const product = products.find((p) => p.productId === item.productId);
          if (!product) return null;
          return {
            productId: product.productId,
            name: product.name,
            description: product.description || "",
            price: product.discount
              ? product.price * (1 - product.discount / 100)
              : product.price,
            originalPrice: product.discount ? product.price : undefined,
            quantity: item.quantity,
            image: product.image || "/placeholder.png",
            inStock: product.inStock ?? true,
            category: product.category || "Unknown",
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      return { cartItems, isCheckOut };
    } catch (error) {
      console.error("CartService.getCart error:", error);
      throw json({ error: "Failed to fetch cart" }, { status: 400 });
    }
  }

  /**
   * Create a new cart for a user or guest.
   * @param userId - ID of the user (optional for guest carts).
   * @returns Created cart.
   */
  // app/services/cart.server.ts
  static async createCart(userId: string | null): Promise<Cart> {
    try {
      if (
        userId &&
        !validateId(userId, EntityType.User) &&
        !validateId(userId, EntityType.Guest)
      ) {
        throw new Error("Invalid user ID format");
      }

      // For guest users, check for an existing non-checked-out cart
      if (!userId) {
        const existingGuestCart = await CartModel.findOne({
          userId: null,
          isCheckOut: false,
        }).lean();
        if (existingGuestCart) {
          return existingGuestCart as Cart;
        }
      }

      const cartId = generateId(EntityType.Cart);
      if (!(await checkIdUniqueness(cartId, CartModel, "cartId"))) {
        throw new Error("Generated cart ID is not unique");
      }

      const cart = new CartModel({
        cartId,
        userId,
        items: [],
        isCheckOut: false,
        createdAt: new Date(),
      });
      return await cart.save();
    } catch (error) {
      console.error("CartService.createCart error:", error);
      throw json({ error: "Failed to create cart" }, { status: 400 });
    }
  }

  /**
   * Sync guest cart with user cart upon login.
   * @param userId - ID of the user.
   * @param guestCartId - ID of the guest cart.
   * @returns Updated user cart.
   */
  static async syncGuestCart(
    userId: string,
    guestCartId: string
  ): Promise<Cart> {
    try {
      if (
        !validateId(userId, EntityType.User) &&
        !validateId(userId, EntityType.Guest)
      ) {
        throw new Error("Invalid user ID format");
      }
      if (!validateId(guestCartId, EntityType.Cart)) {
        throw new Error("Invalid guest cart ID format");
      }

      const guestCart = (await CartModel.findOne({
        cartId: guestCartId,
      }).lean()) as Cart | null;
      if (!guestCart) {
        throw new Error("Guest cart not found");
      }

      let userCart = await CartModel.findOne({ userId });
      if (!userCart) {
        userCart = await CartService.createCart(userId);
      }

      for (const guestItem of guestCart.items) {
        const existingItem = userCart.items.find(
          (item) => item.productId === guestItem.productId
        );
        if (existingItem) {
          existingItem.quantity += guestItem.quantity;
        } else {
          userCart.items.push(guestItem);
        }
      }

      await userCart.save();
      await CartModel.deleteOne({ cartId: guestCartId }); // Clean up guest cart
      return userCart.toObject();
    } catch (error) {
      console.error("CartService.syncGuestCart error:", error);
      throw json({ error: "Failed to sync guest cart" }, { status: 400 });
    }
  }

  /**
   * Add an item to the cart.
   * @param userId - ID of the user (null for guest).
   * @param cartId - ID of the guest cart (required if userId is null).
   * @param productId - ID of the product.
   * @param quantity - Quantity to add.
   * @returns Updated cart or null for guest carts (handled by session).
   */
  static async addToCart(
    userId: string | null,
    cartId: string | null,
    productId: string,
    quantity: number = 1
  ): Promise<Cart | null> {
    try {
      if (quantity < 1) throw new Error("Quantity must be at least 1");
      if (!validateId(productId, EntityType.Product)) {
        throw new Error("Invalid product ID format");
      }

      const product = await ProductModel.findOne({ productId }).lean();
      if (!product) throw new Error("Product not found");

      let cart: Cart | null = null;
      if (userId) {
        if (
          !validateId(userId, EntityType.User) &&
          !validateId(userId, EntityType.Guest)
        ) {
          throw new Error("Invalid user ID format");
        }
        cart = await CartModel.findOne({ userId });
        if (!cart) {
          cart = await CartService.createCart(userId);
        }
      } else if (cartId) {
        if (!validateId(cartId, EntityType.Cart)) {
          throw new Error("Invalid cart ID format");
        }
        cart = await CartModel.findOne({ cartId });
        if (!cart) {
          cart = await CartService.createCart(null);
        }
      } else {
        throw new Error("Either userId or cartId must be provided");
      }

      const item = cart.items.find((i) => i.productId === productId);
      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price: product.price });
      }

      await cart.save();
      return cart.toObject();
    } catch (error) {
      console.error("CartService.addToCart error:", error);
      throw json({ error: (error as Error).message }, { status: 400 });
    }
  }

  /**
   * Update the quantity of an item in the cart.
   * @param userId - ID of the user (null for guest).
   * @param cartId - ID of the guest cart (required if userId is null).
   * @param productId - ID of the product.
   * @param quantity - New quantity.
   * @returns Updated cart or null if empty.
   */
  static async updateQuantity(
    userId: string | null,
    cartId: string | null,
    productId: string,
    quantity: number
  ): Promise<Cart | null> {
    try {
      if (quantity < 0) throw new Error("Quantity cannot be negative");
      if (!validateId(productId, EntityType.Product)) {
        throw new Error("Invalid product ID format");
      }

      let cart: Cart | null = null;
      if (userId) {
        if (
          !validateId(userId, EntityType.User) &&
          !validateId(userId, EntityType.Guest)
        ) {
          throw new Error("Invalid user ID format");
        }
        cart = await CartModel.findOne({ userId });
        if (!cart && quantity > 0) {
          cart = await CartService.createCart(userId);
        }
      } else if (cartId) {
        if (!validateId(cartId, EntityType.Cart)) {
          throw new Error("Invalid cart ID format");
        }
        cart = await CartModel.findOne({ cartId });
        if (!cart && quantity > 0) {
          cart = await CartService.createCart(null);
        }
      } else {
        throw new Error("Either userId or cartId must be provided");
      }

      if (!cart) return null;

      cart.items = cart.items.filter((item) => item.productId !== productId);
      if (quantity > 0) {
        cart.items.push({
          productId,
          quantity,
          price: (await ProductModel.findOne({ productId }).lean())!.price,
        });
      }

      await cart.save();
      return cart.toObject();
    } catch (error) {
      console.error("CartService.updateQuantity error:", error);
      throw json({ error: (error as Error).message }, { status: 400 });
    }
  }

  /**
   * Remove an item from the cart.
   * @param userId - ID of the user (null for guest).
   * @param cartId - ID of the guest cart (required if userId is null).
   * @param productId - ID of the product.
   * @returns Updated cart or null if not found.
   */
  static async removeFromCart(
    userId: string | null,
    cartId: string | null,
    productId: string
  ): Promise<Cart | null> {
    try {
      if (!validateId(productId, EntityType.Product)) {
        throw new Error("Invalid product ID format");
      }

      let cart: Cart | null = null;
      if (userId) {
        if (
          !validateId(userId, EntityType.User) &&
          !validateId(userId, EntityType.Guest)
        ) {
          throw new Error("Invalid user ID format");
        }
        cart = await CartModel.findOne({ userId });
      } else if (cartId) {
        if (!validateId(cartId, EntityType.Cart)) {
          throw new Error("Invalid cart ID format");
        }
        cart = await CartModel.findOne({ cartId });
      } else {
        throw new Error("Either userId or cartId must be provided");
      }

      if (!cart) return null;

      cart.items = cart.items.filter((item) => item.productId !== productId);
      await cart.save();
      return cart.toObject();
    } catch (error) {
      console.error("CartService.removeFromCart error:", error);
      throw json({ error: (error as Error).message }, { status: 400 });
    }
  }

  /**
   * Clear all items from the cart.
   * @param userId - ID of the user (null for guest).
   * @param cartId - ID of the guest cart (required if userId is null).
   * @returns Updated cart or null if not found.
   */
  static async clearCart(
    userId: string | null,
    cartId: string | null
  ): Promise<Cart | null> {
    try {
      let cart: Cart | null = null;
      if (userId) {
        if (
          !validateId(userId, EntityType.User) &&
          !validateId(userId, EntityType.Guest)
        ) {
          throw new Error("Invalid user ID format");
        }
        cart = await CartModel.findOne({ userId });
      } else if (cartId) {
        if (!validateId(cartId, EntityType.Cart)) {
          throw new Error("Invalid cart ID format");
        }
        cart = await CartModel.findOne({ cartId });
      } else {
        throw new Error("Either userId or cartId must be provided");
      }

      if (!cart) return null;

      cart.items = [];
      cart.isCheckOut = false;
      await cart.save();
      return cart.toObject();
    } catch (error) {
      console.error("CartService.clearCart error:", error);
      throw json({ error: (error as Error).message }, { status: 400 });
    }
  }

  /**
   * Initiate checkout and create an order.
   * @param userId - ID of the user (null for guest).
   * @param cartId - ID of the guest cart (required if userId is null).
   * @param shippingAddress - Shipping address.
   * @param paymentMethod - Payment method.
   * @param couponCode - Optional coupon code.
   * @returns Order details and Razorpay order ID (if applicable).
   */
  static async initiateCheckout(
    userId: string | null,
    cartId: string | null,
    shippingAddress: Address,
    paymentMethod: PaymentMethod,
    couponCode?: string
  ): Promise<{ order: Order; razorpayOrderId?: string }> {
    try {
      let cart: Cart | null = null;
      if (userId) {
        if (
          !validateId(userId, EntityType.User) &&
          !validateId(userId, EntityType.Guest)
        ) {
          throw new Error("Invalid user ID format");
        }
        cart = await CartModel.findOne({ userId });
      } else if (cartId) {
        if (!validateId(cartId, EntityType.Cart)) {
          throw new Error("Invalid cart ID format");
        }
        cart = await CartModel.findOne({ cartId });
      } else {
        throw new Error("Either userId or cartId must be provided");
      }

      if (!cart || !cart.items.length) throw new Error("Cart is empty");

      const orderDetails = await OrderService.createOrder(
        userId || null,
        shippingAddress,
        paymentMethod,
        couponCode,
        cart.items
      );
      cart.isCheckOut = true;
      await cart.save();

      return orderDetails;
    } catch (error) {
      console.error("CartService.initiateCheckout error:", error);
      throw json({ error: (error as Error).message }, { status: 400 });
    }
  }
}
