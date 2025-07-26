import mongoose, { Schema, Document } from "mongoose";

export type CouponType = "flat" | "percentage";

export interface Coupon extends Document {
  _id: string;
  code: string;
  type: CouponType;
  value: number;
  minPurchaseAmount?: number;
  expiryDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    type: { type: String, enum: ["flat", "percentage"], required: true },
    value: {
      type: Number,
      required: true,
      min: [0, "Value must be non-negative"],
      validate: {
        validator: function (this: Coupon, value: number) {
          return this.type === "percentage" ? value <= 100 : true;
        },
        message: "Percentage discount cannot exceed 100",
      },
    },
    minPurchaseAmount: { type: Number, min: 0 },
    expiryDate: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Prevent model redefinition
export const CouponModel =
  mongoose.models.Coupon || mongoose.model<Coupon>("Coupon", CouponSchema);
