import { CartService } from "../services/cart.server";
import { generateId, EntityType } from "../lib/utils";
import { CartModel } from "../models/cart.model";
import { ProductModel } from "../models/product.model";

describe("CartService", () => {
  beforeEach(async () => {
    await CartModel.deleteMany({});
    await ProductModel.deleteMany({});
  });

  test("should create cart with valid cartId", async () => {
    const cart = await CartService.createCart(null);
    expect(cart.cartId).toMatch(/^CART-[0-9a-f]{8}$/);
  });

  test("should add item to cart", async () => {
    const productId = generateId(EntityType.Product);
    await ProductModel.create({
      productId,
      name: "Test Pickle",
      price: 100,
      inStock: true,
    });
    const cartId = generateId(EntityType.Cart);
    const cart = await CartService.addToCart(null, cartId, productId, 2);
    expect(cart?.items).toContainEqual({ productId, quantity: 2, price: 100 });
  });

  test("should update quantity", async () => {
    const productId = generateId(EntityType.Product);
    await ProductModel.create({
      productId,
      name: "Test Pickle",
      price: 100,
      inStock: true,
    });
    const cartId = generateId(EntityType.Cart);
    await CartService.addToCart(null, cartId, productId, 2);
    const cart = await CartService.updateQuantity(null, cartId, productId, 5);
    expect(cart?.items).toContainEqual({ productId, quantity: 5, price: 100 });
  });

  test("should remove item from cart", async () => {
    const productId = generateId(EntityType.Product);
    await ProductModel.create({
      productId,
      name: "Test Pickle",
      price: 100,
      inStock: true,
    });
    const cartId = generateId(EntityType.Cart);
    await CartService.addToCart(null, cartId, productId, 2);
    const cart = await CartService.removeFromCart(null, cartId, productId);
    expect(cart?.items).toHaveLength(0);
  });
});
