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

export default function SupportPage() {
  const supportTopics = [
    {
      question: "How can I get in touch for support?",
      answer:
        "You can reach us through our contact page to discuss any questions or concerns about our pickles. We’re available via email or phone and aim to respond within 24 hours.",
    },
    {
      question: "What should I do if I have an issue with my purchase?",
      answer:
        "If you purchased our pickles at a local market or event and have concerns about quality or freshness, please contact us with details of your purchase. We’ll work with you to address the issue promptly.",
    },
    {
      question: "Can you help with custom order requests?",
      answer:
        "Yes, we offer custom and bulk orders for events or special occasions. Visit our contact page to share your requirements, and we’ll help create a personalized pickle experience.",
    },
    {
      question: "Are there any upcoming events where I can find your products?",
      answer:
        "We regularly participate in local markets and events. Follow our social media or check our website for the latest schedule of where you can find The House of Pickles.",
    },
    {
      question:
        "Do you offer guidance on pickle pairing or serving suggestions?",
      answer:
        "Absolutely! Our team loves sharing tips on how to enjoy our pickles. Contact us for pairing ideas or check our social media for recipes and serving suggestions.",
    },
    {
      question: "When will your online store be available?",
      answer:
        "We’re hard at work developing our online store to make our pickles more accessible. Stay tuned for updates on our website or social media for the launch announcement!",
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
              We're Here to Help
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-playfair font-bold text-foreground mb-8 animate-fade-up">
            Customer{" "}
            <span className="text-primary relative">
              Support
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-turmeric via-spice-red to-terracotta opacity-60"></div>
            </span>
          </h1>
          <p
            className="text-xl lg:text-2xl text-muted-foreground italic leading-relaxed max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Have questions about our pickles or need assistance? We’re here to
            ensure your experience with The House of Pickles is delightful.
          </p>
        </div>
      </section>

      {/* Support Topics Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-card/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 animate-fade-up">
            Support Topics
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-spice-red mx-auto mb-6"></div>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Find answers to common questions or reach out for personalized
            support
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {supportTopics.map((topic, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-2xl bg-card hover:bg-card/80 transition-all duration-300"
            >
              <AccordionTrigger className="font-playfair text-lg font-semibold text-foreground px-6 py-4 hover:text-spice-red">
                {topic.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-6 py-4 text-base">
                {topic.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
