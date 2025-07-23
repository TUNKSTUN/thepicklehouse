import React, { useState, useMemo } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Tag,
  Truck,
  Shield,
  CreditCard,
  ArrowRight,
  Gift,
  Percent,
  Clock,
} from "lucide-react";
import { useNavigate } from "@remix-run/react";
import Mockup from "../assets/thop2.png";
import AuntyMasalaMaking from "../assets/home/market_vendor.png";
// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "Traditional Mango Pickle",
    description: "Authentic Hyderabadi style mango pickle",
    price: 299,
    originalPrice: 349,
    quantity: 2,
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
    quantity: 1,
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
    quantity: 3,
    image: Mockup,
    inStock: true,
    category: "Lemon",
  },
];

// Cart Item Component
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  const totalPrice = item.price * item.quantity;
  const totalOriginalPrice = item.originalPrice
    ? item.originalPrice * item.quantity
    : null;

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
                ₹{totalPrice}
              </span>
              {totalOriginalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{totalOriginalPrice}
                </span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-semibold text-foreground">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
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

// Order Summary Component
const OrderSummary = ({ cartItems, promoCode, setPromoCode, onApplyPromo }) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const originalSubtotal = cartItems.reduce((sum, item) => {
    const price = item.originalPrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  const discount = originalSubtotal - subtotal;
  const promoDiscount = promoCode === "PICKLE10" ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal - promoDiscount + shipping;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-playfair font-semibold text-xl text-foreground mb-4">
        Order Summary
      </h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-muted-foreground">
          <span>
            Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
            items)
          </span>
          <span>₹{subtotal}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Product Discounts</span>
            <span>-₹{discount}</span>
          </div>
        )}

        {promoDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Promo Code Discount</span>
            <span>-₹{Math.round(promoDiscount)}</span>
          </div>
        )}

        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
        </div>

        {shipping > 0 && (
          <div className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
            <Truck className="w-4 h-4 inline mr-1" />
            Add ₹{500 - subtotal} more for FREE shipping!
          </div>
        )}
      </div>

      {/* Promo Code */}
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={onApplyPromo}
            className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity"
          >
            Apply
          </button>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Try: PICKLE10 for 10% off
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex justify-between items-center text-lg font-bold text-foreground">
          <span>Total</span>
          <span>₹{Math.round(total)}</span>
        </div>
      </div>
    </div>
  );
};

// Main Cart Component
const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();
  const [appliedPromo, setAppliedPromo] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handleApplyPromo = () => {
    if (promoCode === "PICKLE10") {
      setAppliedPromo(promoCode);
      alert("Promo code applied! 10% discount added.");
    } else if (promoCode) {
      alert("Invalid promo code. Try PICKLE10");
    }
  };

  const handleCheckout = () => {
    navigate("/store/bankconfirm");
    // setIsCheckingOut(true);
    // setTimeout(() => {
    //   alert("Order placed successfully! Thank you for your purchase.");
    //   setIsCheckingOut(false);
    // }, 2000);
  };

  const isEmpty = cartItems.length === 0;

  if (isEmpty) {
    return (
      <div className="min-h-screen">
        {/* <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-foreground mb-6 animate-fade-up">
              Your <span className="text-primary">Cart</span>
            </h1>
          </div>
        </section> */}

        {/* Empty Cart */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-card border border-border rounded-lg p-12">
              <ShoppingCart className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any delicious pickles to your cart
                yet.
              </p>
              <a
                href="/products"
                className="btn-hero inline-flex items-center gap-2"
              >
                Start Shopping
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
            Your <span className="text-primary">Cart</span>
          </h1>
          <p
            className="text-xl text-muted-foreground leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Review your selected pickles and proceed to checkout
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-playfair font-bold text-foreground">
                  Cart Items ({cartItems.length})
                </h2>
                <button
                  onClick={() => setCartItems([])}
                  className="text-muted-foreground hover:text-destructive transition-colors text-sm"
                >
                  Clear all items
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-stagger"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CartItem
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <a
                  href="/products"
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Continue Shopping
                </a>
              </div>
            </div>

            {/* Order Summary & Checkout */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-6">
                <OrderSummary
                  cartItems={cartItems}
                  promoCode={promoCode}
                  setPromoCode={setPromoCode}
                  onApplyPromo={handleApplyPromo}
                />

                {/* Trust Indicators */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>Free shipping on orders ₹500+</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span>Delivery in 2-3 business days</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={
                    isCheckingOut || cartItems.some((item) => !item.inStock)
                  }
                  className="w-full btn-hero flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Proceed to Checkout
                    </>
                  )}
                </button>

                {/* Payment Methods */}
                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-2">Accepted Payment Methods</p>
                  <div className="flex justify-center gap-2">
                    <div className="bg-muted rounded px-2 py-1 text-xs">
                      Cards
                    </div>
                    <div className="bg-muted rounded px-2 py-1 text-xs">
                      UPI
                    </div>
                    <div className="bg-muted rounded px-2 py-1 text-xs">
                      Wallets
                    </div>
                    <div className="bg-muted rounded px-2 py-1 text-xs">
                      COD
                    </div>
                  </div>
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
              You Might Also Like
            </h2>
            <p className="text-lg text-muted-foreground">
              Complete your pickle collection with these popular choices
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
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
