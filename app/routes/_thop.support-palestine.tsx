import { useLoaderData } from "@remix-run/react";
import { Button } from "../components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../components/ui/pagination";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import { useState } from "react";
import { Link2, Youtube, Facebook, ExternalLink } from "lucide-react";

// Loader function to fetch social media data
export const loader = async () => {
  try {
    const response = await fetch(
      "https://data.palestinelove.org/api/v1/social-media"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch social media data");
    }
    let data = await response.json();

    // Normalize and trim the URLs
    data = data.map((item) => ({
      ...item,
      url: decodeURIComponent(item.url).replace(/\\\//g, "/").trim(),
    }));
    return data;
  } catch (error) {
    console.error("Error fetching social media data:", error);
    return [];
  }
};

export default function SupportPalestine() {
  const socialMedia = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40; // For an 8x5 grid

  // Calculate pagination details
  const totalItems = socialMedia.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = socialMedia.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Minimal pagination - show max 5 pages
  const getPaginationItems = () => {
    const items = [];

    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className={`font-playfair cursor-pointer transition-colors ${
                currentPage === i
                  ? "text-primary bg-spice-red/10 border-spice-red"
                  : "text-primary hover:text-spice-red/70 hover:bg-masala-brown/30"
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show condensed pagination for more than 5 pages
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      }
      // Adjust if we're near the end
      else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
        endPage = totalPages;
      }

      // Add ellipsis at start if needed
      if (startPage > 1) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              className="font-playfair cursor-pointer text-spice-red hover:text-spice-red/70 hover:bg-masala-brown/30"
            >
              1
            </PaginationLink>
          </PaginationItem>
        );

        if (startPage > 2) {
          items.push(
            <PaginationItem key="start-ellipsis">
              <PaginationEllipsis className="font-playfair text-spice-red" />
            </PaginationItem>
          );
        }
      }

      // Show main page range
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className={`font-playfair cursor-pointer transition-colors ${
                currentPage === i
                  ? "text-secondary bg-spice-red/10 border-spice-red"
                  : "text-spice-red hover:text-spice-red/70 hover:bg-masala-brown/30"
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Add ellipsis at end if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          items.push(
            <PaginationItem key="end-ellipsis">
              <PaginationEllipsis className="font-playfair text-spice-red" />
            </PaginationItem>
          );
        }

        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              className="font-playfair cursor-pointer text-spice-red hover:text-spice-red/70 hover:bg-masala-brown/30"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="relative bg-primary py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618218966643-3409508e7e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-secondary mb-4">
            Support Palestine
          </h1>
          <p className="text-lg md:text-xl text-secondary/80 max-w-3xl mx-auto font-playfair">
            Explore and engage with social media platforms and channels that
            amplify Palestinian voices and share their stories.
          </p>
        </div>
      </div>

      {/* Social Media Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:scale-105 p-4 flex flex-col items-center justify-center text-center"
                  >
                    <div className="mb-2">
                      {item.network === "youtube" ? (
                        <Youtube className="w-6 h-6 text-spice-red" />
                      ) : item.network === "facebook" ? (
                        <Facebook className="w-6 h-6 text-spice-red" />
                      ) : (
                        <ExternalLink className="w-6 h-6 text-spice-red" />
                      )}
                    </div>
                    <h3 className="font-playfair text-sm font-medium text-spice-red truncate w-full">
                      {item.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 mt-2 text-primary hover:text-primary/80" />
                  </a>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-card border-border rounded-lg shadow-lg p-4">
                  <div className="flex flex-col gap-2">
                    <h4 className="font-playfair text-base font-semibold text-spice-red">
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description ||
                        `Visit ${item.name} on ${
                          item.network.charAt(0).toUpperCase() +
                          item.network.slice(1)
                        } to support Palestinian voices.`}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1 truncate"
                      title={item.url} // Full URL on hover
                    >
                      <Link2 className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.url}</span>
                    </a>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))
          ) : (
            <p className="text-center text-muted-foreground col-span-full font-playfair">
              No social media data available at the moment.
            </p>
          )}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`font-playfair cursor-pointer transition-colors ${
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "text-spice-red hover:text-spice-red/70 hover:bg-masala-brown/30"
                    }`}
                  />
                </PaginationItem>
                {getPaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`font-playfair cursor-pointer transition-colors ${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "text-spice-red hover:text-spice-red/70 hover:bg-masala-brown/30"
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
