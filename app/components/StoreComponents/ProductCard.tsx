import React, { useState } from "react";
import { Star, Flame, TrendingUp, Heart } from "lucide-react";
import { Link } from "@remix-run/react";

const ProductCard = ({ product, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);

  const getSpiceIndicator = (level) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Flame
        key={i}
        className={`w-3 h-3 ${
          i < level ? "text-red-500 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden product-card group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.popular && (
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Popular
            </div>
          )}
          <div
            className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
              product.isVeg
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {product.isVeg ? "Veg" : "Non-Veg"}
          </div>
        </div>
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-bold">
            {discount}% OFF
          </div>
        )}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm p-2 rounded-full transition-all"
        >
          <Heart
            className={`w-4 h-4 ${
              isLiked ? "text-red-500 fill-current" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/store/product/${product.id}`}>
            <h3 className="font-playfair font-semibold text-lg text-foreground line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm text-muted-foreground">
                {product.rating}
              </span>
            </div>
          </Link>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Spice Level:</span>
            <div className="flex gap-0.5">
              {getSpiceIndicator(product.spiceLevel)}
            </div>
          </div>
          <span className="text-xs text-muted-foreground">
            {product.reviews} reviews
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="btn-hero text-sm px-4 py-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
