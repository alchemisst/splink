"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Globe, BarChart3, Clock, Users } from "lucide-react";

const stats = [
  { label: "Links Shortened", value: "10M+", icon: Globe },
  { label: "Response Time", value: "<50ms", icon: Zap },
  { label: "Uptime", value: "99.9%", icon: Shield },
  { label: "Active Users", value: "50K+", icon: Users },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Our global CDN ensures your links redirect in under 50ms worldwide",
    color: "from-yellow-200 to-yellow-300",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee",
    color: "from-green-200 to-green-300",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Track clicks, locations, devices, and more with real-time insights",
    color: "from-blue-200 to-blue-300",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Servers in 15+ countries for optimal performance everywhere",
    color: "from-purple-200 to-purple-300",
  },
];

const performanceData = [
  { region: "North America", responseTime: 45, color: "bg-green-400" },
  { region: "Europe", responseTime: 38, color: "bg-green-400" },
  { region: "Asia Pacific", responseTime: 52, color: "bg-yellow-400" },
  { region: "South America", responseTime: 48, color: "bg-green-400" },
  { region: "Africa", responseTime: 55, color: "bg-yellow-400" },
];

export const AboutSection = () => {
  return (
    <section className=" py-20 px-4 ">
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
            Why Choose Splink?
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We've built the fastest, most reliable URL shortener on the planet.
            Here's how we deliver lightning-fast redirects to millions of users
            worldwide.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="bg-white border-4 border-black rounded-2xl p-6 text-center shadow-[6px_6px_0px_black] hover:shadow-[8px_8px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-yellow-300 to-green-300 border-2 border-black rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <div className="text-3xl font-bold text-black mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Performance Chart */}
        <motion.div
          className="bg-white border-4 border-black rounded-2xl p-8 mb-16 shadow-[8px_8px_0px_black]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-300 to-purple-300 border-2 border-black rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black">
                Global Response Times
              </h3>
              <p className="text-gray-700">
                Average redirect speed across different regions
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {performanceData.map((region, index) => (
              <motion.div
                key={region.region}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-32 text-right font-semibold text-black">
                  {region.region}
                </div>
                <div className="flex-1 bg-gray-200 border-2 border-black rounded-full h-8 relative overflow-hidden">
                  <motion.div
                    className={`h-full ${region.color} border-r-2 border-black flex items-center justify-end pr-3`}
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${(region.responseTime / 60) * 100}%`,
                    }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-black font-bold text-sm">
                      {region.responseTime}ms
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-4 bg-green-100 border-2 border-black rounded-full px-6 py-3">
              <Zap className="w-5 h-5 text-black" />
              <span className="font-bold text-black">
                Average: 47ms globally
              </span>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className={`bg-gradient-to-br ${feature.color} border-4 border-black rounded-2xl p-8 shadow-[6px_6px_0px_black] hover:shadow-[8px_8px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-yellow-200 to-green-200 border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_black]">
            <h3 className="text-3xl font-bold text-black mb-4">
              Ready to Experience the Speed?
            </h3>
            <p className="text-xl text-gray-800 mb-6">
              Join thousands of users who trust Splink for their link shortening
              needs
            </p>
            <button className="group relative bg-green-300 hover:bg-green-400 border-2 border-black px-8 py-4 rounded-xl font-bold text-black shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 overflow-hidden">
              <div className="absolute inset-0 -z-10 bg-yellow-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
              Start Shortening Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
