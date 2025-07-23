import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

const PickleCarousel = ({ pickleVarieties, mockupImage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pickleVarieties.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + pickleVarieties.length) % pickleVarieties.length
    );
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-background to-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Our Pickle Varieties
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover our authentic collection of traditional pickles, each
            crafted with love and time-honored recipes
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl justify-center items-center w-full   rounded-lg p-2  flex flex-col mx-auto">
          {/* Carousel Track */}
          <div className="overflow-hidden bg-secondary/20 border p-4 items-center justify-center flex rounded-2xl ">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / 3)}%)`,
                width: `${(pickleVarieties.length * 100) / 3}%`,
              }}
            >
              {pickleVarieties.map((pickle, index) => (
                <div key={index} className="w-1/3 flex-shrink-0 px-4">
                  <motion.div
                    className="bg-white rounded-2xl  shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-2"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Card Image Section */}
                    <div
                      className={`h-64 bg-gradient-to-br rounded ${pickle.color} p-8 flex items-center justify-center relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 rounded bg-white/10 backdrop-blur-sm"></div>
                      <img
                        src={pickle.image || mockupImage}
                        alt={pickle.name}
                        className="w-auto max-h-48 rounded relative z-10 drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-primary font-playfair mb-3">
                        {pickle.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 font-inter">
                        {pickle.description}
                      </p>

                      <div className="flex justify-center">
                        <span className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors cursor-pointer group">
                          Explore Variety
                          <svg
                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex w-full max-w-7xl p-4 items-center justify-center md:gap-20 ">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="w-12 h-12   z-20 bg-primary hover:bg-primary/90 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <FiChevronLeft className="w-6 h-6 text-white" />
            </button>
            {/* Carousel Indicators */}
            <div className="flex justify-center space-x-2">
              {pickleVarieties.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className=" w-12 h-12 z-20 bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <FiChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Shop All Button */}
          <div className="text-center mt-12">
            <motion.a
              href="/store/products"
              className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop All Pickles
              <FiArrowRight className="w-5 h-5 ml-2" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PickleCarousel;
