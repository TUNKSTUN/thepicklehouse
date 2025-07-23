import React, { useState, useEffect } from "react";
import { LoaderFunction } from "@remix-run/node";
import { Hero } from "../components/hero";
import PickleCarousel from "../components/PickleCarousel";
import { motion } from "framer-motion";
import Mockup from "../assets/thop2.png";
import BackgroundImage from "../assets/background-1.png";
import NaturalIngredients from "../assets/home/natural.png";
import PremiumOils from "../assets/home/premium_oils.png";
import HandpickedSpices from "../assets/home/handpicked_spices.png";
import TraditionalReciepe from "../assets/home/traditional_reciepe.png";
import { ChefHat, Heart, Leaf, Sparkles } from "lucide-react";
import ProcessBackgroundImage from "../assets/home/contact_background_image.png";

export const loader: LoaderFunction = async () => {
  return {};
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-background">
  //       <div className="loader"></div>
  //     </div>
  //   );
  // }

  const process = [
    {
      icon: Leaf,
      title: "Sourcing",
      description:
        "We carefully select the freshest vegetables and fruits from trusted local farmers who share our commitment to quality.",
    },
    {
      icon: ChefHat,
      title: "Preparation",
      description:
        "Each ingredient is meticulously cleaned, cut, and prepared according to time-honored techniques.",
    },
    {
      icon: Sparkles,
      title: "Spice Blending",
      description:
        "Our signature spice blends are prepared fresh daily, roasted to perfection, and combined in precise measurements.",
    },
    {
      icon: Heart,
      title: "Crafting",
      description:
        "Every batch is lovingly prepared by hand, ensuring each jar captures the authentic taste of traditional Hyderabadi pickles.",
    },
  ];

  const pickleVarieties = [
    {
      name: "Mango Pickle",
      description: "Sweet and tangy raw mango pickle with traditional spices",
      image: Mockup,
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: "Lemon Pickle",
      description: "Zesty lemon pickle that adds punch to every meal",
      image: Mockup,
      color: "from-yellow-300 to-lime-400",
    },
    {
      name: "Gongura Pickle",
      description: "Andhra's signature sorrel leaves pickle - a true delicacy",
      image: Mockup,
      color: "from-green-400 to-emerald-600",
    },
    {
      name: "Red Chili Pickle",
      description: "Fiery hot red chili pickle for spice lovers",
      image: Mockup,
      color: "from-red-500 to-rose-600",
    },
    {
      name: "Mixed Vegetable",
      description: "A medley of seasonal vegetables in aromatic spices",
      image: Mockup,
      color: "from-purple-400 to-indigo-500",
    },
    {
      name: "Garlic Pickle",
      description: "Pungent garlic pickle with incredible health benefits",
      image: Mockup,
      color: "from-amber-400 to-orange-600",
    },
  ];

  const testimonials = [
    {
      text: "Absolutely authentic taste! Takes me back to my childhood in Hyderabad. The gongura pickle is exceptional.",
      author: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
    },
    {
      text: "Best pickle I've ever ordered online. The spices are perfectly balanced and the oil quality is outstanding.",
      author: "Rajesh Kumar",
      location: "Bangalore",
      rating: 5,
    },
    {
      text: "My entire family is addicted to these pickles! The mango one is our absolute favorite. Quick delivery too.",
      author: "Kavitha Reddy",
      location: "Chennai",
      rating: 5,
    },
  ];

  const features = [
    {
      title: "100% Natural",
      description: "No artificial preservatives or colors",
      icon: NaturalIngredients,
    },
    {
      title: "Traditional Recipe",
      description: "Passed down through generations",
      icon: TraditionalReciepe,
    },
    {
      title: "Premium Oil",
      description: "Cold-pressed sesame & mustard oil",
      icon: PremiumOils,
    },
    {
      title: "Hand-picked Spices",
      description: "Sourced directly from local farms",
      icon: HandpickedSpices,
    },
  ];

  return (
    <>
      <Hero />

      {/* Brand Story Section */}
      <section className="relative bg-white py-20 px-4 sm:px-8 lg:px-24">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={BackgroundImage}
            alt="Background"
            className="w-full h-full object-cover opacity-10 pointer-events-none select-none"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-primary font-playfair mb-6">
                Authentic Flavors from the Heart of Hyderabad
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                For over three generations, our family has been crafting pickles
                using time-honored recipes that capture the essence of Andhra
                cuisine. Each jar is lovingly prepared with hand-picked
                ingredients and traditional methods that preserve the authentic
                taste of home.
              </p>
              <p className="text-gray-600 mb-8">
                From the tangy burst of raw mango to the fiery kick of red
                chilies, every pickle tells a story of tradition, love, and the
                rich culinary heritage of South India.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-center flex flex-col justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.8 }}
                  >
                    <img
                      src={feature.icon}
                      className="w-24 h-24 flex flex-col"
                      alt="icons"
                    />
                    <h4 className="font-semibold text-primary text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-xs">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
              viewport={{ once: true, amount: 0.8 }}
            >
              <img
                src={Mockup}
                alt="Traditional Pickle Jar"
                className="w-full max-w-md mx-auto h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pickle Varieties Carousel Section */}
      <PickleCarousel pickleVarieties={pickleVarieties} mockupImage={Mockup} />

      {/* Process Section */}
      <section className="relative py-16 lg:py-24 bg-secondary/20 overflow-hidden">
        <img
          src={ProcessBackgroundImage}
          alt="Process Background"
          className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none z-0"
        />

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-4 animate-fade-up">
              Our Traditional Process
            </h2>
            <p
              className="text-lg text-masala-brown max-w-3xl mx-auto animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Every jar of our pickles goes through a meticulous process that
              honors traditional methods while ensuring the highest quality
              standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div
                key={step.title}
                className="text-center animate-stagger"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div className="bg-primary bg-blend-lighten rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-playfair font-semibold text-lg text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-masala-brown text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="bg-primary py-20 px-4 sm:px-8 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <h2 className="text-3xl font-bold font-playfair text-white  mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-100">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.8 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-primary">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-masala-brown py-20 px-4 sm:px-8 lg:px-24 text-center text-white">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6 font-playfair">
            Ready to Experience Authentic Flavors?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who have made our pickles a
            staple in their homes. Order now and taste the difference tradition
            makes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/store/products"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition font-semibold text-lg"
            >
              Shop Now
            </a>
            <a
              href="/about"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary transition font-semibold text-lg"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
