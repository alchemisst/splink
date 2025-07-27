"use client";
import { motion } from "framer-motion";
import { Parkinsans } from "next/font/google";

const parkinsans = Parkinsans({
  subsets: ["latin"],
  weight: "400",
});
const text = "Oops, Page Not Found";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // time between letters
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: `0.25em` },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: { ease: "easeOut", duration: 0.3 },
  },
};

export default function Page() {
  return (
    <>
      <motion.div
        className="mt-52 text-center"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <h1 className={`text-7xl font-bold mb-4 ${parkinsans.className}`}>
          {text.split("").map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>
        <p className="text-xl text-gray-500 mb-4">
          Maybe the user has deleted the splink!
        </p>
        <a
          href="/"
          className="bg-green-500 text-center text-white px-4 py-2 rounded-xl "
        >
          Go Back
        </a>
      </motion.div>{" "}
    </>
  );
}
