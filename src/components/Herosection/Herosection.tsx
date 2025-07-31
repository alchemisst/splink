"use client";

import React, { useState } from "react";
import { Parkinsans } from "next/font/google";
import LettersPullUp from "../Letters/LetterPullUp";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const parkinsans = Parkinsans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const Herosection = () => {
  const [linkText, setLinkText] = useState("");
  const [shortCode, setShortCode] = useState("");
  const secondHeadingDelay = 2.1;

  const handleSplink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkText) {
      toast.error("Enter the link first!");
      return;
    }
    try {
      const res = await fetch("api/splink", {
        method: "POST",
        body: JSON.stringify({ long_url: linkText }),
        headers: { "Content-Type": "application/json" },
      });

      const resData = await res.json();

      if (!res.ok) throw new Error(resData.error || "Error shortening URL");

      setShortCode(resData.short_code);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className={`mt-50 text-center m-10 ${parkinsans.className}  `}>
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
          <form
            onSubmit={handleSplink}
            className=" relative  max-w-3xl mx-auto"
          >
            <input
              type="text"
              name="link"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="https://splink.it/"
              className="w-full mt-4 px-4 py-3 border-4 rounded-3xl border-white bg-[#b1eda7] focus:bg-white focus:outline-green-500"
            />
            <button className="absolute hover:cursor-pointer right-2 top-1/2 -translate-y-1/2 mt-2 bg-green-700 text-white px-3 py-2 rounded-2xl">
              Splink It
            </button>
          </form>
        </motion.div>

        {shortCode && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-xl mt-4 mb-4"> Your Splink URL</h1>
            <a
              className="bg-white p-2 mt-4 rounded-2xl px-4"
              onClick={() =>
                window.open(`http://localhost:3000/${shortCode}`, "_blank")
              }
            >
              http://localhost:3000/{shortCode}
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Herosection;
