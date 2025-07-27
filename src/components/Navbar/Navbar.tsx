"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
      animate={{
        paddingTop: isScrolled ? "1rem" : "0.5rem",
        paddingBottom: isScrolled ? "1rem" : "0.5rem",
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="mx-auto px-6"
        initial={{
          maxWidth: "100%",
          backgroundColor: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(0px)",
          borderRadius: "0px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
        animate={{
          maxWidth: isScrolled ? "56rem" : "100%",
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(255, 255, 255, 0)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
          borderRadius: isScrolled ? "9999px" : "0px",
          paddingLeft: isScrolled ? "1.5rem" : "2rem",
          paddingRight: isScrolled ? "1.5rem" : "2rem",
          paddingTop: isScrolled ? "0.75rem" : "1rem",
          paddingBottom: isScrolled ? "0.75rem" : "1rem",
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          boxShadow: isScrolled
            ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            : "none",
          border: isScrolled
            ? "1px solid rgba(229, 231, 235, 0.5)"
            : "1px solid transparent",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ scale: 1 }}
            animate={{
              scale: isScrolled ? 0.95 : 1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <Image src="/image.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold text-gray-900">Splink</span>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="hidden md:flex items-center "
            initial={{ gap: "2rem" }}
            animate={{
              gap: isScrolled ? "1.5rem" : "2rem",
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            {["Home", "About", "Features", "Pricing"].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                initial={{ fontSize: "1rem" }}
                animate={{
                  fontSize: isScrolled ? "0.875rem" : "1rem",
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.05, // Stagger the animation slightly
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex items-center"
            initial={{ gap: "0.75rem" }}
            animate={{
              gap: isScrolled ? "0.5rem" : "0.75rem",
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <motion.button
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              initial={{
                fontSize: "1rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
              }}
              animate={{
                fontSize: isScrolled ? "0.875rem" : "1rem",
                paddingLeft: isScrolled ? "0.75rem" : "1rem",
                paddingRight: isScrolled ? "0.75rem" : "1rem",
                paddingTop: isScrolled ? "0.5rem" : "0.5rem",
                paddingBottom: isScrolled ? "0.5rem" : "0.5rem",
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              Join Waitlist
            </motion.button>

            <motion.button
              className="bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              initial={{
                fontSize: "1rem",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
              }}
              animate={{
                fontSize: isScrolled ? "0.875rem" : "1rem",
                paddingLeft: isScrolled ? "1rem" : "1.5rem",
                paddingRight: isScrolled ? "1rem" : "1.5rem",
                paddingTop: isScrolled ? "0.5rem" : "0.75rem",
                paddingBottom: isScrolled ? "0.5rem" : "0.75rem",
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#374151",
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              Contact Us
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.1 },
            }}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.div
                className="w-full h-0.5 bg-gray-700"
                animate={{
                  width: isScrolled ? "1.25rem" : "1.5rem",
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-full h-0.5 bg-gray-700"
                animate={{
                  width: isScrolled ? "1rem" : "1.5rem",
                }}
                transition={{ duration: 0.3, delay: 0.05 }}
              />
              <motion.div
                className="w-full h-0.5 bg-gray-700"
                animate={{
                  width: isScrolled ? "1.25rem" : "1.5rem",
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

// Demo page to test the navbar
// export default function NavbarDemo() {
//   return (
//     <div className="min-h-[200vh] bg-gradient-to-b from-gray-50 to-white">
//       <Navbar />

//       {/* Content to enable scrolling */}
//       <div className="pt-32 px-8">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold text-gray-900 mb-8">
//             Scroll to see the smooth navbar transition
//           </h1>

//           <div className="space-y-8">
//             {Array.from({ length: 10 }, (_, i) => (
//               <div key={i} className="bg-white p-8 rounded-lg shadow-sm border">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                   Section {i + 1}
//                 </h2>
//                 <p className="text-gray-600 leading-relaxed">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
//                   do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                   Ut enim ad minim veniam, quis nostrud exercitation ullamco
//                   laboris nisi ut aliquip ex ea commodo consequat. Duis aute
//                   irure dolor in reprehenderit in voluptate velit esse cillum
//                   dolore eu fugiat nulla pariatur.
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
