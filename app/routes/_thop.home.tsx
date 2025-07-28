import { useState, useEffect } from "react";
import { Hero } from "../components/hero";
import PickleCarousel from "../components/PickleCarousel";
import { motion } from "framer-motion";
import Mockup from "../assets/thop2.png";
import BackgroundImage from "../assets/background-1.png";
import NaturalIngredients from "../assets/home/natural.png";
import PremiumOils from "../assets/home/premium_oils.png";
import HandpickedSpices from "../assets/home/handpicked_spices.png";
import TraditionalReciepe from "../assets/home/traditional_reciepe.png";
import { ChefHat, Heart, Leaf, LocateIcon, PinIcon, Sparkles } from "lucide-react";
import ProcessBackgroundImage from "../assets/home/contact_background_image.png";
import AuntyWorking from "../assets/aunty-working.webp";

import {
  MdVerified,
  MdLocalShipping,
  MdSecurity,
  MdHeadsetMic,
  MdCheckCircle,
  MdTimer,
  MdShield,
  MdStar,
} from "react-icons/md";
import { GiIndiaGate, GiPin, GiWheat } from "react-icons/gi";
import { RiCustomerService2Fill } from "react-icons/ri";

// export const loader: LoaderFunction = async () => {
//   return {};
// };

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

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
      location: "Hydrabad",
      rating: 5,
    },
    {
      text: "Best pickle I've ever ordered online. The spices are perfectly balanced and the oil quality is outstanding.",
      author: "Rajesh Kumar",
      location: "Hyderabad",
      rating: 5,
    },
    {
      text: "My entire family is addicted to these pickles! The mango one is our absolute favorite. Quick delivery too.",
      author: "Kavitha Reddy",
      location: "Hyderabad",
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
            className="w-full h-full object-cover opacity-20 pointer-events-none select-none"
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
                className="w-full max-w-lg mx-auto h-auto object-contain drop-shadow-2xl rotate-12"
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Trust & Quality Assurance Section */}
      <section className="relative p-4 bg-primary py-10">
        <div className="max-w-full   rounded-tr-[100px] rounded-bl-[100px] bg-background p-10 overflow-clip flex flex-col items-center justify-center">
          <div className="max-w-6xl py-10 mx-auto">
            {/* Section Header */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary mb-4">
                Why Choose Our Pickles?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Your trust is our priority. We maintain the highest standards of
                quality, safety, and customer satisfaction in every aspect of
                our business.
              </p>
            </motion.div>

            {/* Main Trust Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* FSSAI Certified */}
              <motion.div
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group border border-border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true, amount: 0.8 }}
              >
                <div className="bg-secondary rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-secondary/80 transition-colors">
                  <MdVerified className="w-8 h-8 text-primary mx-auto" />
                </div>
                <h3 className="font-semibold text-lg text-primary mb-2">
                  FSSAI Certified
                </h3>
                <p className="text-muted-foreground text-sm">
                  Approved by Food Safety and Standards Authority of India for
                  quality assurance
                </p>
              </motion.div>

              {/* Fast Delivery */}
              <motion.div
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group border border-border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true, amount: 0.8 }}
              >
                <div className="bg-accent/30 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-accent/40 transition-colors">
                  <MdLocalShipping className="w-8 h-8 text-masala-brown mx-auto" />
                </div>
                <h3 className="font-semibold text-lg text-primary mb-2">
                  Fast Delivery
                </h3>
                <p className="text-muted-foreground text-sm">
                  Quick and secure delivery across India with proper packaging
                  and care
                </p>
              </motion.div>

              {/* Authentic Recipe */}
              <motion.div
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group border border-border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true, amount: 0.8 }}
              >
                <div className="bg-turmeric/30 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-turmeric/40 transition-colors">
                  <GiIndiaGate className="w-8 h-8 text-spice-red mx-auto" />
                </div>
                <h3 className="font-semibold text-lg text-primary mb-2">
                  100% Authentic
                </h3>
                <p className="text-muted-foreground text-sm">
                  Traditional Hyderabadi recipes passed down through generations
                </p>
              </motion.div>

              {/* Customer Support */}
              <motion.div
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group border border-border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true, amount: 0.8 }}
              >
                <div className="bg-terracotta/30 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-terracotta/40 transition-colors">
                  <RiCustomerService2Fill className="w-8 h-8 text-masala-brown mx-auto" />
                </div>
                <h3 className="font-semibold text-lg text-primary mb-2">
                  24/7 Support
                </h3>
                <p className="text-muted-foreground text-sm">
                  Dedicated customer care team ready to assist you anytime
                </p>
              </motion.div>
            </div>

            {/* Additional Trust Indicators */}
            <motion.div
              className="bg-card rounded-2xl p-8 shadow-lg border border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true, amount: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Quality Guarantee */}
                <div className="flex items-center space-x-3">
                  <div className="bg-secondary rounded-full p-2">
                    <MdCheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm">
                      Quality Guarantee
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      100% satisfaction assured
                    </p>
                  </div>
                </div>

                {/* Fresh Production */}
                <div className="flex items-center space-x-3">
                  <div className="bg-turmeric/30 rounded-full p-2">
                    <MdTimer className="w-6 h-6 text-masala-brown" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm">
                      Fresh Daily
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Made fresh in small batches
                    </p>
                  </div>
                </div>

                {/* Secure Packaging */}
                <div className="flex items-center space-x-3">
                  <div className="bg-spice-red/20 rounded-full p-2">
                    <MdShield className="w-6 h-6 text-spice-red" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm">
                      Secure Packaging
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Tamper-proof & hygienic
                    </p>
                  </div>
                </div>

                {/* Premium Rating */}
                <div className="flex items-center space-x-3">
                  <div className="bg-accent/30 rounded-full p-2">
                    <MdStar className="w-6 h-6 text-masala-brown" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm">
                      5-Star Rated
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Trusted by 10,000+ customers
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications Banner */}
            <motion.div
              className="mt-12 bg-primary rounded-2xl p-6 text-primary-foreground text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true, amount: 0.8 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center space-x-2">
                  <MdSecurity className="w-6 h-6" />
                  <span className="font-semibold">ISO 22000 Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GiWheat className="w-6 h-6" />
                  <span className="font-semibold">Organic Ingredients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MdHeadsetMic className="w-6 h-6" />
                  <span className="font-semibold">Customer First Policy</span>
                </div>
              </div>
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
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none z-0"
        />

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary mb-4 animate-fade-up">
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
                  <div className="absolute md:flex hidden md:-top-2 md:-right-0 -top-8 right-[55%] bg-primary text-primary-foreground text-sm font-bold rounded-full w-8 h-8 items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-playfair font-semibold text-lg text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-masala-brown text-sm leading-relaxed md:w-full max-w-2xl">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-masala-brown py-20 px-4 sm:px-8 lg:px-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <MdStar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold font-playfair text-white mb-6 leading-tight">
              What Our Customers Say
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join over 10,000+ happy customers who have experienced the
              authentic taste of tradition
            </p>

            {/* Trust Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">4.5★</div>
                <div className="text-white/80 text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">100+</div>
                <div className="text-white/80 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">1K+</div>
                <div className="text-white/80 text-sm">Jars Sold</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="group relative bg-secondary backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">"</span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center mb-6 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-yellow-400 text-2xl"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-primary/80 text-lg italic mb-8 leading-relaxed text-center min-h-[120px] flex items-center">
                  "{testimonial.text}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center justify-center space-x-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-masala-brown rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-primary text-lg">
                      {testimonial.author}
                    </p>
                    <p className="text-primary text-sm flex items-center gap-2 justify-center">
                      <GiPin className="w-4" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative flex flex-col lg:flex-row bg-gradient-to-br from-olived to-green-800 justify-between   text-white">
        <motion.div
          className="lg:w-1/2 max-w-4xl px-8 py-20 mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6 font-playfair text-left">
            Ready to Experience Authentic Flavors?
          </h2>
          <p className="text-xl mb-8 opacity-90 text-left">
            Join thousands of satisfied customers who have made our pickles a
            staple in their homes. Order now and taste the difference tradition
            makes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/pickles"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg shadow-lg hover:bg-primary hover:text-primary-foreground transition font-semibold text-lg"
            >
              Explore Now
            </a>
            <a
              href="/about"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary transition font-semibold text-lg"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative w-1/2 max-w-3xl mt-8 lg:mt-0"
          initial={{ opacity: 0, x: 30, animationDelay: 1 }}
          whileInView={{ opacity: 1, x: 0, animationDelay: 1 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          <img
            src={AuntyWorking}
            alt="working with spices"
            className="absolute w-full h-full lg:h-full object-cover  md:rounded-tl-full md:rounded-tr-none rounded-t-full top-0 right-0"
          />
        </motion.div>
      </section>
    </>
  );
}
