import React from "react";
import { MapPin, Phone, Mail, Instagram, Clock, Send } from "lucide-react";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import ProcessBackgroundImage from "../assets/home/process_background_image.png";
import type { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { ContactService } from "../services/contact.server";
import { ContactDetailsService } from "../services/contact-details.server";
import type { ContactDetails } from "../models/contact-details.model";
import BackgroundImage from "../assets/table_with_jars.jpg";

// Utility to validate email and phone format
const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);
const isValidPhone = (phone: string) => /^\+?[0-9]{7,15}$/.test(phone);

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const contactDetails = await ContactDetailsService.getContactDetails();
    return json({
      contactDetails,
    });
  } catch (error) {
    console.error("Error loading contact details:", error);
    return json({
      contactDetails: null,
    });
  }
};

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const title = formData.get("title")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    if (!name || name.length < 2 || name.length > 50) {
      return json(
        { success: false, error: "Name must be between 2 and 50 characters" },
        { status: 400 }
      );
    }
    if (!email || !isValidEmail(email)) {
      return json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }
    if (!phone || !isValidPhone(phone)) {
      return json(
        { success: false, error: "Valid phone number is required" },
        { status: 400 }
      );
    }
    if (!message || message.length < 10 || message.length > 500) {
      return json(
        {
          success: false,
          error: "Message must be between 10 and 500 characters",
        },
        { status: 400 }
      );
    }
    if (!title || title.length < 10 || title.length > 80) {
      return json(
        {
          success: false,
          error: "Title must be between 10 and 80 characters",
        },
        { status: 400 }
      );
    }

    await ContactService.createContact(name, email, phone, title, message);

    return json(
      { success: true, message: "Thank you! Your message has been sent." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return json(
      {
        success: false,
        error: "Failed to send your message. Please try again.",
      },
      { status: 500 }
    );
  }
}

type LoaderData = {
  contactDetails: ContactDetails | null;
};

