import React, { useState } from "react";
import { useLoaderData, useNavigate, Link, Outlet } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import {
  ArrowLeft,
  Star,
  Flame,
  Leaf,
  Heart,
  Share2,
  Clock,
  MapPin,
  Award,
  Info,
  ChefHat,
  Calendar,
} from "lucide-react";
import { ProductService } from "../services/product.server";
import type { Pickle } from "../types/Product";
import { Button } from "../components/ui/button";
import BackgroundImage from "../assets/background-1.png";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderData {
  pickle: Pickle;
  relatedPickles: Pickle[];
}

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    throw new Response("Pickle ID is required", { status: 400 });
  }

  try {
    const pickle = await ProductService.getProduct(slug);
    if (!pickle) {
      throw new Response("Pickle not found", { status: 404 });
    }

    const relatedPickles = await ProductService.getProducts(
      { region: pickle.region, excludeId: slug },
      "popular",
      4
    );

    return { pickle, relatedPickles };
  } catch (error) {
    console.error("Error loading pickle:", error);
    throw new Response("Error loading pickle", { status: 500 });
  }
};

interface PickleImageGalleryProps {
  pickle: Pickle;
}

function PickleImageGallery({ pickle }: PickleImageGalleryProps) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="aspect-square overflow-hidden rounded-lg bg-background border">
        <motion.img
          src={pickle.imageUrl}
          alt={pickle.name}
          className="w-full h-full object-cover p-6 "
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}

interface RelatedPicklesProps {
  pickles: Pickle[];
}

