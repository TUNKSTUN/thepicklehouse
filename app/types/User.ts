import { Product } from "./Product";
export type UserRole = "user" | "admin" | "moderator";

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PurchaseHistory {
  productId: string;
  totalPaid: string;
  purchasedDate: string;
  purchaseStatus: string;
  quantity: string;
}

export interface User {
  _id: string;
  userId: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isAdmin?: boolean;
  phone?: string;
  address: Address[];
  isActive: boolean;
  orderHistory: PurchaseHistory[];
  wishlist: Wishlist[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Wishlist {
  products: Product | Product[];

}
