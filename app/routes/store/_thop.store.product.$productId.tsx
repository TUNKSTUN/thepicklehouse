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
  CheckCircle,
} from "lucide-react";
import { json, LoaderFunction, useLoaderData } from "@remix-run/react";
import { ProductService } from "../../services/product.server";
import { Product } from "../../types/Product";
import { addToCart } from "../../lib/security/session.server";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

// Define Review type locally as a fallback if not defined in types/Product
interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface LoaderData {
  product: Product;
  reviews: Review[];
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const productId = params.productId;
  if (!productId) {
    throw new Response("Product ID not found", { status: 404 });
  }

  try {
    const product = await ProductService.getProduct(productId);
    if (!product) {
      throw new Response("Product not found", { status: 404 });
    }

    const reviews: Review[] = [
      {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Absolutely delicious! Tastes just like my grandmother's homemade pickle.",
        verified: true,
      },
      {
        id: 2,
        name: "Rajesh Kumar",
        rating: 4,
        date: "1 month ago",
        comment:
          "Great quality pickle with authentic flavors. Packaging was excellent.",
        verified: true,
      },
      {
        id: 3,
        name: "Anita Reddy",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "This pickle brings back so many childhood memories. Incredible taste!",
        verified: false,
      },
    ];

    const serializedProduct: Product = {
      ...product,
      _id: product._id.toString(),
      productId: product.productId,
      createdAt:
        product.createdAt instanceof Date
          ? product.createdAt
          : new Date(product.createdAt),
      updatedAt:
        product.updatedAt instanceof Date
          ? product.updatedAt
          : new Date(product.updatedAt),
      expiryDate: product.expiryDate ? new Date(product.expiryDate) : undefined,
      images: product.imageUrl
        ? [product.imageUrl, ...product.images]
        : product.images || [],
      price: product.discountPrice || product.price,
      discount: product.discountPrice
        ? `${Math.round(
            ((product.price - product.discountPrice) / product.price) * 100
          )}`
        : undefined,
      inStock: product.inStock,
      stock: product.stock,
      isVeg: product.isVeg,
      isFeatured: product.isFeatured,
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      wishListed: product.wishListed || 0,
      views: product.views || 0,
      likes: product.likes || 0,
    };

    return json({ product: serializedProduct, reviews });
  } catch (error) {
    console.error("SingleProductPage loader error:", error);
    throw new Response("Failed to fetch product", { status: 500 });
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const productId = formData.get("productId") as string;
  const quantity = parseInt(formData.get("quantity") as string) || 1;

  if (!productId) {
    return json({ error: "Product ID is required" }, { status: 400 });
  }

  const product = await ProductService.getProduct(productId);
  if (!product) {
    return json({ error: "Product not found" }, { status: 404 });
  }

  const price = product.discountPrice || product.price;
  const cookie = await addToCart(request, productId, quantity, price);
  return json({ success: true }, { headers: { "Set-Cookie": cookie } });
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function SingleProductPage() {
  const { product, reviews } = useLoaderData<LoaderData>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const discount = product.discount
    ? parseInt(product.discount)
    : product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice!) / product.price) * 100
      )
    : 0;

  const getSpiceIndicator = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Flame
        key={i}
        className={`w-4 h-4 ${
          i < level ? "text-red-500 fill-current" : "text-muted-foreground"
        }`}
      />
    ));
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, Math.min(10, quantity + delta)));
  };

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Breadcrumb */}
      <motion.div variants={itemVariants} className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            asChild
            className="flex max-w-40 items-center gap-2 text-muted-foreground hover:text-white/90"
            aria-label="Back to products"
          >
            <a href="/store/products">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </a>
          </Button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
        >
          {/* Product Images */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <Card className="aspect-square overflow-hidden">
              <CardContent className="p-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage] || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  />
                </AnimatePresence>
              </CardContent>
            </Card>
            <motion.div
              className="flex gap-2 overflow-x-auto"
              variants={containerVariants}
            >
              {product.images.map((image, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Button
                    variant="outline"
                    className={`flex-shrink-0 w-20 h-20 p-0 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Select image ${index + 1} of ${product.name}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Product Details */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <div className="flex items-start justify-between mb-2">
                <motion.h1
                  className="text-3xl md:text-4xl font-playfair font-bold text-foreground"
                  variants={itemVariants}
                >
                  {product.name}
                </motion.h1>
                <motion.div className="flex gap-2" variants={containerVariants}>
                  <motion.div variants={itemVariants}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsLiked(!isLiked)}
                      className="rounded-full"
                      aria-label={isLiked ? "Unlike product" : "Like product"}
                    >
                      <motion.div
                        animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            isLiked
                              ? "text-red-500 fill-current"
                              : "text-muted-foreground"
                          }`}
                        />
                      </motion.div>
                    </Button>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      aria-label="Share product"
                    >
                      <Share2 className="w-6 h-6 text-muted-foreground" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="flex items-center gap-4 mb-4"
                variants={itemVariants}
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <motion.div key={i} variants={itemVariants}>
                      <Star
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating || 0)
                            ? "text-yellow-500 fill-current"
                            : "text-muted-foreground"
                        }`}
                      />
                    </motion.div>
                  ))}
                  <span className="text-lg font-semibold text-foreground ml-2">
                    {product.rating || 0}
                  </span>
                  <span className="text-muted-foreground">
                    ({product.reviews || 0} reviews)
                  </span>
                </div>
              </motion.div>

              <motion.p
                className="text-muted-foreground text-lg leading-relaxed mb-6"
                variants={itemVariants}
              >
                {product.description}
              </motion.p>
            </motion.div>

            {/* Spice Level */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="font-semibold text-foreground">
                    Spice Level:
                  </span>
                  <div className="flex gap-1">
                    {getSpiceIndicator(product.spiceLevel)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.spiceLevel}/5)
                  </span>
                </CardContent>
              </Card>
            </motion.div>

            {/* Price and Stock */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <motion.div
                className="flex items-center gap-4"
                variants={itemVariants}
              >
                <span className="text-4xl font-playfair font-bold text-foreground">
                  ₹{product.discountPrice || product.price}
                </span>
                {product.discountPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.price}
                    </span>
                    <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-bold">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </motion.div>

              <motion.div
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-foreground">
                  {product.inStock
                    ? `In Stock (${product.stock} available)`
                    : "Out of Stock"}
                </span>
              </motion.div>
            </motion.div>

            {/* Quantity and Add to Cart */}
            <motion.div variants={itemVariants}>
              <form method="POST">
                <input
                  type="hidden"
                  name="productId"
                  value={product.productId}
                />
                <input type="hidden" name="quantity" value={quantity} />
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center gap-4"
                    variants={itemVariants}
                  >
                    <span className="font-semibold text-foreground">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="p-2"
                        aria-label="Decrease quantity"
                        aria-disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-4 py-2 font-semibold">
                        {quantity}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= 10}
                        className="p-2"
                        aria-label="Increase quantity"
                        aria-disabled={quantity >= 10}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      name="_action"
                      value="addToCart"
                      disabled={!product.inStock}
                      className="btn-hero w-full flex items-center justify-center gap-2 text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Add to cart"
                      aria-disabled={!product.inStock}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart - ₹
                      {(product.discountPrice || product.price) * quantity}
                    </Button>
                  </motion.div>
                </div>
              </form>
            </motion.div>

            {/* Features */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              variants={containerVariants}
            >
              {[
                {
                  icon: Shield,
                  text: "No Preservatives",
                  color: "text-green-500",
                },
                {
                  icon: Award,
                  text: "Traditional Recipe",
                  color: "text-primary",
                },
                { icon: Truck, text: "Free Shipping", color: "text-blue-500" },
                { icon: Clock, text: "Fresh Daily", color: "text-orange-500" },
              ].map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card>
                    <CardContent className="flex items-center gap-2 p-3">
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      <span className="text-sm text-foreground">
                        {feature.text}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Product Details Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="description" className="mt-16">
            <TabsList className="border-b border-border gap-8">
              {["description", "ingredients", "nutrition", "reviews"].map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="font-semibold capitalize data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary"
                  >
                    {tab}
                  </TabsTrigger>
                )
              )}
            </TabsList>

            <TabsContent value="description" className="py-8">
              <motion.div
                className="prose max-w-none"
                variants={containerVariants}
              >
                <motion.p
                  className="text-muted-foreground text-lg leading-relaxed mb-6"
                  variants={itemVariants}
                >
                  {product.longDescription || product.description}
                </motion.p>
              </motion.div>
            </TabsContent>

            <TabsContent value="ingredients" className="py-8">
              <motion.div variants={containerVariants}>
                <motion.h3
                  className="text-xl font-playfair font-semibold text-foreground mb-4"
                  variants={itemVariants}
                >
                  Ingredients
                </motion.h3>
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-3"
                  variants={containerVariants}
                >
                  {product.ingredients.map((ingredient, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card>
                        <CardContent className="p-3 text-center">
                          <span className="text-foreground">{ingredient}</span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="nutrition" className="py-8">
              {product.nutritionalInfo && (
                <motion.div variants={containerVariants}>
                  <motion.h3
                    className="text-xl font-playfair font-semibold text-foreground mb-4"
                    variants={itemVariants}
                  >
                    Nutritional Information
                  </motion.h3>
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardContent className="p-6">
                        <motion.div className="mb-4" variants={itemVariants}>
                          <span className="font-semibold text-foreground">
                            Serving Size: {product.nutritionalInfo.servingSize}
                          </span>
                        </motion.div>
                        <motion.div
                          className="grid grid-cols-2 md:grid-cols-3 gap-4"
                          variants={containerVariants}
                        >
                          {Object.entries(product.nutritionalInfo)
                            .filter(
                              ([key, value]) =>
                                key !== "servingSize" &&
                                value != null &&
                                key != "_id"
                            )
                            .map(([key, value]) => (
                              <motion.div
                                key={key}
                                className="text-center"
                                variants={itemVariants}
                              >
                                <div className="text-2xl font-bold text-primary">
                                  {value}
                                </div>
                                <div className="text-sm text-muted-foreground capitalize">
                                  {key}
                                </div>
                              </motion.div>
                            ))}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="py-8">
              <motion.div variants={containerVariants}>
                <motion.div
                  className="flex items-center justify-between mb-6"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-playfair font-semibold text-foreground">
                    Customer Reviews ({product.reviews || 0})
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <motion.div key={i} variants={itemVariants}>
                          <Star
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating || 0)
                                ? "text-yellow-500 fill-current"
                                : "text-muted-foreground"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <span className="font-semibold text-foreground">
                      {product.rating || 0} out of 5
                    </span>
                  </div>
                </motion.div>

                <motion.div className="space-y-6" variants={containerVariants}>
                  {reviews.map((review) => (
                    <motion.div key={review.id} variants={itemVariants}>
                      <Card className="border-b border-border">
                        <CardContent className="pt-6 pb-6">
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
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
}
