import mongoose from "mongoose";
import { CouponModel, Coupon, CouponType } from "../models/coupon.model";

export class CouponService {
  /**
   * Create a new coupon.
   * @param code - Coupon code.
   * @param type - Coupon type ('flat' or 'percentage').
   * @param value - Discount value (amount for flat, percentage for percentage).
   * @param minPurchaseAmount - Minimum purchase amount to apply the coupon.
   * @param expiryDate - Coupon expiration date.
   * @param isActive - Whether the coupon is active.
   * @returns Created coupon.
   */
  static async createCoupon(
    code: string,
    type: CouponType,
    value: number,
    minPurchaseAmount?: number,
    expiryDate?: Date,
    isActive: boolean = true
  ): Promise<Coupon> {
    try {
      const coupon = new CouponModel({
        code: code.toUpperCase(),
        type,
        value,
        minPurchaseAmount,
        expiryDate,
        isActive,
      });
      return await coupon.save();
    } catch (error) {
      console.error("CouponService.createCoupon error:", error);
      throw new Error("Failed to create coupon");
    }
  }

  /**
   * Validate a coupon code and check applicability.
   * @param code - Coupon code.
   * @param cartTotal - Total cart amount to check against minPurchaseAmount.
   * @returns Coupon if valid, null otherwise.
   */
  static async validateCoupon(
    code: string,
    cartTotal: number
  ): Promise<Coupon | null> {
    try {
      const coupon = await CouponModel.findOne({
        code: code.toUpperCase(),
        isActive: true,
      }).lean();
      if (!coupon) return null;

      // Check expiration date
      if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
        return null;
      }

      // Check minimum purchase amount
      if (coupon.minPurchaseAmount && cartTotal < coupon.minPurchaseAmount) {
        return null;
      }

      return coupon;
    } catch (error) {
      console.error("CouponService.validateCoupon error:", error);
      throw new Error("Failed to validate coupon");
    }
  }

  /**
   * Deactivate a coupon.
   * @param couponId - The ID of the coupon (_id).
   * @returns Updated coupon or null if not found.
   */
  static async deactivateCoupon(couponId: string): Promise<Coupon | null> {
    try {
      return await CouponModel.findByIdAndUpdate(
        couponId,
        { isActive: false, updatedAt: new Date() },
        { new: true }
      ).lean();
    } catch (error) {
      console.error("CouponService.deactivateCoupon error:", error);
      throw new Error("Failed to deactivate coupon");
    }
  }

  /**
   * Get all active coupons.
   * @returns List of active coupons.
   */
  static async getActiveCoupons(): Promise<Coupon[]> {
    try {
      return await CouponModel.find({
        isActive: true,
        $or: [
          { expiryDate: { $exists: false } },
          { expiryDate: { $gte: new Date() } },
        ],
      }).lean();
    } catch (error) {
      console.error("CouponService.getActiveCoupons error:", error);
      throw new Error("Failed to fetch coupons");
    }
  }

  /**
   * Calculate discount for a coupon.
   * @param coupon - The coupon to apply.
   * @param cartTotal - Total cart amount before discount.
   * @returns Discount amount.
   */
  static calculateDiscount(coupon: Coupon, cartTotal: number): number {
    if (coupon.type === "flat") {
      return Math.min(coupon.value, cartTotal); // Ensure discount doesn't exceed cart total
    }
    return (coupon.value / 100) * cartTotal;
  }
}
