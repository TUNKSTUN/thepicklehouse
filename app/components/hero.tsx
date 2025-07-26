import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import heroImage from "../assets/hero-pickle-kitchen.jpg";
import { useNavigate } from "react-router-dom";
import { GiChiliPepper } from "react-icons/gi";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with stronger overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${heroImage})`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex items-center justify-center mb-6 animate-fade-up">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <GiChiliPepper className="w-4 h-4 text-yellow-400 fill-red-500" />
              <span className="text-sm font-medium text-white">
                Handcrafted Since 2000s
              </span>
              <GiChiliPepper className="w-4 h-4 text-yellow-400 fill-red-500" />
            </div>
          </div>

          {/* Main heading with better contrast */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl  font-playfair mb-6 animate-fade-up leading-tight"
            style={{
              animationDelay: "0.2s",
              textShadow:
                "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)",
            }}
          >
            <span className="text-white block">
              Handcrafted <span className="text-green-200">Pickles</span>
            </span>
            <span className="text-secondary block drop-shadow-lg">
              from the Heart of Hyderabad
            </span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-up text-gray-100 leading-relaxed"
            style={{
              animationDelay: "0.4s",
              textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            A taste of tradition in every bite — made with love, authentic
            spices, and generations of culinary legacy. Experience the authentic
            flavors of Andhra Pradesh.
          </p>

          {/* Action buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up mb-12"
            style={{ animationDelay: "0.6s" }}
          >
            <Link to={`/store/products`}>
              <Button
                // onClick={}
                className="group px-8 py-6 bg-secondary hover:bg-amber-400 text-primary font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-amber-500"
              >
                Shop Our Pickles
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link to="/about">
              <Button
                variant="outline"
                className="px-8 py-6 bg-white/10 border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-md rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                Our Story
              </Button>
            </Link>
          </div>

          {/* Trust Indicators with better styling */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="text-center bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-amber-300 mb-1">15+</div>
              <div className="text-sm text-gray-200">Years of Excellence</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-amber-300 mb-1">100+</div>
              <div className="text-sm text-gray-200">Happy Customers</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-amber-300 mb-1">100%</div>
              <div className="text-sm text-gray-200">Natural Ingredients</div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-amber-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-8 w-16 h-16 bg-red-400/20 rounded-full blur-lg"></div>
      </section>
    </>
  );
};
