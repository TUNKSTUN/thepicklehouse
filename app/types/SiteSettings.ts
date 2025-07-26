export interface ShippingRate {
  region: string;
  rate: number;
}

export interface SiteSettings {
  _id: string;
  storeName: string;
  currency: string;
  logoUrl: string;
  contactEmail: string;
  shippingRates: ShippingRate[];
  razorpayKey: string;
  [key: string]: any; // extensible
}
    