export default function ContactPage() {
  const actionData = useActionData<typeof action>();
  const { contactDetails } = useLoaderData<LoaderData>();

  // Fallback contact details if none exist
  const fallbackContactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Contact details not available",
      color: "text-spice-red",
      bgColor: "bg-spice-red/10",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "Contact details not available",
      href: null,
      color: "text-turmeric",
      bgColor: "bg-turmeric/10",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "Contact details not available",
      href: null,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Instagram,
      title: "Follow Us",
      details: "Contact details not available",
      href: null,
      color: "text-terracotta",
      bgColor: "bg-terracotta/10",
    },
  ];

  const contactInfo = contactDetails
    ? [
        {
          icon: MapPin,
          title: "Visit Us",
          details: contactDetails.address || "Not provided",
          color: "text-spice-red",
          bgColor: "bg-spice-red/10",
        },
        {
          icon: Phone,
          title: "Call Us",
          details: contactDetails.phone || "Not provided",
          href: contactDetails.phone ? `tel:${contactDetails.phone}` : null,
          color: "text-turmeric",
          bgColor: "bg-turmeric/10",
        },
        {
          icon: Mail,
          title: "Email Us",
          details: contactDetails.email || "Not provided",
          href: contactDetails.email ? `mailto:${contactDetails.email}` : null,
          color: "text-primary",
          bgColor: "bg-primary/10",
        },
        {
          icon: Instagram,
          title: "Follow Us",
          details: "@the.houseofpickles",
          href: contactDetails.instagram || null,
          color: "text-terracotta",
          bgColor: "bg-terracotta/10",
        },
      ]
    : fallbackContactInfo;

  // Actual coordinates for The House of Pickles
  const mapCoordinates = {
    lat: 17.407889373082345,
    lng: 78.4083509445483,
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 bg-gradient-to-br from-background via-secondary/20 to-turmeric/10 overflow-hidden">
        <img
          src={ProcessBackgroundImage}
          alt="Process Background"
          className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none z-0"
        />
        
        {/* Floating elements for modern touch */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-turmeric/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-spice-red/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-turmeric/20 text-masala-brown text-sm font-medium rounded-full mb-6 animate-fade-up backdrop-blur-sm border border-turmeric/30">
              <Clock className="w-4 h-4" />
              Let's Connect
            </div>
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-foreground mb-4 animate-fade-up">
              Get in{" "}
              <span className="text-primary relative">
                Touch
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-turmeric via-spice-red to-terracotta opacity-60 rounded-full"></div>
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground italic leading-relaxed max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
              We're here to answer your questions and share our love for authentic pickles with you.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Column - Contact Info & Map */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Contact Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    className="group bg-card/80 backdrop-blur-sm border border-border/50 hover:border-accent/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-stagger"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {info.href ? (
                      <a href={info.href} className="block">
                        <ContactCard info={info} />
                      </a>
                    ) : (
                      <ContactCard info={info} />
                    )}
                  </div>
                ))}
              </div>

              {/* Compact Map */}
              <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg animate-fade-up">
                <div className="p-4 bg-gradient-to-r from-primary/5 to-spice-red/5 border-b border-border/50">
                  <h3 className="font-playfair font-semibold text-lg text-foreground flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-spice-red" />
                    Find Us
                  </h3>
                </div>
                <div className="relative h-48">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.0852700495457!2d78.40350717731084!3d17.407695040894804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb978a8ab454bf%3A0x436dbfc6414adcb4!2sThe%20House%20Of%20Pickles!5e0!3m2!1sen!2sin!4v1753732102930!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="The House of Pickles Location"
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  ></iframe>
                  <div className="absolute bottom-2 right-2">
                    <Button
                      asChild
                      size="sm"
                      className="bg-primary/90 backdrop-blur-sm text-primary-foreground hover:bg-primary text-xs"
                    >
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${mapCoordinates.lat},${mapCoordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3" />
                        View
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-6 lg:p-8 shadow-xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-3 animate-fade-up">
                    Send Us a Message
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-spice-red mx-auto mb-4 rounded-full"></div>
                  <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
                    Share your thoughts, questions, or pickle stories with us
                  </p>
                </div>

                <Form method="post" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your Name"
                        className="border-input/50 focus:border-primary focus:ring-primary/20 rounded-xl h-12 px-4 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-background/80"
                        required
                        minLength={2}
                        maxLength={50}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        className="border-input/50 focus:border-primary focus:ring-primary/20 rounded-xl h-12 px-4 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-background/80"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="Your Phone"
                        className="border-input/50 focus:border-primary focus:ring-primary/20 rounded-xl h-12 px-4 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-background/80"
                        required
                        minLength={8}
                        maxLength={15}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Message Subject"
                        required
                        minLength={10}
                        maxLength={100}
                        className="border-input/50 focus:border-primary focus:ring-primary/20 rounded-xl h-12 px-4 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-background/80"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      name="message"
                      id="message"
                      placeholder="Tell us what's on your mind..."
                      className="border-input/50 focus:border-primary focus:ring-primary/20 rounded-xl p-4 bg-background/50 backdrop-blur-sm min-h-[120px] resize-none transition-all duration-300 hover:bg-background/80"
                      rows={5}
                      required
                      minLength={10}
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground">
                      10-500 characters
                    </p>
                  </div>

                  {actionData && (
                    <div
                      className={`p-4 rounded-xl border text-sm font-medium animate-fade-up ${
                        actionData.success
                          ? "bg-green-50/80 backdrop-blur-sm border-green-200/50 text-green-800"
                          : "bg-red-50/80 backdrop-blur-sm border-red-200/50 text-red-800"
                      }`}
                    >
                      {actionData.message || actionData.error}
                    </div>
                  )}

                  <div className="text-center pt-2">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-primary to-spice-red hover:from-primary/90 hover:to-spice-red/90 text-primary-foreground px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
                    >
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </Button>
                    <p className="text-xs text-muted-foreground mt-3">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </Form>
              </div>
              {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4 p-6 bg-gradient-to-r from-primary/10 via-spice-red/10 to-terracotta/10 rounded-2xl backdrop-blur-sm border border-primary/20">
              <div className="text-left sm:text-center flex-1">
                <h3 className="text-lg font-playfair font-bold text-foreground mb-2">
                  Explore Our Pickle Collection
                </h3>
                <p className="text-sm text-muted-foreground">
                  Discover authentic flavors crafted with heritage recipes
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  asChild
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                >
                  <Link to="/pickles">Browse Products</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-xl"
                >
                  <Link to="/about">Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
            </div>
            
          </div>
          

          
        </div>
      </section>
    </main>
  );
}

// Contact Card Component
function ContactCard({ info }: { info: any }) {
  return (
    <div className="text-center">
      <div
        className={`${info.bgColor} rounded-xl p-3 inline-flex mb-3 group-hover:scale-110 transition-transform duration-300`}
      >
        <info.icon className={`w-5 h-5 ${info.color}`} />
      </div>
      <h3 className="font-playfair font-semibold text-sm text-foreground mb-1">
        {info.title}
      </h3>
      <p className="text-xs text-muted-foreground font-medium leading-tight">
        {info.details}
      </p>
    </div>
  );
}