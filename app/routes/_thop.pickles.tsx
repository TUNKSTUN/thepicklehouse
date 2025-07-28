import React, { useState } from "react";
import { useLoaderData, useSearchParams, useNavigate } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { Search, Star, Flame, Leaf, Grid3X3, List } from "lucide-react";
import { ProductService } from "../services/product.server";
import type { Product, ProductCategory, ProductType } from "../types/Product";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

interface LoaderData {
  products: Product[];
  total: number;
  filters: {
    categories: ProductCategory[];
    types: ProductType[];
    spiceLevels: number[];
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const query: any = {};
  if (searchParams.get("category"))
    query.category = searchParams.get("category") as ProductCategory;
  if (searchParams.get("type"))
    query.type = searchParams.get("type") as ProductType;
  if (searchParams.get("search")) query.search = searchParams.get("search");
  if (searchParams.get("spiceLevel"))
    query.spiceLevel = parseInt(searchParams.get("spiceLevel")!);
  if (searchParams.get("inStock"))
    query.inStock = searchParams.get("inStock") === "true";
  if (searchParams.get("featured"))
    query.isFeatured = searchParams.get("featured") === "true";

  const sort = searchParams.get("sort") || "newest";

  try {
    const products = await ProductService.getProducts(query, sort);
    const total = await ProductService.countProducts(query);
    const filters = {
      categories: ["pickle", "sauce", "chutney"] as ProductCategory[],
      types: ["veg", "non-veg"] as ProductType[],
      spiceLevels: [1, 2, 3, 4, 5],
    };
    return { products, total, filters };
  } catch (error) {
    console.error("Error loading products:", error);
    return {
      products: [],
      total: 0,
      filters: { categories: [], types: [], spiceLevels: [] },
    };
  }
};

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

function ProductCard({ product, viewMode }: ProductCardProps) {
  const navigate = useNavigate();

  const getSpiceIndicator = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Flame
        key={i}
        className={`w-4 h-4 ${i < level ? "text-spice-red fill-current" : "text-border"
          }`}
      />
    ));
  };

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6 flex gap-6">
            <div className="w-40 h-40 flex-shrink-0">
              <motion.img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl text-foreground mb-2">
                {product.name}
              </CardTitle>
              <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                {product.description}
              </CardDescription>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {getSpiceIndicator(product.spiceLevel)}
                </div>
                {product.isVeg && (
                  <div className="flex items-center">
                    <Leaf className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">Vegetarian</span>
                  </div>
                )}
                {product.rating && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm text-muted-foreground">
                      {product.rating}
                    </span>
                  </div>
                )}
              </div>
              <Button
                className="bg-primary text-primary-foreground hover:bg-masala-brown"
                onClick={() => navigate(`/pickle/${product.slug}`)}
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-72 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          {product.isFeatured && (
            <motion.div
              className="absolute top-3 left-3 bg-spice-red text-white text-sm px-2 py-1 rounded"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Featured
            </motion.div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-lg text-foreground line-clamp-1">
              {product.name}
            </CardTitle>
            {product.isVeg && (
              <Leaf className="w-5 h-5 text-green-600 flex-shrink-0" />
            )}
          </div>
          <CardDescription className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {product.description}
          </CardDescription>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {getSpiceIndicator(product.spiceLevel)}
            </div>
            {product.rating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                <span className="text-sm text-muted-foreground">
                  {product.rating}
                </span>
              </div>
            )}
          </div>
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-masala-brown"
            onClick={() => navigate(`/pickle/${product.slug}`)}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ProductsPage() {
  const { products, total, filters } = useLoaderData<LoaderData>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const currentCategory = searchParams.get(
    "category"
  ) as ProductCategory | null;
  const currentType = searchParams.get("type") as ProductType | null;
  const currentSort = searchParams.get("sort") || "newest";
  const currentSpiceLevel = searchParams.get("spiceLevel")
    ? parseInt(searchParams.get("spiceLevel")!)
    : null;

  const updateSearchParams = (key: string, value: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams("search", searchTerm || null);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchTerm("");
  };

  const getSpiceIndicator = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Flame
        key={i}
        className={`w-4 h-4 ${i < level ? "text-spice-red fill-current" : "text-border"
          }`}
      />
    ));
  };

  // Animation variants for the product list container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for each child
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-border md:sticky top-0 z-10 bg-primary"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-4xl text-primary-foreground font-bold font-playfair">
                Our Artisanal Collection
              </h1>
              <p className="text-primary-foreground mt-4 text-md md:text-lg">
                Discover {total} handcrafted pickles, sauces, and chutneys
              </p>
            </div>
            <div className="flex-1 max-w-md">
              <form
                onSubmit={handleSearch}
                className="relative md:top-8 md:m-2"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search our collection..."
                  className="pl-10 bg-input text-foreground"
                />
              </form>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-64 flex-shrink-0"
          >
            <Card className="bg-card border-border sticky top-40">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">
                  Refine Your Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">
                    Filters
                  </h3>
                  <Button
                    variant="link"
                    className="text-spice-red"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                </div>

                {/* Category Filter */}
                <div>
                  <Label className="text-foreground font-medium mb-3 block">
                    Category
                  </Label>
                  <RadioGroup
                    value={currentCategory || "0"}
                    onValueChange={(value) =>
                      updateSearchParams(
                        "category",
                        value === "0" ? null : value
                      )
                    }
                  >
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <RadioGroupItem value="0" id="category-all" />
                        <Label
                          htmlFor="category-all"
                          className="ml-2 text-muted-foreground"
                        >
                          All Categories
                        </Label>
                      </div>
                      {filters.categories.map((category, index) => (
                        <div key={category} className="flex items-center">
                          <RadioGroupItem
                            value={category}
                            id={`category-${index}`}
                          />
                          <Label
                            htmlFor={`category-${index}`}
                            className="ml-2 text-muted-foreground capitalize"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Type Filter */}
                <div>
                  <Label className="text-foreground mb-3 font-medium block">
                    Type
                  </Label>
                  <RadioGroup
                    value={currentType || "0"}
                    onValueChange={(value) =>
                      updateSearchParams("type", value === "0" ? null : value)
                    }
                  >
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <RadioGroupItem value="0" id="type-all" />
                        <Label
                          htmlFor="type-all"
                          className="ml-2 text-muted-foreground"
                        >
                          All Types
                        </Label>
                      </div>
                      {filters.types.map((type, index) => (
                        <div key={type} className="flex items-center">
                          <RadioGroupItem value={type} id={`type-${index}`} />
                          <Label
                            htmlFor={`type-${index}`}
                            className="ml-2 text-muted-foreground capitalize flex items-center"
                          >
                            {type === "veg" && (
                              <Leaf className="w-4 h-4 text-green-600 mr-1" />
                            )}
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Spice Level Filter */}
                <div>
                  <Label className="text-foreground mb-3 font-medium block">
                    Spice Level
                  </Label>
                  <RadioGroup
                    value={
                      currentSpiceLevel ? currentSpiceLevel.toString() : "0"
                    }
                    onValueChange={(value) =>
                      updateSearchParams(
                        "spiceLevel",
                        value === "0" ? null : value
                      )
                    }
                  >
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <RadioGroupItem value="0" id="spice-all" />
                        <Label
                          htmlFor="spice-all"
                          className="ml-2 text-muted-foreground"
                        >
                          All Levels
                        </Label>
                      </div>
                      {filters.spiceLevels.map((level, index) => (
                        <div key={level} className="flex items-center">
                          <RadioGroupItem
                            value={level.toString()}
                            id={`spice-${index}`}
                          />
                          <Label
                            htmlFor={`spice-${index}`}
                            className="ml-2 flex items-center"
                          >
                            {getSpiceIndicator(level)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-8"
            >
              <Select
                value={currentSort}
                onValueChange={(value) => updateSearchParams("sort", value)}
              >
                <SelectTrigger className="w-48 bg-card text-foreground border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              <div className=" items-center gap-2 md:block hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground"
                  }
                >
                  <Grid3X3 className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground"
                  }
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Products Display */}
            <AnimatePresence>
              {products.length === 0 ? (
                <motion.div
                  key="no-products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-16 "
                >
                  <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    No Pickles Found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    onClick={clearFilters}
                    className="bg-primary text-primary-foreground hover:bg-masala-brown"
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key={viewMode}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10"
                      : "space-y-6 z-10"
                  }
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
