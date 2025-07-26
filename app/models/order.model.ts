import mongoose, { Schema, Document } from "mongoose";
import { Address } from "../types/User";

export interface PaymentStatus {
  statusType: "pending" | "paid" | "failed" | "cancelled";
}

export interface DeliveryStatus {
  statusType: "processing" | "shipped" | "delivered" | "cancelled";
  cancellationReason: string;
}

export type PaymentMethod = "razorpay" | "cod";

export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order extends Document {
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
  couponCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        priceAtPurchase: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      statusType: {
        type: String,
        enum: ["pending", "paid", "failed", "cancelled"],
        default: "pending",
      },
    },
    deliveryStatus: {
      statusType: {
        type: String,
        enum: ["processing", "shipped", "delivered", "cancelled"],
        default: "processing",
      },
      cancellationReason: { type: String, default: "" },
    },
    deliveryEstimate: { type: Date },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, enum: ["razorpay", "cod"], required: true },
    orderNotes: { type: String },
    couponCode: { type: String },
  },
  { timestamps: true }
);

export const OrderModel =
  mongoose.models.Order || mongoose.model<Order>("Order", OrderSchema);
