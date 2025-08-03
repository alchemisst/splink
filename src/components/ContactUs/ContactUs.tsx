"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MessageCircle,
  User,
  MapPin,
  Phone,
  Clock,
  Heart,
} from "lucide-react";
import Image from "next/image";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);

    // You would typically show a success toast here
    alert("Message sent successfully!");
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@splink.com",
      description: "We'll respond within 24 hours",
      color: "from-blue-200 to-blue-300",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-6PM EST",
      color: "from-green-200 to-green-300",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "San Francisco, CA",
      description: "123 Tech Street, Suite 100",
      color: "from-purple-200 to-purple-300",
    },
    {
      icon: Clock,
      title: "Support Hours",
      content: "24/7 Available",
      description: "Round-the-clock assistance",
      color: "from-yellow-200 to-yellow-300",
    },
  ];

  return (
    <section className="py-20 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4 font-poppins">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Have questions about Splink? We&apos;d love to hear from you. Send
            us a message and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-12  bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_black]">
          {/* Contact Form */}
          <motion.div
            className=""
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-300 border-2 border-black rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black">
                  Send us a Message
                </h3>
                <p className="text-gray-700">
                  We&apos;ll get back to you within 24 hours
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-black mb-2">
                  <User className="inline w-5 h-5 mr-2" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full p-4 border-2 border-black rounded-xl shadow-[2px_3px_0px_black] focus:shadow-[3px_4px_0px_black] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200 outline-none bg-white text-black placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-black mb-2">
                  <Mail className="inline w-5 h-5 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full p-4 border-2 border-black rounded-xl shadow-[2px_3px_0px_black] focus:shadow-[3px_4px_0px_black] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200 outline-none bg-white text-black placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-black mb-2">
                  <MessageCircle className="inline w-5 h-5 mr-2" />
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  className="w-full p-4 border-2 border-black rounded-xl shadow-[2px_3px_0px_black] focus:shadow-[3px_4px_0px_black] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200 outline-none bg-white text-black placeholder:text-gray-500 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group w-full relative bg-green-300 hover:bg-green-400 border-2 border-black py-4 px-6 rounded-xl font-bold text-black shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 overflow-hidden"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                <div className="absolute inset-0 -z-10 bg-yellow-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
                <div className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </div>
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="mx-auto hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image src="/contact.jpg" height={500} width={450} alt="Contact" />
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-green-300 font-parkinsans border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_black]">
            <h1 className="flex justify-center transition-all duration-300 ease-in">
              Made with{" "}
              <span className="ml-1 transition-transform duration-100 ease-in hover:scale-120">
                <Heart fill="red" />
              </span>
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
