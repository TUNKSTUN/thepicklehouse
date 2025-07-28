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
import CornerDesign from "../assets/design-wooden-flowers-2.png";
import CornerDesign2 from "../assets/design-wooden-flowers.png";
import Charminar from "../assets/charminar.webp";
import OurAchievements from "../assets/our_acheivements_background.png"

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
      year: "2018",
      title: "Official Launch",
      description:
        "The House of Pickles was established as a family business, moving to a dedicated facility while preserving traditional methods.",
    },
    {
      year: "2022",
      title: "Digital Presence",
      description:
        "Launch of our online store, bringing authentic Hyderabadi flavors to customers across India and beyond.",
    },
    {
      year: "2025",
      title: "Today",
      description:
        "Launch of our online store, bringing authentic Hyderabadi flavors to customers across India and beyond. Proudly serving thousands of families while staying true to our roots, with the same passion and commitment to quality.",
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
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-secondary/20 to-turmeric/10 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-fixed bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${AuntyMasalaMaking})`,
            backgroundAttachment: "fixed",
            opacity: 0.15,
            transform: "translateZ(0)", // Ensures smooth rendering
          }}
        ></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 z-20">
            <span className="inline-block px-4 py-2 bg-turmeric/20 text-masala-brown text-sm font-medium rounded-full mb-4 animate-fade-up ">
              Our Journey
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-playfair font-bold text-foreground mb-8 animate-fade-up">
            Our{" "}
            <span className="text-primary relative">
              Story
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-turmeric via-spice-red to-terracotta opacity-60"></div>
            </span>
          </h1>
          <p
            className="text-xl lg:text-2xl text-muted-foreground italic leading-relaxed max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Rooted in tradition, stirred with love — sharing Hyderabad’s
            enduring flavors, one handcrafted jar at a time.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden bg-background border-primary border-x-8 border-t-8">
        {/* Top left corner design */}
        <div className="absolute top-0 left-0 w-60 h-60 lg:w-96 lg:h-96 z-10 opacity-10">
          <img
            src={CornerDesign}
            alt="Wooden corner design top left"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Bottom right corner design (inverted) */}
        <div className="absolute bottom-0 right-0 w-60 h-60 lg:w-96 lg:h-96 z-10 rotate-180 opacity-10">
          <img
            src={CornerDesign2}
            alt="Wooden corner design bottom right"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4  sm:px-6 lg:px-8 relative z-20">
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
                  15+
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
      <div className="bg-primary w-full h-2" />

      {/* Timeline Section */}
      <section className="relative py-16 lg:py-24 bg-muted/50  border-primary border-x-8">
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
                className={`relative flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
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
                  className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                >
                  <motion.img
                    src={MockUp}
                    alt={item.title}
                    className={`w-full h-64 object-cover rounded-xl shadow-md bg-secondary ${index % 2 === 0 ? "rotate-2" : "-rotate-2"
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
      <section className="relative py-16 lg:py-24 border-primary bg-primary border-x-8">
        <img
          src={OurAchievements}
          alt="Process Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20 bg-blend-multiply blur-sm pointer-events-none z-10"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-secondary mb-4 animate-fade-up">
              Our Achievements
            </h2>
            <p
              className="text-lg text-primary-foreground max-w-2xl mx-auto animate-fade-up"
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
                <div className="bg-secondary/10 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <achievement.icon className="w-8 h-8 text-secondary" />
                </div>
                <div className="text-3xl lg:text-4xl font-playfair font-bold text-secondary mb-2">
                  {achievement.number}
                </div>
                <div className="text-primary-foreground font-medium">
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
      <section className=" relative py-16 lg:py-24 bg-primary/10 border-primary border-x-8">


        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary mb-4 animate-fade-up">
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

      <div className="bg-primary w-full h-20" />
      {/* Legacy Quote Section */}
      <QuoteSection />
      <div className="bg-primary w-full h-20" />

      {/* CTA Section */}
      {/* <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
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
              href="/pickles"
              className="btn-secondary inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform"
            >
              Explore Our Collection
              <Sparkles className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
};




const QuoteSection = () => {
  // Animation variants for fade-in and slide-up
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-r from-secondary/70 to-primary/70 border-primary border-x-8 overflow-hidden">
      <img
        src={Charminar}
        alt="Charminar Background"
        className="absolute inset-0 w-full h-full object-cover opacity-15 bg-blend-overlay blur-sm pointer-events-none -z-10"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div variants={childVariants} className="text-5xl text-primary font-playfair">
            “
          </motion.div>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-playfair text-foreground italic leading-relaxed">
            <motion.p variants={childVariants} className="mb-6 font-noto-nastaliq">
              اچار صرف ذائقہ نہیں، یہ یادیں ہیں، روایت ہے اور محبت ہے جو ہر مرتبان میں سنبھالی گئی ہے۔ ہر لقمہ آپ کو نسلوں کی کہانی سناتا ہے۔
            </motion.p>
            <motion.p variants={childVariants}>
              A pickle is not just taste; it is memories, tradition, and love, preserved in every jar. Every bite tells the story of generations.
            </motion.p>
          </blockquote>
          <motion.div variants={childVariants} className="text-base sm:text-lg text-muted-foreground font-medium">
            <p>ہماری خاندانی سوچ، جو نسل در نسل آگے بڑھائی گئی ہے</p>
            <p>Our family's philosophy, carried forward through generations</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};



export default About;
