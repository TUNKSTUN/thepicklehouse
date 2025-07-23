import { Link } from "@remix-run/react";
import { MapPin, Phone, Mail, Heart } from "lucide-react";
import Logo from "../assets/thop_logo2.png"; // Adjust the path as necessary

export const Footer = () => {
  return (
    <footer className="bg-primary border-t border-secondary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center  space-x-2 mb-4 gap-2">
              <div className="flex items-center justify-center">
                <img
                  src={Logo}
                  alt="The House of Pickle logo"
                  className={`transition-all duration-500 ease-in-out ${"w-30 h-16"}`}
                />
              </div>
              <div>
                <h3
                  className={`font-playfair flex flex-col items-center justify-center font-bold text-secondary transition-all duration-500 ease-in-out ${"text-base"}`}
                  style={{ lineHeight: "0.8" }}
                >
                  <span>The</span>
                  <span>House of</span>
                  <span
                    className={`leading-none transition-all duration-500 ease-in-out ${"text-4xl"}`}
                  >
                    Pickles
                  </span>
                </h3>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Bringing you the authentic taste of Hyderabad with our traditional
              pickle recipes, made with love and the finest ingredients sourced
              from local farmers.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-turmeric" />
                <span className="text-sm">
                  123 Spice Bazaar, Old City, Hyderabad - 500002
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-turmeric" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-turmeric" />
                <span className="text-sm">hello@hyderabadipickles.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-primary-foreground/80 hover:text-turmeric transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-primary-foreground/80 hover:text-turmeric transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-primary-foreground/80 hover:text-turmeric transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-primary-foreground/80 hover:text-turmeric transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Care</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/shipping"
                  className="text-primary-foreground/80 hover:text-turmeric transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-primary-foreground/80 hover:text-turmeric transition-colors"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-primary-foreground/80 hover:text-turmeric transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-primary-foreground/80 hover:text-turmeric transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Hyderabadi Pickles. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm flex items-center mt-4 md:mt-0">
            Made with{" "}
            <Heart className="w-4 h-4 text-spice-red mx-1 fill-current" /> in
            Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
};
