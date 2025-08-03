"use client";

import React, { useState } from "react";

import LettersPullUp from "../Letters/LetterPullUp";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

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
    <div className={`text-center m-10 font-parkinsans `}>
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
          <form onSubmit={handleSplink} className=" relative max-w-3xl mx-auto">
            <input
              type="text"
              name="link"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="https://splink.it/"
              className="w-full mt-4 px-2 py-2 md:px-4 md:py-4 border-4 focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200   shadow-[6px_6px_0px_0px_black]  border-white bg-[#b1eda7] focus:bg-white focus:outline-green-500"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <button className="transition-all duration-200 mt-2 bg-green-700 text-white px-1 py-1 md:px-3 md:py-2 shadow-[6px_6px_0px_0px_black] hover:shadow-none hover:translate-y-[6px]  hover:translate-x-[6px] hover:cursor-pointer">
                Splink It
              </button>
            </div>
          </form>
        </motion.div>

        {shortCode && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-xl mt-10 mb-4"> Your Splink URL</h1>
            <button
              className="bg-white p-2 mt-1 shadow-[6px_6px_0px_0px_black] px-4"
              onClick={() =>
                window.open(`https://splinky.vercel.app/${shortCode}`, "_blank")
              }
            >
              https://splinky.vercel.app/{shortCode}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Herosection;
