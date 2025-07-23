import {
  Award,
  Users,
  Heart,
  Leaf,
  Clock,
  MapPin,
  Star,
  Sparkles,
  ChefHat,
  Globe,
} from "lucide-react";
import MockUp from "../assets/thop2.png"; // Placeholder image
import { motion } from "framer-motion";
import AuntyMasalaMaking from "../assets/aunty_masala_making2.png";
import AuntyClipArt from "../assets/20250719_1721_Grandmother's Pickle Preparation_simple_compose_01k0h872pafgrtv7560nvppzck.png";
import ProcessBackgroundImage from "../assets/home/process_background_image.png";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Made with Love",
      description:
        "Every jar is crafted with care, following traditional recipes passed down through generations.",
    },
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description:
        "We source the finest ingredients directly from local farmers, ensuring purity and freshness.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description:
        "Each batch undergoes rigorous quality checks to maintain our high standards of excellence.",
    },
    {
      icon: Users,
      title: "Family Legacy",
      description:
        "A family business that has been serving authentic flavors for over three decades.",
    },
  ];

  const timeline = [
    {
      year: "1985",
      title: "The Beginning",
      description:
        "Our journey began in a small kitchen in Old City Hyderabad, crafting pickles shared with neighbors and friends.",
    },
    {
      year: "1992",
      title: "Growing Demand",
      description:
        "Word spread across Hyderabad about the exceptional quality of our pickles. Local shops began requesting regular supplies.",
    },
    {
      year: "2000",
      title: "Official Launch",
      description:
        "The House of Pickles was established as a family business, moving to a dedicated facility while preserving traditional methods.",
    },
    {
      year: "2010",
      title: "Regional Expansion",
      description:
        "Our pickles reached neighboring states as demand grew. We maintained quality while scaling production using time-tested recipes.",
    },
    {
      year: "2018",
      title: "Digital Presence",
      description:
        "Launch of our online store, bringing authentic Hyderabadi flavors to customers across India and beyond.",
    },
    {
      year: "2023",
      title: "Today",
      description:
        "Proudly serving thousands of families while staying true to our roots, with the same passion and commitment to quality.",
    },
  ];

  const achievements = [
    {
      icon: Star,
      number: "500+",
      label: "Happy Customers in Hyderabad",
    },
    {
      icon: Globe,
      number: "1",
      label: "City We Proudly Serve",
    },
    {
      icon: Award,
      number: "20+",
      label: "Authentic Pickle Varieties",
    },
    {
      icon: Clock,
      number: "20+",
      label: "Years of Family Tradition",
    },
  ];

  const process = [
    {
      icon: Leaf,
      title: "Sourcing",
      description:
        "We carefully select the freshest vegetables and fruits from trusted local farmers who share our commitment to quality.",
    },
    {
      icon: ChefHat,
      title: "Preparation",
      description:
        "Each ingredient is meticulously cleaned, cut, and prepared according to time-honored techniques.",
    },
    {
      icon: Sparkles,
      title: "Spice Blending",
      description:
        "Our signature spice blends are prepared fresh daily, roasted to perfection, and combined in precise measurements.",
    },
    {
      icon: Heart,
      title: "Crafting",
      description:
        "Every batch is lovingly prepared by hand, ensuring each jar captures the authentic taste of traditional Hyderabadi pickles.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24  overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10 bg-white">
          <img
            src={AuntyMasalaMaking}
            alt="aunty-masala-making"
            className="w-full h-full object-cover opacity-50 blur-sm"
          />
        </div>

        {/* Foreground Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-secondary-foreground mb-6 animate-fade-up">
            Our <span className="text-primary">Story</span>
          </h1>
          <p
            className="text-xl text-masala-brown-muted italic leading-relaxed animate-fade-up max-w-3xl mx-auto"
            style={{ animationDelay: "0.2s" }}
          >
            Rooted in tradition, stirred with love — sharing Hyderabad’s
            enduring flavors, one handcrafted jar at a time.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h2 className="text-4xl font-playfair font-bold text-primary mb-6">
                From a Hyderabadi Kitchen to Your Table
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Our story began in the vibrant lanes of Old Hyderabad, where
                  the art of pickle-making was perfected in a modest kitchen.
                  The rhythmic chopping of fresh vegetables, the aromatic
                  roasting of spices, and the careful layering of ingredients
                  filled the air with irresistible scents.
                </p>
                <p>
                  What started as a way to preserve seasonal produce for a
                  family soon became a cherished tradition. The secret lay in
                  time-honored recipes and the dedication poured into every jar.
                  Neighbors were drawn by the tantalizing aromas, eager to taste
                  the legendary mango pickle or fiery mixed vegetable pickle.
                </p>
                <p>
                  By the early 1990s, word had spread beyond the neighborhood.
                  Local shopkeepers began requesting regular supplies, turning a
                  small-scale passion into a thriving word-of-mouth business.
                  Customers still share stories of traveling across the city to
                  secure a jar of our iconic pickles.
                </p>
                <p>
                  Four decades later, we continue this legacy in a modern
                  facility, using the same recipes preserved on yellowed paper.
                  We source ingredients from trusted farming families and
                  approach each jar with the same devotion that made our pickles
                  a household name in Hyderabad.
                </p>
              </div>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="bg-gradient-to-br from-turmeric/20 to-spice-red/20 rounded-2xl p-8 text-center">
                <img
                  src={AuntyClipArt}
                  alt="Traditional pickle preparation"
                  className="w-64 mx-auto h-64 object-cover  mb-6 "
                />
                <div className="text-6xl font-playfair font-bold text-primary mb-4">
                  38+
                </div>
                <div className="text-xl font-semibold text-foreground mb-2">
                  Years of Excellence
                </div>
                <div className="text-muted-foreground">
                  Serving authentic Hyderabadi flavors since 1985
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-16 lg:py-24 bg-muted/30">
        <img
          src={ProcessBackgroundImage}
          alt="Process Background"
          className="absolute overflow-clip inset-0 w-full h-full object-cover opacity-5 pointer-events-none z-0"
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-red-800/90 mb-4 animate-fade-up">
              Our Journey Through Time
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              From a small kitchen in Old City to kitchens across the
              country—here's how our story unfolded.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary/30"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

                {/* Image */}
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <motion.img
                    src={MockUp}
                    alt={item.title}
                    className={`w-full h-64 object-cover rounded-xl shadow-md bg-secondary ${
                      index % 2 === 0 ? "rotate-2" : "-rotate-2"
                    }`}
                    whileHover={{ rotate: 0, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-primary text-primary-foreground inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2">
                    {item.year}
                  </div>
                  <h3 className="font-playfair font-semibold text-xl text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 lg:py-24 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-4 animate-fade-up">
              Our Achievements
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Numbers that tell the story of trust, quality, and the love our
              customers have for our pickles.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.label}
                className="text-center animate-stagger"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/10 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <achievement.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-2">
                  {achievement.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      {/* <section className="py-16 lg:py-24 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-4 animate-fade-up">
              Our Traditional Process
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Every jar of our pickles goes through a meticulous process that
              honors traditional methods while ensuring the highest quality
              standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div
                key={step.title}
                className="text-center animate-stagger"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div className="bg-primary/10 rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-playfair font-semibold text-lg text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-4 animate-fade-up">
              Our Values
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              The principles that guide everything we do, from sourcing
              ingredients to delivering the final product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card border border-border rounded-lg p-6 animate-stagger hover:shadow-lg transition-all hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Quote Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-secondary/60 to-secondary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <div className="text-6xl text-primary mb-6 font-playfair">"</div>
            <blockquote className="text-2xl lg:text-3xl font-playfair text-foreground mb-6 italic">
              "A pickle is not just food—it is memory, tradition, and love
              preserved in a jar. When you taste our pickles, you taste the
              stories of generations."
            </blockquote>
            <div className="text-lg text-muted-foreground">
              — Our family's philosophy, carried forward through generations
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 animate-fade-up">
            Taste the Tradition
          </h2>
          <p
            className="text-xl mb-8 opacity-90 animate-fade-up max-w-3xl mx-auto"
            style={{ animationDelay: "0.2s" }}
          >
            Experience the authentic flavors that have been delighting families
            for generations. Join thousands of happy customers who have made our
            pickles a cherished part of their dining traditions.
          </p>
          <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <a
              href="/store/products"
              className="btn-secondary inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform"
            >
              Shop Our Collection
              <Sparkles className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
