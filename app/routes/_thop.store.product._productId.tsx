import React, { useState } from "react";
import {
  Star,
  Flame,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  ArrowLeft,
  Shield,
  Truck,
  Clock,
  Award,
  Users,
  CheckCircle,
} from "lucide-react";
import Mockup from "../assets/thop2.png";
import { Product, Review } from "../types/Product";

// Sample product data (would typically come from props or API)
const productData: Product = {
  id: 1,
  name: "Traditional Mango Pickle",
  description: "Authentic Hyderabadi style mango pickle with aromatic spices",
  longDescription:
    "Our Traditional Mango Pickle is crafted using time-honored recipes passed down through generations. Made with the finest raw mangoes, carefully selected spices, and pure mustard oil, this pickle delivers an authentic taste that transports you to the heart of Hyderabad. Each jar is prepared in small batches to ensure maximum freshness and flavor.",
  price: 299,
  originalPrice: 349,
  spiceLevel: 3,
  rating: 4.8,
  reviews: 124,
  popular: true,
  category: "Mango",
  images: [Mockup, Mockup, Mockup, Mockup],
  ingredients: [
    "Raw Mangoes",
    "Mustard Oil",
    "Red Chili Powder",
    "Turmeric",
    "Fenugreek Seeds",
    "Mustard Seeds",
    "Asafoetida",
    "Salt",
  ],
  nutritionalInfo: {
    servingSize: "1 tbsp (15g)",
    calories: 25,
    fat: "2g",
    sodium: "180mg",
    carbs: "2g",
    fiber: "1g",
  },
  features: [
    "No artificial preservatives",
    "Traditional recipe",
    "Made with pure mustard oil",
    "Gluten-free",
    "Vegan-friendly",
  ],
  inStock: true,
  stockCount: 45,
  weight: "400g",
};

// Sample reviews data
const reviewsData = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely delicious! Tastes just like my grandmother's homemade pickle. The spice level is perfect and the mango pieces are so tender.",
    verified: true,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    rating: 4,
    date: "1 month ago",
    comment:
      "Great quality pickle with authentic flavors. Packaging was excellent and delivery was quick. Will definitely order again!",
    verified: true,
  },
  {
    id: 3,
    name: "Anita Reddy",
    rating: 5,
    date: "3 weeks ago",
    comment:
      "This pickle brings back so many childhood memories. The taste is incredible and you can tell it's made with love and care.",
    verified: false,
  },
];

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const discount = productData.originalPrice
    ? Math.round(
        ((productData.originalPrice - productData.price) /
          productData.originalPrice) *
          100
      )
    : 0;

  const getSpiceIndicator = (level) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Flame
        key={i}
        className={`w-4 h-4 ${
          i < level ? "text-red-500 fill-current" : "text-muted-foreground"
        }`}
      />
    ));
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", { product: productData, quantity });
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, Math.min(10, quantity + delta)));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-card rounded-lg overflow-hidden border border-border">
              <img
                src={productData.images[selectedImage]}
                alt={productData.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${productData.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground">
                  {productData.name}
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isLiked
                          ? "text-red-500 fill-current"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                  <button className="p-2 rounded-full hover:bg-muted transition-colors">
                    <Share2 className="w-6 h-6 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(productData.rating)
                          ? "text-yellow-500 fill-current"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="text-lg font-semibold text-foreground ml-2">
                    {productData.rating}
                  </span>
                  <span className="text-muted-foreground">
                    ({productData.reviews} reviews)
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {productData.description}
              </p>
            </div>

            {/* Spice Level */}
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <span className="font-semibold text-foreground">
                Spice Level:
              </span>
              <div className="flex gap-1">
                {getSpiceIndicator(productData.spiceLevel)}
              </div>
              <span className="text-sm text-muted-foreground">
                ({productData.spiceLevel}/5)
              </span>
            </div>

            {/* Price and Stock */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-playfair font-bold text-foreground">
                  ₹{productData.price}
                </span>
                {productData.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{productData.originalPrice}
                    </span>
                    <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-bold">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-foreground">
                  In Stock ({productData.stockCount} available)
                </span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-muted transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-muted transition-colors"
                    disabled={quantity >= 10}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-hero w-full flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart - ₹{productData.price * quantity}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 bg-card border border-border rounded-lg">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-foreground">
                  No Preservatives
                </span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-card border border-border rounded-lg">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">
                  Traditional Recipe
                </span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-card border border-border rounded-lg">
                <Truck className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-foreground">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-card border border-border rounded-lg">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-foreground">Fresh Daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-border">
            <div className="flex gap-8">
              {["description", "ingredients", "nutrition", "reviews"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 font-semibold capitalize transition-colors ${
                      activeTab === tab
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {productData.longDescription}
                </p>
                <h3 className="text-xl font-playfair font-semibold text-foreground mb-4">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {productData.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div>
                <h3 className="text-xl font-playfair font-semibold text-foreground mb-4">
                  Ingredients
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {productData.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="p-3 bg-card border border-border rounded-lg text-center"
                    >
                      <span className="text-foreground">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div>
                <h3 className="text-xl font-playfair font-semibold text-foreground mb-4">
                  Nutritional Information
                </h3>
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="mb-4">
                    <span className="font-semibold text-foreground">
                      Serving Size: {productData.nutritionalInfo.servingSize}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(productData.nutritionalInfo)
                      .filter(([key]) => key !== "servingSize")
                      .map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {value}
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-playfair font-semibold text-foreground">
                    Customer Reviews ({productData.reviews})
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(productData.rating)
                              ? "text-yellow-500 fill-current"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-foreground">
                      {productData.rating} out of 5
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviewsData.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-border pb-6"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">
                                {review.name}
                              </span>
                              {review.verified && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "text-yellow-500 fill-current"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed ml-13">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
