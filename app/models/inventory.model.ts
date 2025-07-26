import mongoose, { Schema, Document } from "mongoose";
import type { InventoryChangeType } from "~/types/InventoryLog";

export interface InventoryLog extends Document {
  inventoryId: string;
  productId: string;
  change: number;
  type: InventoryChangeType;
  note?: string;
  timestamp: Date;
  adminId?: string;
  orderId?: string; // Added to link to orders
}

const InventoryLogSchema: Schema = new Schema(
  {
    inventoryId: { type: String, required: true, unique: true },
    productId: { type: String, required: true },
    change: { type: Number, required: true },
    type: {
      type: String,
      enum: ["restock", "purchase", "manual"],
      required: true,
    },
    note: { type: String },
    timestamp: { type: Date, default: Date.now },
    adminId: { type: String },
    orderId: { type: String }, // Added to track order-related changes
  },
  {
    id: false,
    timestamps: { createdAt: "timestamp", updatedAt: false },
  }
);

// Index for performance
InventoryLogSchema.index({ productId: 1, timestamp: -1 });
InventoryLogSchema.index({ orderId: 1 });

// Prevent model redefinition
export const InventoryLogModel =
  mongoose.models.InventoryLog ||
  mongoose.model<InventoryLog>("InventoryLog", InventoryLogSchema);
