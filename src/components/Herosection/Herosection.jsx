"use client";

import React, { useState } from "react";
import { Parkinsans } from "next/font/google";
import LettersPullUp from "../Letters/LetterPullUp";
import { motion } from "framer-motion";

const parkinsans = Parkinsans({
  subsets: ["latin"],
  weight: "400",
});

const Herosection = () => {
  const [linkText, setLinkText] = useState("");
  const secondHeadingDelay = 2.1;

  const handleSplink = async () => {
    try {
      console.log(linkText);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={`mt-50 text-center ${parkinsans.className}`}>
      <div>
        <LettersPullUp />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: secondHeadingDelay, duration: 0.5 }}
          className=" mb-2"
        >
          <p>
            Fast, simple, and reliable URL shortening for all your sharing
            needs.
          </p>
          <div className="relative">
            <input
              type="text"
              name="link"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="https://splink.it/"
              className="w-full mt-4 p-2 py-3 pr-20 rounded-xl border border-white bg-green-200 focus:bg-white focus:outline-green-500"
              //         ^^ pr-20 to create space for button
            />
            <button
              onClick={handleSplink}
              className="absolute right-2 top-1/2 -translate-y-1/2 mt-2  bg-blue-500 text-white px-3 py-2 rounded-xl"
              //            ^ right-4 for spacing from right edge
            >
              Splink It
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Herosection;
