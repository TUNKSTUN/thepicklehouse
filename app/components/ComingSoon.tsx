import React, { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { Clock, Mail, Leaf, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "../hooks/use-toast";
import Monument from "../assets/monuments.png";

export const ComingSoonPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You'll be notified when our store launches.",
        variant: "default",
      });
      setEmail("");
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="relative min-h-screen bg-secondary/10 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <img
        src={Monument}
        alt="Monuments"
        className="inset-0 absolute w-full h-full overflow-clip object-cover opacity-25 -z-10"
      />
      {/* Header */}
      <motion.div
        className="bg-primary border-b text-primary-foreground border-border"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <a
              href="/"
              className="text-primary-foreground hover:text-secondary"
            >
              Home
            </a>
            <span>/</span>
            <span className=" font-medium">Coming Soon</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12">
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 bg-[hsl(25_35%_88%)] rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Clock className="w-12 h-12 text-[hsl(25_15%_45%)]" />
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-[hsl(25_25%_15%)] font-serif mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Our Online Store is Coming Soon!
          </motion.h1>
          <motion.p
            className="text-[hsl(25_15%_45%)] text-lg sm:text-xl max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Get ready to savor authentic pickles, chutneys, and preserves
            crafted with tradition and love. We're almost ready to spice up your
            pantry!
          </motion.p>

          {/* Notify Me Form */}
          <motion.div
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-[hsl(48_20%_98%)] border-[hsl(25_25%_85%)]">
              <CardContent className="p-6">
                <form onSubmit={handleNotify}>
                  <Label
                    htmlFor="email"
                    className="text-[hsl(25_25%_15%)] mb-2 block"
                  >
                    Be the first to know when we launch
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-[hsl(25_25%_85%)] bg-[hsl(25_25%_90%)] text-[hsl(25_25%_15%)] focus:primary"
                    />
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        type="submit"
                        className="bg-primary text-[hsl(48_25%_95%)] hover:bg-[hsl(25_45%_35%)]"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Notify Me
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                className="bg-primary text-[hsl(48_25%_95%)] hover:bg-[hsl(25_45%_35%)]"
                onClick={() => navigate("/about")}
              >
                Learn About Us
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                className="border-[hsl(25_25%_85%)] text-[hsl(25_25%_15%)] hover:bg-[hsl(25_35%_88%)]"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Teaser */}
      <motion.div
        className="bg-primary border-t border-border py-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="text-white text-xl mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Expect bold flavors and authentic recipes. Our pickles are crafted
            with care!
          </motion.p>
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="text-sm text-secondary">100% Vegetarian</span>
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 + 1 }}
                >
                  <Flame
                    className={`w-4 h-4 ${
                      i < 3
                        ? "text-[hsl(10_75%_60%)] fill-current"
                        : "text-[hsl(25_25%_85%)]"
                    }`}
                  />
                </motion.div>
              ))}
              <span className="text-sm text-secondary">Bold Spices</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
