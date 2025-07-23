import React from "react";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import ProcessBackgroundImage from "../assets/home/process_background_image.png";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Address",
      details: "Sultan Street, Old City, Hyderabad, Telangana 500002, India",
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: "+91 123 456 7890",
      href: "tel:+911234567890",
    },
    {
      icon: Mail,
      title: "Email",
      details: "contact@houseofpickles.in",
      href: "mailto:contact@houseofpickles.in",
    },
    {
      icon: Instagram,
      title: "Follow Us",
      details: "@houseofpickles",
      href: "https://www.instagram.com/houseofpickles",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
        <img
          src={ProcessBackgroundImage}
          alt="Process Background"
          className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none z-0"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-foreground mb-6 animate-fade-up">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p
            className="text-xl text-muted-foreground italic leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            We're here to answer your questions and share our love for authentic
            pickles with you.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-6 text-center animate-fade-up">
            How to Reach Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="bg-card border border-border rounded-lg p-6 animate-stagger"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg text-foreground mb-2">
                      {info.title}
                    </h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.details}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
