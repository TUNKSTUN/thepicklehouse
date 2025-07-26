// app/types/Cart.ts
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  cartId: string;
  userId: string | null;
  items: CartItem[];
  isCheckOut: boolean;
  createdAt: Date;
}
