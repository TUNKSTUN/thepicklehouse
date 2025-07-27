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
  CheckCircle,
  Package,
  Shield,
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

<AnimatePresence mode="wait">
      {/* ABOUT TAB */}
      <TabsContent value="about" className="mt-6">
        <motion.div
          key="about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-card to-turmeric/10">
            <CardHeader className="bg-gradient-to-r from-secondary to-turmeric/20 pb-4">
              <CardTitle className="text-2xl text-masala-brown flex items-center gap-2">
                <Info className="w-6 h-6" />
                About Our Pickle
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <motion.p
                className="text-muted-foreground leading-relaxed mb-8 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {pickle.about}
              </motion.p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Key Characteristics */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-turmeric rounded-full"></div>
                    <h4 className="font-bold text-xl text-masala-brown">
                      Key Characteristics
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {pickle.key_characteristics.map((char, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-card/60 rounded-lg backdrop-blur-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 bg-turmeric rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground leading-relaxed">{char}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Health Benefits */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-olived rounded-full"></div>
                    <h4 className="font-bold text-xl text-olived">
                      Health Benefits
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {pickle.health_benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-olived/10 rounded-lg backdrop-blur-sm border border-border"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      >
                        <Heart className="w-4 h-4 text-olived mt-0.5 flex-shrink-0" />
                        <span className="text-olived-foreground leading-relaxed">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      {/* INGREDIENTS TAB */}
      <TabsContent value="ingredients" className="mt-6">
        <motion.div
          key="ingredients"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-card to-olived/10">
            <CardHeader className="bg-gradient-to-r from-olived/20 to-olived/10 pb-4">
              <CardTitle className="text-2xl text-olived flex items-center gap-2">
                <Leaf className="w-6 h-6" />
                Premium Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <motion.div
                className="grid md:grid-cols-2 gap-8 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Primary Ingredients */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-turmeric rounded-full"></div>
                    <h5 className="font-bold text-xl text-masala-brown">Primary Ingredients</h5>
                  </div>
                  <div className="space-y-3">
                    {pickle.ingredients.primary.map((ingredient, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-turmeric/10 rounded-xl border border-border hover:bg-turmeric/20 transition-colors"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-2 h-2 bg-turmeric rounded-full"></div>
                        <span className="text-masala-brown font-medium text-lg">{ingredient}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Spices */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-spice-red rounded-full"></div>
                    <h5 className="font-bold text-xl text-spice-red">Aromatic Spices</h5>
                  </div>
                  <div className="space-y-3">
                    {pickle.ingredients.spices.map((spice, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-spice-red/10 rounded-xl border border-border hover:bg-spice-red/20 transition-colors"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-2 h-2 bg-spice-red rounded-full"></div>
                        <span className="text-spice-red font-medium text-lg">{spice}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <Separator className="my-6" />

              <motion.div
                className="bg-gradient-to-r from-turmeric/10 to-turmeric/20 p-6 rounded-xl border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-turmeric mt-1" />
                  <div>
                    <h6 className="font-semibold text-masala-brown mb-2">Quality Assurance</h6>
                    <p className="text-turmeric leading-relaxed">
                      All ingredients are carefully selected and sourced from trusted local suppliers. 
                      Made in a facility that processes various spices and seasonal ingredients with 
                      strict quality control measures.
                    </p>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      {/* NUTRITION TAB */}
      <TabsContent value="nutrition" className="mt-6">
        <motion.div
          key="nutrition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-card to-primary/10">
            <CardHeader className="bg-gradient-to-r from-accent/20 to-accent/10 pb-4">
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Nutritional Information
              </CardTitle>
              <p className="text-primary mt-2">Per {pickle.nutritionalInfo.servingSize} serving</p>
            </CardHeader>
            <CardContent className="p-8">
              <motion.div
                className="grid md:grid-cols-2 gap-6 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="space-y-4">
                  {[
                    { label: "Calories", value: `${pickle.nutritionalInfo.calories} kcal`, color: "bg-spice-red", percentage: 60 },
                    { label: "Protein", value: pickle.nutritionalInfo.protein, color: "bg-olived", percentage: 25 },
                    { label: "Carbohydrates", value: pickle.nutritionalInfo.carbs, color: "bg-turmeric", percentage: 80 },
                    { label: "Dietary Fiber", value: pickle.nutritionalInfo.fiber, color: "bg-accent", percentage: 40 }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="p-4 bg-card rounded-xl border border-border shadow-sm"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground font-medium">{item.label}</span>
                        <span className="text-foreground font-bold text-lg">{item.value}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Fat", value: pickle.nutritionalInfo.fat, color: "bg-turmeric", percentage: 20 },
                    { label: "Sodium", value: pickle.nutritionalInfo.sodium, color: "bg-spice-red", percentage: 90 },
                    { label: "Vitamin C", value: pickle.nutritionalInfo.vitamin_c, color: "bg-primary", percentage: 50 },
                    { label: "Iron", value: pickle.nutritionalInfo.iron, color: "bg-accent", percentage: 30 }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="p-4 bg-card rounded-xl border border-border shadow-sm"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground font-medium">{item.label}</span>
                        <span className="text-foreground font-bold text-lg">{item.value}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-olived/10 to-olived/20 p-6 rounded-xl border-2 border-border"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-olived rounded-full">
                    <Heart className="w-5 h-5 text-olived-foreground" />
                  </div>
                  <h5 className="font-bold text-xl text-olived">Health Benefits</h5>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {pickle.health_benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-2 text-olived-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-olived mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      {/* PACKAGING TAB */}
      <TabsContent value="packaging" className="mt-6">
        <motion.div
          key="packaging"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-card to-accent/10">
            <CardHeader className="bg-gradient-to-r from-accent/20 to-accent/10 pb-4">
              <CardTitle className="text-2xl text-accent flex items-center gap-2">
                <Package className="w-6 h-6" />
                Packaging Options
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <motion.div
                className="grid md:grid-cols-2 gap-8 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Glass Bottles */}
                <motion.div
                  initial={{ opacity: 0, rotateY: -15 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-turmeric rounded-full">
                      <Package className="w-5 h-5 text-turmeric" />
                    </div>
                    <h5 className="font-bold text-xl text-masala-brown">Premium Glass Jars</h5>
                  </div>
                  <div className="space-y-3">
                    {pickle.packaging.bottle.map((size, index) => (
                      <motion.div
                        key={index}
                        className="group p-4 bg-gradient-to-r from-turmeric/10 to-turmeric/20 rounded-xl border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.03, y: -2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-turmeric rounded-full group-hover:bg-turmeric transition-colors"></div>
                            <span className="text-masala-brown font-semibold text-lg">{size}</span>
                          </div>
                          <Badge variant="secondary" className="bg-turmeric/20 text-masala-brown">
                            Premium
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Plastic Pouches */}
                <motion.div
                  initial={{ opacity: 0, rotateY: 15 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary rounded-full">
                      <Package className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h5 className="font-bold text-xl text-primary">Convenient Pouches</h5>
                  </div>
                  <div className="space-y-3">
                    {pickle.packaging.plastic_bag.map((size, index) => (
                      <motion.div
                        key={index}
                        className="group p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.03, y: -2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-primary rounded-full group-hover:bg-primary transition-colors"></div>
                            <span className="text-primary font-semibold text-lg">{size}</span>
                          </div>
                          <Badge variant="secondary" className="bg-primary/20 text-primary">
                            Eco-Friendly
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <Separator className="my-6" />

              <motion.div
                className="bg-gradient-to-r from-accent/10 to-accent/20 p-6 rounded-xl border-2 border-border"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent rounded-full">
                    <Shield className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h6 className="font-bold text-xl text-accent mb-3">Our Packaging Promise</h6>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-1" />
                        <span className="text-accent">Preserves freshness and flavor</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-1" />
                        <span className="text-accent">Ensures safe delivery</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-1" />
                        <span className="text-accent">Food-grade materials only</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-1" />
                        <span className="text-accent">Environmentally conscious</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
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
