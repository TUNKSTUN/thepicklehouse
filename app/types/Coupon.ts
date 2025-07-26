export type CouponType = 'flat' | 'percentage';

export interface Coupon {
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