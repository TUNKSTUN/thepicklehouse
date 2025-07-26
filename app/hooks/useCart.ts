// import { useEffect, useMemo } from "react";
// import { useFetcher, useRouteLoaderData } from "@remix-run/react";
// import type { Cart, CartItem } from "../types/Cart";

// interface CartState {
//   cartItems: CartItem[];
//   totalItems: number;
//   isCheckOut: boolean;
//   isLoading: boolean;
//   error?: string;
// }

// export function useCart() {
//   const fetcher = useFetcher<{
//     cartItems: Array<{
//       productId: string;
//       name: string;
//       description: string;
//       price: number;
//       originalPrice?: number;
//       quantity: number;
//       image: string;
//       inStock: boolean;
//       category: string;
//     }>;
//     isCheckOut: boolean;
//     error?: string;
//   }>();
//   const loaderData = useRouteLoaderData<{
//     cartItems: Array<{
//       productId: string;
//       name: string;
//       description: string;
//       price: number;
//       originalPrice?: number;
//       quantity: number;
//       image: string;
//       inStock: boolean;
//       category: string;
//     }>;
//     isCheckOut: boolean;
//   }>("routes/_thop.store.cart");

//   useEffect(() => {
//     if (fetcher.state === "idle" && !fetcher.data) {
//       fetcher.load("/store/cart");
//     }
//   }, [fetcher]);

//   const cartState: CartState = useMemo(() => {
//     const data = fetcher.data || loaderData;
//     const cartItems = data?.cartItems || [];
//     const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//     const isCheckOut = data?.isCheckOut || false;
//     const isLoading = fetcher.state !== "idle";
//     const error = data?.error;

//     return { cartItems, totalItems, isCheckOut, isLoading, error };
//   }, [fetcher.data, fetcher.state, loaderData]);

//   const addToCart = (productId: string, quantity: number = 1) => {
//     const formData = new FormData();
//     formData.append("action", "addToCart");
//     formData.append("productId", productId);
//     formData.append("quantity", quantity.toString());
//     fetcher.submit(formData, { method: "post", action: "/_thop.store.cart" });
//   };

//   const updateQuantity = (productId: string, quantity: number) => {
//     const formData = new FormData();
//     formData.append("action", "updateQuantity");
//     formData.append("productId", productId);
//     formData.append("quantity", quantity.toString());
//     fetcher.submit(formData, { method: "post", action: "/_thop.store.cart" });
//   };

//   const removeItem = (productId: string) => {
//     const formData = new FormData();
//     formData.append("action", "removeItem");
//     formData.append("productId", productId);
//     fetcher.submit(formData, { method: "post", action: "/_thop.store.cart" });
//   };

//   const clearCart = () => {
//     const formData = new FormData();
//     formData.append("action", "clearCart");
//     fetcher.submit(formData, { method: "post", action: "/_thop.store.cart" });
//   };

//   return { ...cartState, addToCart, updateQuantity, removeItem, clearCart };
// }
