import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import Logo from "../assets/thop2.png"; // Adjust the path as necessary
import PickleLogo from "../assets/thop_logo2.png"; // Adjust the path as necessary

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Check if we're on the home page
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Trigger after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navigation = [
    { name: "Home", href: "/home" },
    { name: "Products", href: "/store/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <header
        className={`bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 transition-all duration-500 ease-in-out ${
          isHomePage && !isScrolled ? "py-4" : "py-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-500 ease-in-out ${
              isHomePage && !isScrolled ? "h-20" : "h-16"
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 z-10 relative">
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center justify-center">
                  <img
                    src={PickleLogo}
                    alt="The House of Pickle logo"
                    className={`transition-all duration-500 ease-in-out ${
                      isHomePage && !isScrolled ? "w-20 h-16" : "w-16 h-12"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-playfair flex flex-col items-center justify-center font-bold text-red-800 transition-all duration-500 ease-in-out ${
                      isHomePage && !isScrolled ? "text-sm" : "text-xs"
                    }`}
                    style={{ lineHeight: "0.8" }}
                  >
                    <span>The</span>
                    <span>House of</span>
                    <span
                      className={`leading-none transition-all duration-500 ease-in-out ${
                        isHomePage && !isScrolled ? "text-3xl" : "text-2xl"
                      }`}
                    >
                      Pickles
                    </span>
                  </h3>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium font-playfair transition-all duration-500 ease-in-out hover:text-primary ${
                    isActive(item.href)
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground"
                  } ${
                    isHomePage && !isScrolled
                      ? "text-xl py-2"
                      : "text-base py-1"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center space-x-4 z-10 relative">
              <Link
                to="/store/cart"
                className={`relative p-2 text-muted-foreground hover:text-primary transition-all duration-500 ease-in-out ${
                  isHomePage && !isScrolled ? "scale-110" : "scale-100"
                }`}
              >
                <ShoppingCart
                  className={`transition-all duration-500 ease-in-out ${
                    isHomePage && !isScrolled ? "w-7 h-7" : "w-6 h-6"
                  }`}
                />
                {/* Uncomment when cart functionality is ready
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-spice-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {totalItems}
                  </span>
                )}
                */}
              </Link>

              {/* Enhanced Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className={`md:hidden transition-all duration-300 ease-in-out hover:bg-muted/60 active:scale-95 ${
                  isHomePage && !isScrolled ? "scale-110 p-3" : "scale-100 p-2"
                } ${isMobileMenuOpen ? "bg-muted/40" : ""}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen
                        ? "opacity-0 rotate-90 scale-75"
                        : "opacity-100 rotate-0 scale-100"
                    } ${isHomePage && !isScrolled ? "w-6 h-6" : "w-5 h-5"}`}
                  />
                  <X
                    className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 rotate-90 scale-75"
                    } ${isHomePage && !isScrolled ? "w-6 h-6" : "w-5 h-5"}`}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Navigation Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: isHomePage && !isScrolled ? "112px" : "64px" }}
      >
        {/* Background Overlay with blur */}
        <div
          className={`absolute inset-0 bg-background/80 backdrop-blur-md transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Content */}
        <div
          className={`relative bg-card/95 backdrop-blur-sm border-b border-border shadow-lg transition-all duration-400 ease-out ${
            isMobileMenuOpen
              ? "transform translate-y-0 opacity-100"
              : "transform -translate-y-4 opacity-0"
          }`}
        >
          <nav className="px-6 py-6 space-y-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ease-out hover:bg-muted/60 hover:scale-[1.02] active:scale-95 ${
                  isActive(item.href)
                    ? "text-primary bg-muted/40 border-l-4 border-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                } ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-6"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 75}ms` : "0ms",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative">
                  {item.name}
                  {/* Active indicator dot */}
                  {isActive(item.href) && (
                    <span className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  )}
                </span>

                {/* Hover effect arrow */}
                <span
                  className={`ml-auto transition-all duration-200 ease-out ${
                    isActive(item.href)
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  } transform translate-x-0 group-hover:translate-x-1`}
                >
                  →
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Footer with gradient */}
          <div className="px-6 pb-6 pt-2">
            <div className="border-t border-border pt-4">
              <Link
                to="/store/cart"
                className="flex items-center justify-center px-4 py-3 text-sm font-medium text-primary-foreground bg-gradient-to-r from-primary to-masala-brown rounded-lg transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