function RelatedPickles({ pickles }: RelatedPicklesProps) {
  const navigate = useNavigate();

  const getSpiceIndicator = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Flame
        key={i}
        className={`w-3 h-3 ${
          i < level ? "text-spice-red fill-current" : "text-border"
        }`}
      />
    ));
  };

  if (pickles.length === 0) return null;

  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-2xl font-bold text-foreground mb-8"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Similar Pickles
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pickles.map((pickle, index) => (
          <motion.div
            key={pickle.productId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className="bg-card border-border hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              onClick={() => navigate(`/pickle/${pickle.slug}`)}
            >
              <div className="relative">
                <motion.img
                  src={pickle.imageUrl}
                  alt={pickle.name}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                {pickle.isFeatured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Badge className="absolute top-2 left-2 bg-spice-red text-white">
                      Featured
                    </Badge>
                  </motion.div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                  {pickle.name}
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {getSpiceIndicator(pickle.spiceLevel)}
                  </div>
                  {pickle.isVeg && <Leaf className="w-4 h-4 text-green-600" />}
                </div>
                <p className="text-sm text-muted-foreground">
                  {pickle.region} • {pickle.shelf_life}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function PickleDetailPage() {
  const { pickle, relatedPickles } = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const getSpiceIndicator = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
      >
        <Flame
          className={`w-5 h-5 ${
            i < level ? "text-spice-red fill-current" : "text-border"
          }`}
        />
      </motion.div>
    ));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pickle.name,
          text: pickle.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.div
      className="relative min-h-screen bg-secondary/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Outlet />
      <img
        src={BackgroundImage}
        alt="Background art"
        className="w-full h=full inset-0 object-cover absolute opacity-20 blur-sm -z-10"
      />
      <motion.div
        className="bg-primary border-b border-border"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-primary-foreground hover:text-secondary"
            >
              Home
            </Link>
            <span className="text-primary-foreground">/</span>
            <Link
              to="/pickles"
              className="text-primary-foreground hover:text-secondary"
            >
              Pickles
            </Link>
            <span className="text-primary-foreground">/</span>
            <span className="text-primary-foreground font-medium truncate">
              {pickle.name}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8 hover:bg-transparent hover:underline underline-offset-2 hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pickles
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <PickleImageGallery pickle={pickle} />
          </div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <motion.h1
                    className="text-3xl font-bold text-foreground font-serif mb-2"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {pickle.name}
                  </motion.h1>
                  <motion.div
                    className="flex items-center gap-4 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {pickle.rating && (
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: i * 0.1 + 0.3,
                              }}
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  i < Math.floor(pickle.rating)
                                    ? "text-yellow-500 fill-current"
                                    : "text-border"
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {pickle.rating} ({pickle.reviews} reviews)
                        </span>
                      </div>
                    )}
                    <Badge variant="secondary" className="capitalize">
                      <MapPin className="w-3 h-3 mr-1" />
                      {pickle.region}
                    </Badge>
                  </motion.div>
                </div>
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={
                        isFavorite ? "text-red-500 border-red-500" : ""
                      }
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              <motion.p
                className="text-muted-foreground text-lg leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {pickle.description}
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Spice Level:
                  </span>
                  <div className="flex items-center">
                    {getSpiceIndicator(pickle.spiceLevel)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {pickle.shelf_life}
                  </span>
                </div>
                {pickle.isVeg && (
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      Vegetarian
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {pickle.shelf_life} shelf life
                  </span>
                </div>
              </motion.div>

              {pickle.isFeatured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <Badge className="bg-spice-red text-white mb-4">
                    <Award className="w-3 h-3 mr-1" />
                    Featured Product
                  </Badge>
                </motion.div>
              )}
            </div>

            <Separator />

            <motion.div
              className="space-y-4 p-4 rounded-xl bg-olived "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-lg font-semibold  text-white">
                Traditional Heritage
              </h3>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3">
                    <ChefHat className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Origin
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pickle.traditional_heritage.origin}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Best Served With
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pickle.traditional_heritage.BestServeWith.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Tabs defaultValue="about" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TabsList className="w-full justify-start bg-primary text-white rounded-sm gap-2">
                {["about", "ingredients", "nutrition", "packaging"].map(
                  (tab, index) => (
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <TabsTrigger
                        value={tab}
                        className="capitalize bg-none rounded-sm"
                      >
                        {tab}
                      </TabsTrigger>
                    </motion.div>
                  )
                )}
              </TabsList>
            </motion.div>

            <AnimatePresence>
              <TabsContent value="about" className="mt-6">
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {pickle.about}
                      </p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            Key Characteristics:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {pickle.key_characteristics.map((char, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.1,
                                }}
                              >
                                {char}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            Health Benefits:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {pickle.health_benefits.map((benefit, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.1,
                                }}
                              >
                                {benefit}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="ingredients" className="mt-6">
                <motion.div
                  key="ingredients"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-4">
                        Ingredients:
                      </h4>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <h5 className="font-medium text-foreground mb-2">
                            Primary:
                          </h5>
                          <ul className="text-muted-foreground space-y-1">
                            {pickle.ingredients.primary.map(
                              (ingredient, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                  }}
                                >
                                  • {ingredient}
                                </motion.li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground mb-2">
                            Spices:
                          </h5>
                          <ul className="text-muted-foreground space-y-1">
                            {pickle.ingredients.spices.map((spice, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.1,
                                }}
                              >
                                • {spice}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        * All ingredients are carefully selected and sourced
                        from trusted local suppliers. Made in a facility that
                        processes various spices and seasonal ingredients.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="nutrition" className="mt-6">
                <motion.div
                  key="nutrition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-4">
                        Nutritional Information (
                        {pickle.nutritionalInfo.servingSize} serving):
                      </h4>
                      <div className="grid grid-cols-2 gap-6 text-sm">
                        <div className="space-y-3">
                          {[
                            {
                              label: "Calories",
                              value: `${pickle.nutritionalInfo.calories} kcal`,
                            },
                            {
                              label: "Protein",
                              value: pickle.nutritionalInfo.protein,
                            },
                            {
                              label: "Carbohydrates",
                              value: pickle.nutritionalInfo.carbs,
                            },
                            {
                              label: "Dietary Fiber",
                              value: pickle.nutritionalInfo.fiber,
                            },
                          ].map((item, index) => (
                            <motion.div
                              key={item.label}
                              className="flex justify-between"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <span className="text-muted-foreground">
                                {item.label}:
                              </span>
                              <span className="text-foreground font-medium">
                                {item.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          {[
                            { label: "Fat", value: pickle.nutritionalInfo.fat },
                            {
                              label: "Sodium",
                              value: pickle.nutritionalInfo.sodium,
                            },
                            {
                              label: "Vitamin C",
                              value: pickle.nutritionalInfo.vitamin_c,
                            },
                            {
                              label: "Iron",
                              value: pickle.nutritionalInfo.iron,
                            },
                          ].map((item, index) => (
                            <motion.div
                              key={item.label}
                              className="flex justify-between"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <span className="text-muted-foreground">
                                {item.label}:
                              </span>
                              <span className="text-foreground font-medium">
                                {item.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <motion.div
                        className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <h5 className="font-medium text-green-800 mb-2">
                          Health Benefits:
                        </h5>
                        <ul className="text-sm text-green-700 space-y-1">
                          {pickle.health_benefits.map((benefit, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              • {benefit}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="packaging" className="mt-6">
                <motion.div
                  key="packaging"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-4">
                        Packaging Options:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-foreground mb-2">
                            Bottle:
                          </h5>
                          <ul className="text-muted-foreground space-y-1">
                            {pickle.packaging.bottle.map((size, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.1,
                                }}
                              >
                                • {size}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground mb-2">
                            Plastic Bag:
                          </h5>
                          <ul className="text-muted-foreground space-y-1">
                            {pickle.packaging.plastic_bag.map((size, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.1,
                                }}
                              >
                                • {size}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <motion.p
                        className="text-sm text-muted-foreground italic mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        * Packaging is designed to preserve freshness and ensure
                        safe delivery.
                      </motion.p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>

        <RelatedPickles pickles={relatedPickles} />
      </div>
    </motion.div>
  );
}
