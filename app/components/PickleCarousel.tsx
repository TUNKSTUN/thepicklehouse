import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { loader } from "../routes/_thop";
import { Link, useRouteLoaderData } from "@remix-run/react";
import MockupImage from "../assets/thop2.png";

export const PickleCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products } = useRouteLoaderData<typeof loader>("routes/_thop");
  const productsFeatured = [];
  for (let i = 0; i < products.length; i++) {
    console.log(products[i].isFeatured);
    if (products[i].isFeatured === true) {
      productsFeatured.push(products[i]);
      console.log(productsFeatured);
    }
  }
  const defaultPickles = [
    {
      name: "Mango Pickle",
      description:
        "Tangy and spicy mango pickle made with traditional spices and mustard oil",
      color: "from-orange-400 to-yellow-500",
      image: MockupImage,
    },
    {
      name: "Lemon Pickle",
      description:
        "Zesty lemon pickle with aromatic spices, perfect for enhancing any meal",
      color: "from-yellow-400 to-green-500",
      image: MockupImage,
    },
    {
      name: "Mixed Vegetable",
      description:
        "A delightful mix of seasonal vegetables pickled in authentic spices",
      color: "from-green-400 to-blue-500",
      image: MockupImage,
    },
    {
      name: "Garlic Pickle",
      description:
        "Bold garlic pickle with intense flavors and health benefits",
      color: "from-purple-400 to-pink-500",
      image: MockupImage,
    },
    {
      name: "Chili Pickle",
      description:
        "Fiery hot chili pickle for those who love intense heat and flavor",
      color: "from-red-400 to-orange-500",
      image: MockupImage,
    },
  ];

  const pickles =
    productsFeatured.length > 0 ? productsFeatured : defaultPickles;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pickles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pickles.length) % pickles.length);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Get indices for prev, current, and next cards
  const getPrevIndex = () =>
    (currentSlide - 1 + pickles.length) % pickles.length;
  const getNextIndex = () => (currentSlide + 1) % pickles.length;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-3 sm:mb-4">
            Our Pickle Varieties
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-inter font-light leading-relaxed">
            Discover our authentic collection of traditional pickles, each
            crafted with love and time-honored recipes
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Track with Side Cards */}
          <div className="relative h-96 sm:h-[420px] flex items-center justify-center">
            {/* Left Side Card (Blurred) */}
            <div className="absolute left-0 w-48 sm:w-56 h-72 sm:h-80 opacity-40 blur-sm scale-75 transform -translate-x-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                <div
                  className={`h-2/3 bg-gradient-to-br ${
                    pickles[getPrevIndex()].color
                  } p-4 flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"></div>
                  <img
                    src={pickles[getPrevIndex()].image || MockupImage}
                    alt={pickles[getPrevIndex()].name}
                    className="w-auto max-h-24 rounded relative z-10 shadow-lg"
                  />
                </div>
                <div className="p-3 h-1/3 flex flex-col justify-center">
                  <h3 className="text-sm font-bold text-gray-700 mb-1 truncate">
                    {pickles[getPrevIndex()].name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {pickles[getPrevIndex()].longDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Center Card (Main Focus) */}
            <div className="w-72 sm:w-80 md:h-96 h-96 z-10 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-white flex flex-col rounded-2xl border border-secondary shadow-2xl overflow-hidden h-full hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Card Image Section */}
                  <div
                    className={` max-h-full bg-gradient-to-br rounded-t-2xl bg-secondary md:p-6 p-8 flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white rounded-t-2xl bg-opacity-10 backdrop-blur-sm"></div>
                    <img
                      src={pickles[currentSlide].image || MockupImage}
                      alt={pickles[currentSlide].name}
                      className="w-auto md:max-h-48 max-h-52 rounded relative z-10  transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 h-1/2 flex flex-col justify-center">
                    <h3 className="md:text-xl text-2xl font-bold text-primary font-playfair mb-1">
                      {pickles[currentSlide].name}
                    </h3>
                    <p className="md:text-sm text-base text-gray-600 leading-relaxed mb-2 font-inter line-clamp-2">
                      {pickles[currentSlide].description}
                    </p>
                    <div className="flex justify-center">
                      <Link to={`/pickle/${pickles[currentSlide].slug}`}>
                        <span className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors cursor-pointer group text-sm">
                          Explore Variety
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side Card (Blurred) */}
            <div className="absolute right-0 w-48 sm:w-56 h-72 sm:h-80 opacity-40 blur-sm scale-75 transform translate-x-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                <div
                  className={`h-2/3 bg-gradient-to-br ${
                    pickles[getNextIndex()].color
                  } p-4 flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"></div>
                  <img
                    src={pickles[getNextIndex()].image || MockupImage}
                    alt={pickles[getNextIndex()].name}
                    className="w-auto max-h-24 rounded relative z-10 shadow-lg"
                  />
                </div>
                <div className="p-3 h-1/3 flex flex-col justify-center">
                  <h3 className="text-sm font-bold text-gray-700 mb-1 truncate">
                    {pickles[getNextIndex()].name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {pickles[getNextIndex()].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Edge Gradient Overlays */}
            <div className="absolute -left-4 top-0 w-44 h-full bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none z-20"></div>
            <div className="absolute -right-4 top-0 w-44 h-full bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-20"></div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 gap-6 lg:gap-20">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronLeft className="w-full h-full text-white group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center space-x-2">
              {pickles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary scale-125 shadow-lg"
                      : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronRight className="w-full h-full group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Shop All Button */}
          <div className="text-center mt-10 lg:mt-12">
            <a
              href="/store/products"
              className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Shop All Pickles
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PickleCarousel;
