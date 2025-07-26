import { createCookieSessionStorage, redirect, json } from "@remix-run/node";
import { authenticator } from "./auth.server";
import { environment } from "../../environments/environment";
import { CartModel } from "../../models/cart.model";
import { generateId, validateId, EntityType } from "../../lib/utils";
import type { Cart } from "../../types/Cart";
import { CartService } from "../../services/cart.server";

// Session storage configuration
const sessionSecret = environment.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set in environment variables");
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: environment.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

// Get session from request
export async function getSessionFromRequest(request: Request) {
  const cookie = request.headers.get("Cookie");
  return getSession(cookie);
}

// Create session for a user
export async function createUserSession(
  userId: string,
  redirectTo: string = "/_thop.store.products"
) {
  if (
    !validateId(userId, EntityType.User) &&
    !validateId(userId, EntityType.Guest)
  ) {
    throw json({ error: "Invalid user ID format" }, { status: 400 });
  }

  const session = await getSession();
  session.set("userId", userId);

  // Merge guest cart with user cart if exists
  const guestCartId = session.get("cartId");
  if (guestCartId && validateId(guestCartId, EntityType.Cart)) {
    await CartService.syncGuestCart(userId, guestCartId);
    session.unset("cartId"); // Clear guest cartId from session
  }

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

// Logout user by destroying session
export async function logout(
  request: Request,
  redirectTo: string = "/_thop_.login"
) {
  const session = await getSessionFromRequest(request);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

// Get authenticated user from session
export async function getUserFromSession(request: Request) {
  try {
    const user = await authenticator.isAuthenticated(request);
    if (!user) return null;
    if (!validateId(user.id, EntityType.User)) {
      console.error("Invalid user ID format:", user.id);
      return null;
    }
    return user;
  } catch (error) {
    console.error("getUserFromSession error:", error);
    return null;
  }
}

// Check if user is admin
export async function requireAdmin(request: Request): Promise<void> {
  const user = await getUserFromSession(request);
  if (!user || !user.isAdmin) {
    throw redirect("/_thop_.login?redirect=/admin/dashboard", {
      status: 403,
    });
  }
}

// Get or create cart (guest or user)
export async function getOrCreateCart(request: Request): Promise<{
  cart: Cart;
  session: Awaited<ReturnType<typeof getSession>>;
}> {
  const session = await getSessionFromRequest(request);
  const user = await getUserFromSession(request);
  const userId = user?.userId || null;
  let cartId = session.get("cartId");

  let cart: Cart | null = null;
  if (userId) {
    cart = (await CartModel.findOne({ userId }).lean()) as Cart;
  } else if (cartId) {
    if (!validateId(cartId, EntityType.Cart)) {
      throw json({ error: "Invalid cart ID format" }, { status: 400 });
    }
    cart = (await CartModel.findOne({ cartId }).lean()) as Cart;
  }

  if (!cart) {
    cartId = generateId(EntityType.Cart);
    cart = await CartService.createCart(userId);
    session.set("cartId", cartId);
  }

  return { cart, session };
}

// Add item to cart
export async function addToCart(
  request: Request,
  productId: string,
  quantity: number
) {
  try {
    if (!validateId(productId, EntityType.Product)) {
      throw new Error("Invalid product ID format");
    }
    if (quantity < 1) {
      throw new Error("Quantity must be positive");
    }

    const { cart, session } = await getOrCreateCart(request);
    const updatedCart = await CartService.addToCart(
      session.get("userId") || null,
      cart.cartId,
      productId,
      quantity
    );
    return commitSession(session);
  } catch (error) {
    console.error("addToCart error:", error);
    throw json({ error: (error as Error).message }, { status: 400 });
  }
}

// Remove item from cart
export async function removeFromCart(request: Request, productId: string) {
  try {
    if (!validateId(productId, EntityType.Product)) {
      throw new Error("Invalid product ID format");
    }

    const { cart, session } = await getOrCreateCart(request);
    const updatedCart = await CartService.removeFromCart(
      session.get("userId") || null,
      cart.cartId,
      productId
    );
    return commitSession(session);
  } catch (error) {
    console.error("removeFromCart error:", error);
    throw json({ error: (error as Error).message }, { status: 400 });
  }
}

// Clear cart
export async function clearCart(request: Request) {
  try {
    const { cart, session } = await getOrCreateCart(request);
    await CartService.clearCart(session.get("userId") || null, cart.cartId);
    return commitSession(session);
  } catch (error) {
    console.error("clearCart error:", error);
    throw json({ error: (error as Error).message }, { status: 400 });
  }
}
