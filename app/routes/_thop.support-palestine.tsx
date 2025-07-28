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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Link2,
  Youtube,
  Facebook,
  ExternalLink,
  Heart,
  BookOpen,
  Users,
  DollarSign,
  Globe,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

// Loader function to fetch all data
export const loader = async () => {
  try {
    // Fetch social media data
    const socialResponse = await fetch(
      "https://data.palestinelove.org/api/v1/social-media"
    );
    let socialData = [];
    if (socialResponse.ok) {
      socialData = await socialResponse.json();
      socialData = socialData.map((item) => ({
        ...item,
        url: decodeURIComponent(item.url).replace(/\\\//g, "/").trim(),
      }));
    }

    // Fetch donation organizations (using a mock API structure based on common humanitarian APIs)
    const donationData = [
      {
        id: 1,
        name: "Palestine Children's Relief Fund",
        description: "Providing medical care and humanitarian relief to children in Palestine and the Middle East",
        url: "https://pcrf1.app.neoncrm.com/forms/general-donation",
        country: "Palestine",
        category: "Medical Aid",
        verified: true
      },
      {
        id: 2,
        name: "Islamic Relief Palestine",
        description: "Emergency relief, education, and sustainable development programs in Palestine",
        url: "https://islamicrelief.org.uk/give/appeals/palestine-emergency-appeal/",
        country: "Palestine",
        category: "Emergency Relief",
        verified: true
      },
      {
        id: 3,
        name: "UNRWA",
        description: "UN agency providing assistance and protection to Palestine refugees",
        url: "https://www.unrwa.org/donate-now",
        country: "Palestine",
        category: "UN Aid",
        verified: true
      },
      {
        id: 4,
        name: "Sudan Relief Fund",
        description: "Emergency humanitarian assistance for displaced families in Sudan",
        url: "https://islamicrelief.org.uk/give/appeals/sudan-emergency-appeal/",
        country: "Sudan",
        category: "Emergency Relief",
        verified: true
      },
      {
        id: 5,
        name: "Syria Relief",
        description: "Medical aid and humanitarian support for Syrian refugees and families",
        url: "https://islamicrelief.org.uk/give/appeals/syria-emergency-appeal/",
        country: "Syria",
        category: "Refugee Aid",
        verified: true
      },
      {
        id: 6,
        name: "Doctors Without Borders - Syria",
        description: "Medical humanitarian aid in conflict zones including Syria",
        url: "https://www.msf.org/donate",
        country: "Syria",
        category: "Medical Aid",
        verified: true
      }
    ];
    // Educational resources about Palestine
    const educationalData = [
      {
        id: 1,
        title: "Decolonize Palestine",
        description: "Comprehensive resource debunking myths about Palestine with historical context",
        url: "https://decolonizepalestine.com/",
        category: "Historical Facts",
        type: "Website"
      },
      {
        id: 2,
        title: "Palestinian Academic Society for the Study of International Affairs",
        description: "Research and analysis on Palestinian affairs and Middle East politics",
        url: "https://www.passia.org/",
        category: "Academic Research",
        type: "Institution"
      },
      {
        id: 3,
        title: "Institute for Middle East Understanding",
        description: "Educational resources and briefings on Palestine and the Middle East",
        url: "https://imeu.org/",
        category: "Education",
        type: "Institute"
      },
      {
        id: 4,
        title: "Palestine Remix",
        description: "Interactive documentary exploring the history of Palestine",
        url: "https://www.aljazeera.com/investigations/palestineremix/",
        category: "Documentary",
        type: "Interactive Media"
      },
      {
        id: 5,
        title: "Palestinian Museum",
        description: "Digital collections and exhibitions on Palestinian history and culture",
        url: "https://www.palmuseum.org/",
        category: "Culture & History",
        type: "Museum"
      }
    ];

    return {
      socialMedia: socialData,
      donations: donationData,
      educational: educationalData
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      socialMedia: [],
      donations: [],
      educational: []
    };
  }
};

export default function SupportPalestine() {
  const { socialMedia, donations, educational } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 32; // For a more compact 8x4 grid

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const getPaginationItems = () => {
    const items = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className={`font-playfair cursor-pointer transition-colors ${currentPage === i
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
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
        endPage = totalPages;
      }

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

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className={`font-playfair cursor-pointer transition-colors ${currentPage === i
                ? "text-secondary bg-spice-red/10 border-spice-red"
                : "text-spice-red hover:text-spice-red/70 hover:bg-masala-brown/30"
                }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

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

  const getNetworkIcon = (network) => {
    switch (network.toLowerCase()) {
      case 'youtube':
        return <Youtube className="w-5 h-5 text-red-600" />;
      case 'facebook':
        return <Facebook className="w-5 h-5 text-blue-600" />;
      case 'twitter':
        return <Twitter className="w-5 h-5 text-blue-400" />;
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-600" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5 text-blue-700" />;
      default:
        return <ExternalLink className="w-5 h-5 text-spice-red" />;
    }
  };

  const getCountryFlag = (country) => {
    const flags = {
      'Palestine': '🇵🇸',
      'Sudan': '🇸🇩',
      'Syria': '🇸🇾'
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <motion.div
        className="relative bg-primary py-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618218966643-3409508e7e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-secondary mb-3">
            Support Palestine & Region
          </h1>
          <p className="text-base md:text-lg text-secondary/80 max-w-2xl mx-auto font-playfair">
            Unite for Palestine, Syria, and Sudan through donations, social engagement, and education.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* Section 1: Donations */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mb-3"
            >
              <Heart className="w-6 h-6 text-spice-red" />
              <h2 className="font-playfair text-2xl font-bold text-spice-red">
                Donate & Support
              </h2>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground font-playfair max-w-2xl mx-auto"
            >
              Support humanitarian organizations providing aid to Palestine, Syria, and Sudan.
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {donations.map((org) => (
              <motion.div key={org.id} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-spice-red">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="font-playfair text-base text-spice-red line-clamp-2 flex-1">
                        {org.name}
                      </CardTitle>
                      <span className="text-lg ml-2 flex-shrink-0">
                        {getCountryFlag(org.country)}
                      </span>
                    </div>
                    <CardDescription className="text-xs text-muted-foreground">
                      {org.category} • {org.country}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {org.description}
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-spice-red hover:bg-spice-red/90"
                    >
                      <a
                        href={org.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <DollarSign className="w-4 h-4" />
                        Donate Now
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Section 2: Social Media */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mb-3"
            >
              <Users className="w-6 h-6 text-spice-red" />
              <h2 className="font-playfair text-2xl font-bold text-spice-red">
                Social Channels
              </h2>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground font-playfair max-w-2xl mx-auto"
            >
              Follow and engage with social media channels amplifying Palestinian voices.
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3"
          >
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:scale-105 p-3 flex flex-col items-center justify-center text-center min-h-[100px]"
                      >
                        <div className="mb-2">
                          {getNetworkIcon(item.network)}
                        </div>
                        <h3 className="font-playfair text-xs font-medium text-spice-red truncate w-full">
                          {item.name}
                        </h3>
                      </a>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72 bg-card border-border rounded-lg shadow-lg p-3">
                      <div className="flex flex-col gap-2">
                        <h4 className="font-playfair text-sm font-semibold text-spice-red">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.description ||
                            `Visit ${item.name} on ${item.network.charAt(0).toUpperCase() +
                            item.network.slice(1)
                            } to support Palestinian voices.`}
                        </p>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1 truncate"
                          title={item.url}
                        >
                          <Link2 className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{item.url}</span>
                        </a>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </motion.div>
              ))
            ) : (
              <motion.p
                variants={itemVariants}
                className="text-center text-muted-foreground col-span-full font-playfair"
              >
                No social media data available at the moment.
              </motion.p>
            )}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div variants={itemVariants} className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={`font-playfair cursor-pointer transition-colors ${currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "text-spice-red hover:text-spice-red/70 hover:bg-masala-brown/30"
                        }`}
                    />
                  </PaginationItem>
                  {getPaginationItems()}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={`font-playfair cursor-pointer transition-colors ${currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "text-spice-red hover:text-spice-red/70 hover:bg-masala-brown/30"
                        }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          )}
        </motion.section>

        {/* Section 3: Educational Resources */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mb-3"
            >
              <BookOpen className="w-6 h-6 text-spice-red" />
              <h2 className="font-playfair text-2xl font-bold text-spice-red">
                Learn About Palestine
              </h2>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground font-playfair max-w-2xl mx-auto"
            >
              Educational resources to understand Palestinian history, culture, and current situation.
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {educational.map((resource) => (
              <motion.div key={resource.id} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-spice-red">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-playfair text-base text-spice-red line-clamp-2">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      {resource.category} • {resource.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {resource.description}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full border-spice-red text-spice-red hover:bg-spice-red hover:text-white"
                    >
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        Learn More
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}