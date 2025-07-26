import { Address } from "./User";

export type PaymentStatus = {
  statusType: "pending" | "paid" | "failed" | "cancelled";
};
export type DeliveryStatus = {
  statusType: "processing" | "shipped" | "delivered" | "cancelled";
  cancellationReason: string;
};
export type PaymentMethod = "razorpay" | "cod";

export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  _id: string;
  orderId: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  deliveryEstimate?: Date;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  orderNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}
