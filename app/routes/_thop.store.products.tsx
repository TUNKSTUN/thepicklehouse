import React, { useState, useMemo } from "react";
import { ChefHat } from "lucide-react";
import Mockup from "../assets/thop2.png";
import TheHouseOfPickleDisplay from "../assets/The House of Pickles Display.png";
import FilterSection from "../components/StoreComponents/FilterSection";
import ProductCard from "../components/StoreComponents/ProductCard";

// Sample product data
const products = [
  {
    id: 1,
    name: "Traditional Mango Pickle",
    description: "Authentic Hyderabadi style mango pickle with aromatic spices",
    price: 299,
    originalPrice: 349,
    spiceLevel: 3,
    rating: 4.8,
    reviews: 124,
    popular: true,
    category: "Mango",
    isVeg: true,
    image: Mockup,
  },
  {
    id: 2,
    name: "Fiery Red Chilli Pickle",
    description: "For spice lovers - intense heat with bold flavors",
    price: 249,
    originalPrice: null,
    spiceLevel: 5,
    rating: 4.6,
    reviews: 89,
    popular: false,
    category: "Chilli",
    isVeg: true,
    image: Mockup,
  },
  {
    id: 3,
    name: "Mixed Vegetable Pickle",
    description:
      "A delightful mix of seasonal vegetables in traditional spices",
    price: 199,
    originalPrice: 229,
    spiceLevel: 2,
    rating: 4.7,
    reviews: 156,
    popular: true,
    category: "Mixed",
    isVeg: true,
    image: Mockup,
  },
  {
    id: 4,
    name: "Lemon Pickle",
    description: "Tangy and aromatic lemon pickle with mustard oil",
    price: 179,
    originalPrice: null,
    spiceLevel: 2,
    rating: 4.9,
    reviews: 203,
    popular: true,
    category: "Lemon",
    isVeg: true,
    image: Mockup,
  },
  {
    id: 5,
    name: "Garlic Pickle",
    description: "Rich and flavorful garlic pickle with herbs",
    price: 229,
    originalPrice: 259,
    spiceLevel: 3,
    rating: 4.5,
    reviews: 67,
    popular: false,
    category: "Garlic",
    isVeg: true,
    image: Mockup,
  },
  {
    id: 6,
    name: "Green Chilli Pickle",
    description: "Fresh green chillis in mustard oil and spices",
    price: 219,
    originalPrice: null,
    spiceLevel: 4,
    rating: 4.4,
    reviews: 92,
    popular: false,
    category: "Chilli",
    isVeg: true,
    image: Mockup,
  },
  {
    id: 7,
    name: "Amla Pickle",
    description: "Tangy Indian gooseberry pickle with mild spices",
    price: 189,
    originalPrice: null,
    spiceLevel: 2,
    rating: 4.6,
    reviews: 78,
    popular: false,
    category: "Amla",
    isVeg: true,
    size: "250g",
    image: Mockup,
  },
  {
    id: 8,
    name: "Ginger Pickle",
    description: "Zesty ginger pickle with lemon and spices",
    price: 239,
    originalPrice: 279,
    spiceLevel: 3,
    rating: 4.7,
    reviews: 95,
    popular: true,
    category: "Ginger",
    isVeg: true,
    size: "400g",
    image: Mockup,
  },
  {
    id: 9,
    name: "Chicken Pickle",
    description: "Spicy chicken pickle with traditional Andhra spices",
    price: 399,
    originalPrice: 449,
    spiceLevel: 4,
    rating: 4.9,
    reviews: 112,
    popular: true,
    category: "Chicken",
    isVeg: false,
    nonVegType: "Chicken",
    size: "500g",
    image: Mockup,
  },
  {
    id: 10,
    name: "Prawn Pickle",
    description: "Coastal style prawn pickle with tangy spices",
    price: 499,
    originalPrice: null,
    spiceLevel: 3,
    rating: 4.8,
    reviews: 88,
    popular: false,
    category: "Prawn",
    isVeg: false,
    nonVegType: "Seafood",
    size: "300g",
    image: Mockup,
  },
  {
    id: 11,
    name: "Mutton Pickle",
    description: "Rich mutton pickle with aromatic spices",
    price: 449,
    originalPrice: 499,
    spiceLevel: 4,
    rating: 4.7,
    reviews: 76,
    popular: true,
    category: "Mutton",
    isVeg: false,
    nonVegType: "Mutton",
    size: "500g",
    image: Mockup,
  },
];

export default function Products() {
  const [sortBy, setSortBy] = useState("popular");
  const [filterSpice, setFilterSpice] = useState("all");
  const [filterVeg, setFilterVeg] = useState("all");
  const [filterNonVegType, setFilterNonVegType] = useState("all");
  const [filterSize, setFilterSize] = useState("all");

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by spice level
    if (filterSpice !== "all") {
      const spiceLevel = parseInt(filterSpice);
      filtered = filtered.filter(
        (product) => product.spiceLevel === spiceLevel
      );
    }

    // Filter by veg/non-veg
    if (filterVeg !== "all") {
      filtered = filtered.filter(
        (product) => product.isVeg === (filterVeg === "veg")
      );
    }

    // Filter by non-veg type
    if (filterNonVegType !== "all") {
      filtered = filtered.filter(
        (product) => product.nonVegType === filterNonVegType
      );
    }

    // Filter by size
    if (filterSize !== "all") {
      filtered = filtered.filter((product) => product.size === filterSize);
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.popular - a.popular || b.rating - a.rating;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "spice-low":
          return a.spiceLevel - b.spiceLevel;
        case "spice-high":
          return b.spiceLevel - a.spiceLevel;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return sorted;
  }, [sortBy, filterSpice, filterVeg, filterNonVegType, filterSize]);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    // Add your cart logic here
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10 bg-white">
          <img
            src={TheHouseOfPickleDisplay}
            alt="aunty-masala-making"
            className="w-full h-full object-cover opacity-50 blur-sm bg-blend-difference"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-foreground mb-6 animate-fade-up">
            Our <span className="text-primary">Products</span>
          </h1>
          <p
            className="text-masala-brown-muted text-xl italic leading-relaxed animate-fade-up max-w-3xl mx-auto"
            style={{ animationDelay: "0.2s" }}
          >
            Discover our authentic collection of traditional Hyderabadi pickles,
            each crafted with love and the finest ingredients.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters and Sorting */}
          <FilterSection
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterSpice={filterSpice}
            setFilterSpice={setFilterSpice}
            filterVeg={filterVeg}
            setFilterVeg={setFilterVeg}
            filterNonVegType={filterNonVegType}
            setFilterNonVegType={setFilterNonVegType}
            filterSize={filterSize}
            setFilterSize={setFilterSize}
          />

          {/* Products Container */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Container Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ChefHat className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Our Pickle Collection
                  </h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  {sortedAndFilteredProducts.length} product
                  {sortedAndFilteredProducts.length !== 1 ? "s" : ""} found
                </div>
              </div>
            </div>

            {/* Scrollable Products Grid */}
            <div className="h-[600px] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
              {sortedAndFilteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedAndFilteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-stagger transform hover:scale-105 transition-transform duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ChefHat className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to see more products.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-masala-brown text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 animate-fade-up">
            Can't Find What You're Looking For?
          </h2>
          <p
            className="text-xl mb-8 opacity-90 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Contact us for custom pickle orders or special requests. We'd love
            to create something special for you!
          </p>
          <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <a
              href="/contact"
              className="btn-secondary inline-flex items-center"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
