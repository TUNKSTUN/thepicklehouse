import React from "react";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
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
import BackgroundImage from "../assets/aunty_masala_making.png";

// Utility to validate email format
const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const contactDetails = await ContactDetailsService.getContactDetails();
    console.log("Contact Details:", contactDetails); // Debug log
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
    if (!message || message.length < 10 || message.length > 500) {
      return json(
        {
          success: false,
          error: "Message must be between 10 and 500 characters",
        },
        { status: 400 }
      );
    }

    await ContactService.createContact(name, email, message);

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
      title: "Our Address",
      details: "Contact details not available",
      color: "text-spice-red",
      bgColor: "bg-spice-red/10",
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: "Contact details not available",
      href: null,
      color: "text-turmeric",
      bgColor: "bg-turmeric/10",
    },
    {
      icon: Mail,
      title: "Email",
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
          title: "Our Address",
          details: contactDetails.address || "Not provided",
          color: "text-spice-red",
          bgColor: "bg-spice-red/10",
        },
        {
          icon: Phone,
          title: "Phone Number",
          details: contactDetails.phone || "Not provided",
          href: contactDetails.phone ? `tel:${contactDetails.phone}` : null,
          color: "text-turmeric",
          bgColor: "bg-turmeric/10",
        },
        {
          icon: Mail,
          title: "Email",
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

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-secondary/20 to-turmeric/10">
        <img
          src={ProcessBackgroundImage}
          alt="Process Background"
          className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none z-0"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-turmeric/20 text-masala-brown text-sm font-medium rounded-full mb-4 animate-fade-up">
              Let's Connect
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-playfair font-bold text-foreground mb-8 animate-fade-up">
            Get in{" "}
            <span className="text-primary relative">
              Touch
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-turmeric via-spice-red to-terracotta opacity-60"></div>
            </span>
          </h1>
          <p
            className="text-xl lg:text-2xl text-muted-foreground italic leading-relaxed max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            We're here to answer your questions and share our love for authentic
            pickles with you. Every conversation is seasoned with care.
          </p>
        </div>
      </section>
      <div className=" h-full flex md:flex-row flex-col mx-auto  items-center justify-center gap-6 ">
        {/* Contact Information Section */}
        <section className="md:max-w-1/2 md:w-1/2 px-10 mx-auto py-20 lg:py-28 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 animate-fade-up">
                How to Reach Us
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-spice-red mx-auto mb-6"></div>
              <p
                className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                Multiple ways to connect with our pickle-loving family
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {contactInfo.map((info, index) => (
                <a
                  key={info.title}
                  href={info.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  <div
                    className="group bg-card border border-border hover:border-accent/50 rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-stagger"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-center">
                      <div
                        className={`${info.bgColor} rounded-2xl p-3 sm:p-4 inline-flex mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <info.icon
                          className={`w-6 h-6 sm:w-8 sm:h-8 ${info.color}`}
                        />
                      </div>
                      <h3 className="font-playfair font-semibold text-sm sm:text-base md:text-xl text-foreground mb-2 sm:mb-4">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <span
                          className="
    block
    max-w-xs
    truncate
    text-xs sm:text-sm md:text-base
    text-muted-foreground hover:text-primary
    transition-colors duration-300 font-medium
  "
                        >
                          {info.details}
                        </span>
                      ) : (
                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">
                          {info.details}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="w-full max-w-3xl lg:max-w-4xl px-4 sm:px-6 mx-auto py-16 sm:py-20 lg:py-28 bg-primary">
          <div className="px-0 sm:px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-primary-foreground mb-4 sm:mb-6 animate-fade-up">
                Send Us a Message
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-terracotta opacity-10 to-turmeric mx-auto mb-4 sm:mb-6"></div>
              <p
                className="text-base sm:text-lg text-primary-foreground max-w-xl sm:max-w-2xl mx-auto animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                Share your thoughts, questions, or pickle stories with us
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg">
              <Form method="post" className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your full name"
                      className="border-input focus:border-primary focus:ring-primary/20 rounded-xl h-12 px-4 text-sm sm:text-base"
                      required
                      minLength={2}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="border-input focus:border-primary focus:ring-primary/20 rounded-xl h-12 px-4 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Textarea
                    name="message"
                    id="message"
                    placeholder="Tell us what's on your mind..."
                    className="border-input focus:border-primary focus:ring-primary/20 rounded-xl p-4 text-sm sm:text-base min-h-[120px] sm:min-h-[140px] resize-none"
                    rows={6}
                    required
                    minLength={10}
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Please keep your message between 10-500 characters
                  </p>
                </div>

                {actionData && (
                  <div
                    className={`p-4 rounded-xl border text-sm font-medium ${
                      actionData.success
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    {actionData.message || actionData.error}
                  </div>
                )}

                <div className="text-center pt-2 sm:pt-4">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-primary to-spice-red hover:from-primary/90 hover:to-spice-red/90 text-primary-foreground px-8 sm:px-12 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Send Message
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3 sm:mt-4">
                    We typically respond within 24 hours
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </section>
      </div>

      {/* Additional CTA Section */}
      <section className="relative py-16 bg-secondary/10">
        <img
          src={BackgroundImage}
          alt="CTA background image"
          className="w-full h-full inset-0 object-cover absolute opacity-20 blur-sm z-0 pointer-events-none"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-foreground mb-4">
            Dive into Pickles
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our authentic pickle collection and bring home the flavors
            of heritage
          </p>
          <div className="flex flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-turmeric hover:bg-turmeric/90 text-masala-brown px-8 py-3 rounded-xl font-semibold"
            >
              <Link to="/pickles">Browse Products</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-xl font-semibold"
            >
              <Link to="/about">Learn Our Story</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
