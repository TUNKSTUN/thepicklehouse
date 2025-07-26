import React from "react";
import { Link } from "@remix-run/react";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import ProcessBackgroundImage from "../assets/home/process_background_image.png";
import BackgroundImage from "../assets/aunty_masala_making.png";

export default function FAQPage() {
  const faqs = [
    {
      question: "What makes The House of Pickles unique?",
      answer:
        "Our pickles are handcrafted using time-honored family recipes, blending fresh, high-quality ingredients with authentic spices. Each batch is made with care, free from artificial preservatives, to deliver bold, traditional flavors.",
    },
    {
      question: "Are your pickles suitable for dietary restrictions?",
      answer:
        "Many of our pickles are vegan and gluten-free. We provide detailed ingredient information for each product. For specific dietary needs or allergies, please reach out to us for assistance.",
    },
    {
      question: "How should I store my pickles?",
      answer:
        "Keep unopened jars in a cool, dry place away from direct sunlight. After opening, refrigerate and consume within 4-6 weeks for the best taste. Always use a clean spoon to maintain freshness.",
    },
    {
      question: "Do you have an online store?",
      answer:
        "We’re currently working on launching our online store to bring our pickles directly to you! In the meantime, you can find our products at select local markets and events. Follow our social media or contact us for updates on availability.",
    },
    {
      question: "Can I request custom or bulk orders?",
      answer:
        "Yes, we offer custom and bulk orders for events, gifts, or special occasions. Contact us to discuss your needs, and we’ll work with you to create a tailored pickle experience.",
    },
    {
      question: "What is your commitment to quality?",
      answer:
        "We’re passionate about delivering exceptional pickles. If you have any concerns about our products, please reach out, and we’ll address them promptly to ensure your satisfaction.",
    },
  ];

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
              Your Questions Answered
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-playfair font-bold text-foreground mb-8 animate-fade-up">
            Frequently Asked{" "}
            <span className="text-primary relative">
              Questions
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-turmeric via-spice-red to-terracotta opacity-60"></div>
            </span>
          </h1>
          <p
            className="text-xl lg:text-2xl text-muted-foreground italic leading-relaxed max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Learn more about our handcrafted pickles and the passion behind The
            House of Pickles.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-card/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 animate-fade-up">
            Common Queries
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-spice-red mx-auto mb-6"></div>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Find answers to your questions about our products and our
            pickle-making journey
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-2xl bg-card hover:bg-card/80 transition-all duration-300"
            >
              <AccordionTrigger className="font-playfair text-lg font-semibold text-foreground px-6 py-4 hover:text-spice-red">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-6 py-4 text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
