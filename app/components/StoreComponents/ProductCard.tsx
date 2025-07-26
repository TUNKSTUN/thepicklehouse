import { Button } from "~/components/ui/button";
import { Product } from "~/types/Product";
import { Link } from "react-router-dom"; // or use `next/link` for Next.js

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    originalPrice?: number | null;
    discount?: number;
    popular?: boolean;
    nonVegType?: string;
  };
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/store/product/${product.id}`} className="block">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h3 className="text-lg font-semibold hover:text-primary">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground hover:text-primary">
          {product.nonVegType
            ? `Non-Veg (${product.nonVegType})`
            : "Vegetarian"}
        </p>
      </Link>
      <div className="flex items-center justify-between mt-2">
        <div className="space-x-2">
          {product.price != null &&
            product.price !== "" &&
            !isNaN(Number(product.price)) &&
            Number(product.price) >= 0 && (
              <span className="text-lg font-bold text-primary">
                ₹{Number(product.price).toFixed(2)}
              </span>
            )}
          {product.discount &&
            product.originalPrice != null &&
            product.originalPrice !== "" &&
            !isNaN(Number(product.originalPrice)) &&
            Number(product.originalPrice) > 0 && (
              <span className="text-sm text-muted-foreground line-through tracking-wider">
                ₹{Number(product.originalPrice).toFixed(2)}
              </span>
            )}
        </div>
        {product.popular && (
          <span className="text-sm text-primary font-semibold">Popular</span>
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <Button onClick={onAddToCart} className="flex-1 bg-primary text-white">
          Add to Cart
        </Button>
        <Button onClick={onAddToWishlist} variant="outline" className="flex-1">
          Wishlist
        </Button>
      </div>
    </div>
  );
}
