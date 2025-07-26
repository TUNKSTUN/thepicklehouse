import { useRouteLoaderData, Link } from "@remix-run/react";
import { MapPin, Phone, Mail, Heart, ExternalLink } from "lucide-react";
import type { loader as rootLoader } from "~/root";
import Logo from "../assets/thop_logo2.png";
import { RiInstagramLine } from "react-icons/ri";
import { Badge } from "./ui/badge";
import DevLogo from "../assets/dev_logo.png";

export const Footer = () => {
  const data = useRouteLoaderData<typeof rootLoader>("routes/_thop");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary to-primary/95 border-t border-secondary/20 text-primary-foreground overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-6 space-y-6">
            <div className="group">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  {/* <div className="absolute -inset-2 bg-turmeric/20 rounded-full blur-sm group-hover:bg-turmeric/30 transition-all duration-300" /> */}
                  <img
                    src={Logo}
                    alt="The House of Pickle logo"
                    className="relative w-32 h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3
                    className="font-playfair font-bold text-secondary  text-center transition-all duration-300 group-hover:text-turmeric"
                    style={{ lineHeight: "0.60" }}
                  >
                    <span className="block text-lg">The</span>
                    <span className="block text-lg">House of</span>
                    <span className="block text-3xl lg:text-5xl font-extrabold bg-gradient-to-r from-turmeric to-secondary bg-clip-text text-transparent">
                      Pickles
                    </span>
                  </h3>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-primary-foreground/90 text-lg leading-relaxed max-w-md font-medium">
                Bringing you the authentic taste of Hyderabad with our
                traditional pickle recipes, made with love and the finest
                ingredients sourced from local farmers.
              </p>

              <Badge
                variant="outline"
                className="bg-turmeric/10 border-turmeric/30 text-turmeric font-semibold p-1 px-4"
              >
                ✨ Authentic • Traditional • Premium
              </Badge>
            </div>

            {/* Contact Info with Modern Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="group bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10 hover:border-turmeric/30 hover:bg-primary-foreground/10 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-turmeric/20 rounded-lg group-hover:bg-turmeric/30 transition-colors">
                    <MapPin className="w-4 h-4 text-turmeric" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-turmeric uppercase tracking-wider mb-1">
                      Address
                    </p>
                    <p className="text-sm text-primary-foreground/90 leading-relaxed">
                      {data?.contactDetails?.address ??
                        "123 Spice Bazaar, Old City, Hyderabad - 500002"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10 hover:border-turmeric/30 hover:bg-primary-foreground/10 transition-all duration-300">
                <a
                  href={`tel:${data?.contactDetails?.phone}`}
                  className="flex items-start space-x-3"
                >
                  <div className="p-2 bg-turmeric/20 rounded-lg group-hover:bg-turmeric/30 transition-colors">
                    <Phone className="w-4 h-4 text-turmeric" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-turmeric uppercase tracking-wider mb-1">
                      Call Us
                    </p>
                    <p className="text-sm text-primary-foreground/90 group-hover:text-turmeric transition-colors">
                      {data?.contactDetails?.phone ?? "+91 98765 43210"}
                    </p>
                  </div>
                </a>
              </div>

              <div className="group bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10 hover:border-turmeric/30 hover:bg-primary-foreground/10 transition-all duration-300">
                <a
                  href={`mailto:${data?.contactDetails?.email}`}
                  className="flex items-start space-x-3"
                >
                  <div className="p-2 bg-turmeric/20 rounded-lg group-hover:bg-turmeric/30 transition-colors">
                    <Mail className="w-4 h-4 text-turmeric" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-turmeric uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <p className="text-sm text-primary-foreground/90 group-hover:text-turmeric transition-colors">
                      {data?.contactDetails?.email ??
                        "hello@hyderabadipickles.com"}
                    </p>
                  </div>
                </a>
              </div>

              <div className="group bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10 hover:border-turmeric/30 hover:bg-primary-foreground/10 transition-all duration-300">
                <a
                  href={data?.contactDetails?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3"
                >
                  <div className="p-2 bg-turmeric/20 rounded-lg group-hover:bg-turmeric/30 transition-colors">
                    <RiInstagramLine className="w-4 h-4 text-turmeric" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-turmeric uppercase tracking-wider mb-1">
                      Follow Us
                    </p>
                    <p className="text-sm text-primary-foreground/90 group-hover:text-turmeric transition-colors">
                      @thehouseofpickles
                    </p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-primary-foreground/40 group-hover:text-turmeric transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-xl mb-6 text-secondary relative">
                  Quick Links
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-turmeric rounded-full" />
                </h4>
                <nav className="space-y-4">
                  {[
                    { to: "/", label: "Home" },
                    { to: "/pickles", label: "Pickles" },
                    { to: "/about", label: "About Us" },
                    { to: "/contact", label: "Contact" },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="group flex items-center text-primary-foreground/80 hover:text-turmeric transition-all duration-300 font-medium"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-turmeric rounded-full transition-all duration-300 mr-0 group-hover:mr-3" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-xl mb-6 text-secondary relative">
                  Customer Care
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-turmeric rounded-full" />
                </h4>
                <nav className="space-y-4">
                  {[
                    { to: "/faq", label: "FAQ" },
                    { to: "/support", label: "Support" },
                    // { to: "/shipping", label: "Shipping Info" },
                    // { to: "/returns", label: "Returns" },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="group flex items-center text-primary-foreground/80 hover:text-turmeric transition-all duration-300 font-medium"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-turmeric rounded-full transition-all duration-300 mr-0 group-hover:mr-3" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Bottom Bar */}
        <div className="relative mt-16 pt-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-primary-foreground/70 text-sm font-medium">
                © {currentYear} The House of Pickles. All rights reserved.
              </p>
              <div className="hidden sm:flex items-center space-x-4 text-xs text-primary-foreground/50">
                <Link
                  to="/privacy"
                  className="hover:text-turmeric transition-colors"
                >
                  Privacy
                </Link>
                <span>•</span>
                <Link
                  to="/terms"
                  className="hover:text-turmeric transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>

            {/* Enhanced Attribution */}
            <div className="group flex items-center text-sm font-semibold text-primary-foreground/80">
              <span className="mr-2">Crafted with</span>
              <Heart
                className="w-4 h-4 text-spice-red mx-1 fill-current group-hover:animate-pulse transition-all duration-300"
                aria-hidden="true"
              />
              <span className="mr-2">by</span>
              <a
                href="https://yahyaoncloud.vercel.app"
                className="relative text-blue-400 hover:text-blue-300 transition-all duration-300 group-hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Yahya Khan's portfolio"
              >
                <span className="relative z-10">Yahya Khan</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded px-2 py-1 -m-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
