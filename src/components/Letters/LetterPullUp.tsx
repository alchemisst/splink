"use client";
import { motion, useInView } from "framer-motion";
import React from "react";

export default function LettersPullUp() {
  const splittedTextOne = "Shorten Your Links ,".split("");
  const splittedTextTwo = "Share ANYWHERE".split("");
  const secondHeadingDelay = "Shorten Your Links".length * 0.05 + 0.3;

  const pullupVariant = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };
  const secondPullupVariant = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 1.4 + i * 0.05, // delay start + per-letter delay
      },
    }),
  };

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <div className="flex justify-center">
        {splittedTextOne.map((current, i) => (
          <motion.div
            key={i}
            ref={ref}
            variants={pullupVariant}
            initial="initial"
            animate={isInView ? "animate" : ""}
            custom={i}
            className="text-4xl text-center sm:text-4xl mb-4 font-bold tracking-tighter md:text-7xl md:leading-[4rem]"
          >
            {current == " " ? <span>&nbsp;</span> : current}
          </motion.div>
        ))}
        <br />
      </div>

      <div className="flex justify-center">
        {splittedTextTwo.map((current, i) => (
          <motion.div
            key={i}
            variants={secondPullupVariant}
            transition={{ delay: secondHeadingDelay, duration: 0.5 }}
            initial="initial"
            animate={isInView ? "animate" : ""}
            custom={i}
            className="text-3xl text-center mb-4 sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]"
          >
            {current == " " ? <span>&nbsp;</span> : current}
          </motion.div>
        ))}
      </div>
    </>
  );
}
