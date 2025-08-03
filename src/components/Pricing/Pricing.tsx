"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Zap, Crown, Building2 } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    icon: Zap,
    color: "from-yellow-200 to-yellow-300",
    borderColor: "border-yellow-400",
    buttonColor: "bg-yellow-300 hover:bg-yellow-400",
    features: [
      { name: "100 links per month", included: true },
      { name: "Basic analytics", included: true },
      { name: "Custom short codes", included: false },
      { name: "API access", included: false },
      { name: "Team collaboration", included: false },
      { name: "Priority support", included: false },
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For professionals and growing businesses",
    icon: Crown,
    color: "from-green-200 to-green-300",
    borderColor: "border-green-400",
    buttonColor: "bg-green-300 hover:bg-green-400",
    features: [
      { name: "10,000 links per month", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom short codes", included: true },
      { name: "API access", included: true },
      { name: "Team collaboration", included: false },
      { name: "Priority support", included: true },
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "per month",
    description: "For large teams and organizations",
    icon: Building2,
    color: "from-purple-200 to-purple-300",
    borderColor: "border-purple-400",
    buttonColor: "bg-purple-300 hover:bg-purple-400",
    features: [
      { name: "Unlimited links", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom short codes", included: true },
      { name: "API access", included: true },
      { name: "Team collaboration", included: true },
      { name: "Priority support", included: true },
    ],
    popular: false,
  },
];

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

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
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Choose the perfect plan for your link shortening needs
          </p>

          {/* Billing Toggle */}
          <div className="flex flex-col md:flex-row  justify-center gap-4 items-center mb-8 mx-auto">
            <span
              className={`font-semibold ${
                !isAnnual ? "text-black" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <motion.button
              className="relative w-16 h-8  bg-gray-300 rounded-full border-2 border-black shadow-[2px_2px_0px_black] focus:outline-none"
              onClick={() => setIsAnnual(!isAnnual)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-0.5 ml-1 w-6 h-6 bg-green-300 rounded-full border border-black"
                animate={{
                  x: isAnnual ? "100%" : "0%",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span
              className={`font-semibold ${
                isAnnual ? "text-black" : "text-gray-500"
              }`}
            >
              Annual
              <span className="ml-2 text-sm bg-green-300 px-2 py-1 rounded-full border border-black">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const annualPrice =
              plan.name === "Free"
                ? "$0"
                : `$${Math.floor(
                    Number.parseInt(plan.price.slice(1)) * 12 * 0.8
                  )}`;

            return (
              <motion.div
                key={plan.name}
                className={`relative bg-gradient-to-br ${plan.color} border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_black] hover:shadow-[12px_12px_0px_black] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-red-400 text-black px-4 py-2 rounded-full border-2 border-black font-bold text-sm shadow-[2px_2px_0px_black]">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white border-2 border-black rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-700 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-black">
                      {isAnnual && plan.name !== "Free"
                        ? annualPrice
                        : plan.price}
                    </span>
                    <span className="text-gray-700 ml-2">
                      {isAnnual && plan.name !== "Free"
                        ? "per year"
                        : plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="w-6 h-6 bg-green-400 border-2 border-black rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-black" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-300 border-2 border-black rounded-full flex items-center justify-center">
                          <X className="w-4 h-4 text-black" />
                        </div>
                      )}
                      <span
                        className={`font-medium ${
                          feature.included ? "text-black" : "text-gray-500"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full ${plan.buttonColor} border-2 border-black py-4 px-6 rounded-xl font-bold text-black shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200`}
                >
                  {plan.name === "Free" ? "Get Started" : "Choose Plan"}
                </button>
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
          <p className="text-lg text-gray-700 mb-4">
            Need a custom solution? We&apos;ve got you covered.
          </p>
          <button className="group relative bg-blue-300 hover:bg-blue-400 border-2 border-black px-8 py-3 rounded-xl font-bold text-black shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-yellow-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
            Contact Sales
          </button>
        </motion.div>
      </div>
    </section>
  );
};
