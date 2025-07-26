import { useState, useEffect } from "react";
import { Link, useLocation } from "@remix-run/react";
import { ShoppingCart, Menu, X, User, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import PickleLogo from "../assets/thop_logo2.png"; // Uncomment when image is available
// import { useCart } from "../hooks/useCart";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Safe cart hook usage with fallback
  // let totalItems = 0;
  // try {
  //   const cartData = useCart();
  //   totalItems = cartData?.totalItems || 0;
  // } catch (error) {
  //   console.warn("Cart hook not available:", error);
  // }

  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Pickles", href: "/pickles" },
    // { name: "Products", href: "/store/products" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname === href;
  };

  return (
    <>
      <header
        className={`backdrop-blur-sm border-b border-border sticky top-0 z-50 transition-all duration-500 ease-in-out ${
          isHomePage && !isScrolled
            ? "py-4 bg-primary"
            : "py-0 bg-background/95"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-500 ease-in-out ${
              isHomePage && !isScrolled ? "h-20" : "h-16"
            }`}
          >
            <Link to="/" className="flex items-center space-x-2 z-10 relative">
              <div className="flex items-center justify-center gap-2">
                {/* Fallback logo - replace with your image when available */}

                <img
                  src={PickleLogo}
                  alt="The House of Pickle logo"
                  className={`transition-all duration-500 ease-in-out ${
                    isHomePage && !isScrolled ? "w-20 h-16" : "w-16 h-12"
                  }`}
                />
                <div>
                  <h3
                    className={`font-playfair flex flex-col items-center justify-center font-bold transition-all duration-500 ease-in-out ${
                      isHomePage && !isScrolled
                        ? "text-sm text-secondary"
                        : "text-xs text-red-900"
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

            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium font-playfair transition-all duration-500 ease-in-out relative group ${
                    isHomePage && !isScrolled
                      ? "text-xl py-2"
                      : "text-base py-1"
                  } ${
                    isActive(item.href)
                      ? isHomePage && !isScrolled
                        ? "text-secondary"
                        : "text-spice-red"
                      : isHomePage && !isScrolled
                      ? "text-secondary/80 hover:text-secondary"
                      : "text-muted-foreground hover:text-spice-red"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 ${
                      isActive(item.href)
                        ? isHomePage && !isScrolled
                          ? "bg-secondary scale-x-100"
                          : "bg-spice-red scale-x-100"
                        : "bg-current scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4 z-10 relative">
              <Link
                to="/support-palestine"
                className={`relative p-2 transition-all duration-500 ease-in-out flex items-center space-x-1 ${
                  isHomePage && !isScrolled
                    ? "scale-110 text-secondary hover:text-secondary/70"
                    : "scale-100 text-spice-red hover:text-spice-red/70"
                }`}
              >
                <span className="text-lg">🍉</span>
                <span className="text-sm font-medium">Support Palestine</span>
              </Link>
              <Link
                to="/profile"
                className={`relative p-2 transition-all duration-500 ease-in-out ${
                  isHomePage && !isScrolled
                    ? "scale-110 text-secondary hover:text-secondary/70"
                    : "scale-100 text-spice-red hover:text-spice-red/70"
                }`}
              >
                <User
                  className={`transition-all duration-500 ease-in-out ${
                    isHomePage && !isScrolled ? "w-7 h-7" : "w-6 h-6"
                  }`}
                />
              </Link>
              {/* <Link
                to="/user/wishlist"
                className={`relative p-2 transition-all duration-500 ease-in-out ${
                  isHomePage && !isScrolled
                    ? "scale-110 text-secondary hover:text-secondary/70"
                    : "scale-100 text-spice-red hover:text-spice-red/70"
                }`}
              >
                <Heart
                  className={`transition-all duration-500 ease-in-out ${
                    isHomePage && !isScrolled ? "w-7 h-7" : "w-6 h-6"
                  }`}
                />
              </Link> */}
              {/* <Link
                to="/store/cart"
                className={`relative p-2 transition-all duration-500 ease-in-out ${
                  isHomePage && !isScrolled
                    ? "scale-110 text-secondary hover alakul:text-secondary/70"
                    : "scale-100 text-spice-red hover:text-spice-red/70"
                }`}
              >
                <ShoppingCart
                  className={`transition-all duration-500 ease-in-out ${
                    isHomePage && !isScrolled ? "w-7 h-7" : "w-6 h-6"
                  }`}
                />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-spice-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {totalItems}
                  </span>
                )}
              </Link> */}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden transition-all duration-300 ease-in-out hover:bg-masala-brown/30 active:scale-95 ${
                isHomePage && !isScrolled ? "p-3" : "p-2"
              } ${isMobileMenuOpen ? "bg-gray-100/60" : ""} ${
                isHomePage && !isScrolled ? "text-secondary" : "text-spice-red"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative flex items-center justify-center">
                <Menu
                  className={`absolute transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "opacity-0 rotate-45 scale-0"
                      : "opacity-100 rotate-0 scale-100"
                  } ${isHomePage && !isScrolled ? "w-6 h-6" : "w-5 h-5"}`}
                />
                <X
                  className={`absolute transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-45 scale-0"
                  } ${isHomePage && !isScrolled ? "w-6 h-6" : "w-5 h-5"}`}
                />
                <div
                  className={`invisible ${
                    isHomePage && !isScrolled ? "w-6 h-6" : "w-5 h-5"
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: isHomePage && !isScrolled ? "112px" : "64px" }}
      >
        <div
          className={`absolute inset-0 bg-background/80 backdrop-blur-md transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

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
                className={`group flex items-center px-4 py-3 text-base font-medium font-playfair rounded-lg transition-all duration-300 ease-out hover:bg-muted/60 hover:scale-[1.02] active:scale-95 relative ${
                  isActive(item.href)
                    ? "text-spice-red bg-muted/40 border-l-4 border-spice-red shadow-sm"
                    : "text-muted-foreground hover:text-spice-red"
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
                  {isActive(item.href) && (
                    <span className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-spice-red rounded-full animate-pulse" />
                  )}
                </span>
                <span
                  className={`ml-auto transition-all duration-200 ease-out ${
                    isActive(item.href)
                      ? "opacity-100 text-spice-red"
                      : "opacity-0 group-hover:opacity-100 group-hover:text-spice-red"
                  } transform translate-x-0 group-hover:translate-x-1`}
                >
                  →
                </span>
                {isActive(item.href) && (
                  <span className="absolute inset-0 bg-spice-red/5 rounded-lg -z-10" />
                )}
              </Link>
            ))}
          </nav>

          <div className="px-6 pb-6 pt-2">
            <div className="border-t border-border pt-4 space-y-2">
              <Link
                to="/support-palestine"
                className="flex items-center justify-center px-4 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg transition-all duration-300 ease-out hover:scale-105 hover:bg-primary/90 active:scale-95 shadow-md hover:shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-2 text-lg">🇵🇸</span>
                Support Palestine
              </Link>
              <Link
                to="/profile"
                className="flex items-center justify-center px-4 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg transition-all duration-300 ease-out hover:scale-105 hover:bg-primary/90 active:scale-95 shadow-md hover:shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
              {/* <Link
                to="/user/wishlist"
                className="flex items-center justify-center px-4 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg transition-all duration-300 ease-out hover:scale-105 hover:bg-primary/90 active:scale-95 shadow-md hover:shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Link>
              <Link
                to="/store/cart"
                className="flex items-center justify-center px-4 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg transition-all duration-300 ease-out hover:scale-105 hover:bg-primary/90 active:scale-95 shadow-md hover:shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart {totalItems > 0 && `(${totalItems})`}
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
