export type ProductCategory = "pickle" | "sauce" | "chutney";
export type ProductType = "veg" | "non-veg";

export interface NutritionalInfo {
  servingSize: string;
  calories: number;
  fat: string;
  sodium: string;
  carbs: string;
  fiber: string;
  protein: string;
  sugar: string;
  vitamin_c: string;
  iron: string;
  energy: string;
}

export interface Ingredients {
  primary: string[];
  spices: string[];
}

export interface Packaging {
  bottle: string[];
  plastic_bag: string[];
}

export interface TraditionalHeritage {
  origin: string;
  BestServeWith: string[];
}

export interface Product {
  _id: string;
  productId: string;
  name: string;
  slug: string;
  description: string;
  about: string;
  longDescription?: string;
  category: ProductCategory;
  type: ProductType;
  region: string;
  shelf_life: string;
  traditional_heritage: TraditionalHeritage;
  key_characteristics: string[];
  health_benefits: string[];
  ingredients: Ingredients;
  nutritionalInfo: NutritionalInfo;
  packaging: Packaging;
  price: number;
  discount: number;
  stock: number;
  inStock: boolean;
  spiceLevel: number;
  isVeg: boolean;
  imageUrl: string;
  isFeatured: boolean;
  views: number;
  likes: number;
  rating: number;
  reviews: number;
  wishListed: number;
  createdAt: Date;
  updatedAt: Date;
  size?: string;
}
