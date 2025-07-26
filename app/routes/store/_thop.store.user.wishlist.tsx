import React, { useState } from "react";
import { Heart, ShoppingCart, Trash2, ArrowRight, Gift } from "lucide-react";
import { useNavigate } from "@remix-run/react";
import Mockup from "../assets/thop2.png";
import AuntyMasalaMaking from "../assets/home/market_vendor.png";

// Sample wishlist data
const initialWishlistItems = [
  {
    id: 1,
    name: "Traditional Mango Pickle",
    description: "Authentic Hyderabadi style mango pickle",
    price: 299,
    originalPrice: 349,
    image: Mockup,
    inStock: true,
    category: "Mango",
  },
  {
    id: 2,
    name: "Fiery Red Chilli Pickle",
    description: "For spice lovers - intense heat with bold flavors",
    price: 249,
    originalPrice: null,
    image: Mockup,
    inStock: true,
    category: "Chilli",
  },
  {
    id: 4,
    name: "Lemon Pickle",
    description: "Tangy and aromatic lemon pickle",
    price: 179,
    originalPrice: null,
    image: Mockup,
    inStock: true,
    category: "Lemon",
  },
];

// Wishlist Item Component
const WishlistItem = ({ item, onRemove, onMoveToCart }) => {
  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-card border border-border rounded-lg p-4 animate-fade-up">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          {discount > 0 && (
            <div className="bg-destructive text-destructive-foreground px-1 py-0.5 rounded text-xs font-bold mt-1 text-center">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-playfair font-semibold text-lg text-foreground">
                {item.name}
              </h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-muted-foreground hover:text-destructive transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                ₹{item.price}
              </span>
              {item.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{item.originalPrice}
                </span>
              )}
            </div>

            {/* Move to Cart Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onMoveToCart(item)}
                disabled={!item.inStock}
                className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4 inline mr-1" />
                Move to Cart
              </button>
            </div>
          </div>

          {!item.inStock && (
            <div className="mt-2 text-destructive text-sm font-medium">
              Out of Stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Wishlist Component
const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const navigate = useNavigate();

  const removeItem = (itemId) => {
    setWishlistItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handleMoveToCart = (item) => {
    // In a real app, this would add the item to the cart state or API
    alert(`${item.name} moved to cart!`);
    removeItem(item.id); // Remove from wishlist after moving
  };

  const isEmpty = wishlistItems.length === 0;

  if (isEmpty) {
    return (
      <div className="min-h-screen">
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-card border border-border rounded-lg p-12">
              <Heart className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                Your Wishlist is Empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any delicious pickles to your
                wishlist yet.
              </p>
              <a
                href="/products"
                className="btn-hero inline-flex items-center gap-2"
              >
                Start Browsing
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-secondary/30">
        <div className="absolute inset-0 -z-10 bg-white">
          <img
            src={AuntyMasalaMaking}
            alt="aunty-masala-making"
            className="w-full h-full object-cover opacity-30 blur-sm"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-foreground mb-6 animate-fade-up">
            Your <span className="text-primary">Wishlist</span>
          </h1>
          <p
            className="text-xl text-muted-foreground leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Keep track of your favorite pickles
          </p>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wishlist Items */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-playfair font-bold text-foreground">
                  Wishlist Items ({wishlistItems.length})
                </h2>
                <button
                  onClick={() => setWishlistItems([])}
                  className="text-muted-foreground hover:text-destructive transition-colors text-sm"
                >
                  Clear Wishlist
                </button>
              </div>

              <div className="space-y-4">
                {wishlistItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-stagger"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <WishlistItem
                      item={item}
                      onRemove={removeItem}
                      onMoveToCart={handleMoveToCart}
                    />
                  </div>
                ))}
              </div>

              {/* Continue Browsing */}
              <div className="mt-8">
                <a
                  href="/products"
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Continue Browsing
                </a>
              </div>
            </div>

            {/* Sidebar with Actions */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-28">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-playfair font-semibold text-xl text-foreground mb-4">
                    Your Wishlist
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Save your favorite pickles for later or move them to your
                    cart to enjoy soon!
                  </p>
                  <button
                    onClick={() => navigate("/store/cart")}
                    className="w-full btn-hero flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    View Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-4">
              Explore More Pickles
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover more delicious additions to your wishlist
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-4 text-center"
              >
                <img
                  src={Mockup}
                  alt="Recommended Pickle"
                  className="w-24 h-24 object-cover rounded-lg mx-auto mb-4"
                />
                <h3 className="font-playfair font-semibold text-lg text-foreground mb-2">
                  Recommended Pickle {i}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Delicious traditional recipe
                </p>
                <button className="btn-secondary text-sm px-4 py-2">
                  Add to Wishlist
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
