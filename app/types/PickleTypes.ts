// types/Product.ts
export interface NutritionalInfo {
  servingSize: string;
  calories: number | string; // Allowing string to accommodate formatted values like "25"
  fat: string;
  sodium: string;
  carbs: string;
  fiber: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription?: string; // Optional, only used in SingleProductPage
  price: number;
  originalPrice: number | null;
  spiceLevel: number;
  rating: number;
  reviews: number;
  popular: boolean;
  category: string;
  images?: string[]; // Optional, only used in SingleProductPage
  ingredients?: string[]; // Optional, only used in SingleProductPage
  nutritionalInfo?: NutritionalInfo; // Optional, only used in SingleProductPage
  features?: string[]; // Optional, only used in SingleProductPage
  inStock?: boolean; // Optional, only used in SingleProductPage
  stockCount?: number; // Optional, only used in SingleProductPage
  weight?: string; // Optional, only used in SingleProductPage
  isVeg?: boolean; // Optional, used in Products page
  nonVegType?: string; // Optional, used in Products page for non-veg products
  size?: string; // Optional, used in Products page
  image?: string; // Optional, used in Products page
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}
