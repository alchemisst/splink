"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            className="flex items-center space-x-2 cursor-pointer"
            initial={{ scale: 1 }}
            animate={{
              scale: isScrolled ? 0.95 : 1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            onClick={() => router.push("/")}
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
              onClick={() => (window.location.href = "/login")}
              className="group relative border-2 border-black bg-green-300 px-6 py-2 rounded-xl shadow-[2px_3px_0px_black] hover:shadow-[3px_4px_0px_black] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 font-semibold text-black overflow-hidden"
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
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
            >
              <div className="absolute inset-0 -z-10 bg-yellow-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
              Login
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isMobileMenuOpen ? "auto" : 0,
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <div className="pt-4 pb-2 space-y-3 border-t-2 border-black mt-4">
              {["Home", "About", "Features", "Pricing"].map((item, index) => (
                <motion.a
                  key={item}
                  href="/"
                  className="block text-black hover:text-green-600 font-semibold py-2 px-2 rounded-lg hover:bg-green-100 transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{
                    x: isMobileMenuOpen ? 0 : -20,
                    opacity: isMobileMenuOpen ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                >
                  {item}
                </motion.a>
              ))}
              <div className="flex flex-col space-y-2 pt-2">
                <button className="group relative border-2 border-black bg-yellow-300 px-4 py-2 rounded-xl shadow-[2px_3px_0px_black] hover:shadow-[3px_4px_0px_black] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 font-semibold text-black overflow-hidden">
                  <div className="absolute inset-0 -z-10 bg-green-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
                  Join Waitlist
                </button>
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="group relative border-2 border-black bg-green-300 px-4 py-2 rounded-xl shadow-[2px_3px_0px_black] hover:shadow-[3px_4px_0px_black] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 font-semibold text-black overflow-hidden"
                >
                  <div className="absolute inset-0 -z-10 bg-yellow-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
                  Login
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Menu, X } from "lucide-react";

// export const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       setIsScrolled(scrollTop > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <motion.nav
//       className="fixed top-0 left-0 right-0 z-50"
//       initial={{
//         paddingTop: "1rem",
//         paddingBottom: "1rem",
//       }}
//       animate={{
//         paddingTop: isScrolled ? "0.75rem" : "1rem",
//         paddingBottom: isScrolled ? "0.75rem" : "1rem",
//       }}
//       transition={{
//         duration: 0.6,
//         ease: [0.25, 0.46, 0.45, 0.94],
//       }}
//     >
//       <motion.div
//         className="mx-auto px-6"
//         initial={{
//           maxWidth: "100%",
//           backgroundColor: "rgba(255, 251, 222, 0)",
//           backdropFilter: "blur(0px)",
//           borderRadius: "0px",
//           paddingLeft: "2rem",
//           paddingRight: "2rem",
//           paddingTop: "1rem",
//           paddingBottom: "1rem",
//           border: "2px solid transparent",
//         }}
//         animate={{
//           maxWidth: isScrolled ? "64rem" : "100%",
//           backgroundColor: isScrolled
//             ? "rgba(255, 251, 222, 0.95)"
//             : "rgba(255, 251, 222, 0)",
//           backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
//           borderRadius: isScrolled ? "24px" : "0px",
//           paddingLeft: isScrolled ? "1.5rem" : "2rem",
//           paddingRight: isScrolled ? "1.5rem" : "2rem",
//           paddingTop: isScrolled ? "0.75rem" : "1rem",
//           paddingBottom: isScrolled ? "0.75rem" : "1rem",
//           border: isScrolled ? "2px solid #000000" : "2px solid transparent",
//         }}
//         transition={{
//           duration: 0.6,
//           ease: [0.25, 0.46, 0.45, 0.94],
//         }}
//         style={{
//           boxShadow: isScrolled ? "4px 6px 0px rgba(0, 0, 0, 1)" : "none",
//         }}
//       >
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <motion.div
//             className="flex items-center space-x-3"
//             initial={{ scale: 1 }}
//             animate={{
//               scale: isScrolled ? 0.95 : 1,
//             }}
//             transition={{
//               duration: 0.4,
//               ease: "easeOut",
//             }}
//           >
//             <div className="w-10 h-10 bg-gradient-to-r from-yellow-300 to-green-300 rounded-full border-2 border-black flex items-center justify-center">
//               <span className="text-black font-bold text-lg">S</span>
//             </div>
//             <span className="text-2xl font-bold text-black font-poppins">
//               Splink
//             </span>
//           </motion.div>

//           {/* Navigation Links */}
//           <motion.div
//             className="hidden md:flex items-center"
//             initial={{ gap: "2rem" }}
//             animate={{
//               gap: isScrolled ? "1.5rem" : "2rem",
//             }}
//             transition={{
//               duration: 0.5,
//               ease: "easeOut",
//             }}
//           >
//             {["Home", "About", "Features", "Pricing"].map((item, index) => (
//               <motion.a
//                 key={item}
//                 href="#"
//                 className="text-black hover:text-green-600 font-semibold transition-colors relative"
//                 initial={{ fontSize: "1.125rem" }}
//                 animate={{
//                   fontSize: isScrolled ? "1rem" : "1.125rem",
//                 }}
//                 transition={{
//                   duration: 0.4,
//                   ease: "easeOut",
//                   delay: index * 0.05,
//                 }}
//                 whileHover={{
//                   scale: 1.05,
//                   transition: { duration: 0.2 },
//                 }}
//               >
//                 {item}
//                 <motion.div
//                   className="absolute -bottom-1 left-0 h-0.5 bg-green-400 border border-black"
//                   initial={{ width: 0 }}
//                   whileHover={{ width: "100%" }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </motion.a>
//             ))}
//           </motion.div>

//           {/* Action Buttons */}
//           <motion.div
//             className="hidden md:flex items-center"
//             initial={{ gap: "1rem" }}
//             animate={{
//               gap: isScrolled ? "0.75rem" : "1rem",
//             }}
//             transition={{
//               duration: 0.5,
//               ease: "easeOut",
//             }}
//           >
//             <motion.button
//               className="group relative border-2 border-black bg-yellow-300 px-4 py-2 rounded-xl shadow-[2px_3px_0px_black] hover:shadow-[3px_4px_0px_black] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 font-semibold text-black overflow-hidden"
//               initial={{
//                 fontSize: "1rem",
//                 paddingLeft: "1rem",
//                 paddingRight: "1rem",
//                 paddingTop: "0.5rem",
//                 paddingBottom: "0.5rem",
//               }}
//               animate={{
//                 fontSize: isScrolled ? "0.875rem" : "1rem",
//                 paddingLeft: isScrolled ? "0.75rem" : "1rem",
//                 paddingRight: isScrolled ? "0.75rem" : "1rem",
//                 paddingTop: isScrolled ? "0.5rem" : "0.5rem",
//                 paddingBottom: isScrolled ? "0.5rem" : "0.5rem",
//               }}
//               transition={{
//                 duration: 0.4,
//                 ease: "easeOut",
//               }}
//               whileHover={{
//                 scale: 1.02,
//                 transition: { duration: 0.2 },
//               }}
//               whileTap={{
//                 scale: 0.98,
//                 transition: { duration: 0.1 },
//               }}
//             >
//               <div className="absolute inset-0 -z-10 bg-green-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
//               Join Waitlist
//             </motion.button>

//             <motion.button
//               onClick={() => (window.location.href = "/login")}
//               className="group relative border-2 border-black bg-green-300 px-6 py-2 rounded-xl shadow-[2px_3px_0px_black] hover:shadow-[3px_4px_0px_black] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 font-semibold text-black overflow-hidden"
//               initial={{
//                 fontSize: "1rem",
//                 paddingLeft: "1.5rem",
//                 paddingRight: "1.5rem",
//                 paddingTop: "0.75rem",
//                 paddingBottom: "0.75rem",
//               }}
//               animate={{
//                 fontSize: isScrolled ? "0.875rem" : "1rem",
//                 paddingLeft: isScrolled ? "1rem" : "1.5rem",
//                 paddingRight: isScrolled ? "1rem" : "1.5rem",
//                 paddingTop: isScrolled ? "0.5rem" : "0.75rem",
//                 paddingBottom: isScrolled ? "0.5rem" : "0.75rem",
//               }}
//               transition={{
//                 duration: 0.4,
//                 ease: "easeOut",
//               }}
//               whileHover={{
//                 scale: 1.02,
//                 transition: { duration: 0.2 },
//               }}
//               whileTap={{
//                 scale: 0.98,
//                 transition: { duration: 0.1 },
//               }}
//             >
//               <div className="absolute inset-0 -z-10 bg-yellow-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
//               Login
//             </motion.button>
//           </motion.div>

//           {/* Mobile Menu Button */}
//           <motion.button
//             className="md:hidden p-2 border-2 border-black bg-yellow-300 rounded-lg shadow-[2px_3px_0px_black] hover:shadow-[3px_4px_0px_black] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             whileHover={{
//               scale: 1.05,
//               transition: { duration: 0.2 },
//             }}
//             whileTap={{
//               scale: 0.95,
//               transition: { duration: 0.1 },
//             }}
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6 text-black" />
//             ) : (
//               <Menu className="w-6 h-6 text-black" />
//             )}
//           </motion.button>
//         </div>

//         {/* Mobile Menu */}
//         <motion.div
//           className="md:hidden overflow-hidden"
//           initial={{ height: 0, opacity: 0 }}
//           animate={{
//             height: isMobileMenuOpen ? "auto" : 0,
//             opacity: isMobileMenuOpen ? 1 : 0,
//           }}
//           transition={{
//             duration: 0.3,
//             ease: "easeInOut",
//           }}
//         >
//           <div className="pt-4 pb-2 space-y-3 border-t-2 border-black mt-4">
//             {["Home", "About", "Features", "Pricing"].map((item, index) => (
//               <motion.a
//                 key={item}
//                 href="#"
//                 className="block text-black hover:text-green-600 font-semibold py-2 px-2 rounded-lg hover:bg-green-100 transition-colors"
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{
//                   x: isMobileMenuOpen ? 0 : -20,
//                   opacity: isMobileMenuOpen ? 1 : 0,
//                 }}
//                 transition={{
//                   duration: 0.3,
//                   delay: index * 0.1,
//                 }}
//               >
//                 {item}
//               </motion.a>
//             ))}
//             <div className="flex flex-col space-y-2 pt-2">
//               <button className="group relative border-2 border-black bg-yellow-300 px-4 py-2 rounded-xl shadow-[2px_3px_0px_black] hover:shadow-[3px_4px_0px_black] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 font-semibold text-black overflow-hidden">
//                 <div className="absolute inset-0 -z-10 bg-green-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
//                 Join Waitlist
//               </button>
//               <button
//                 onClick={() => (window.location.href = "/login")}
//                 className="group relative border-2 border-black bg-green-300 px-4 py-2 rounded-xl shadow-[2px_3px_0px_black] hover:shadow-[3px_4px_0px_black] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 font-semibold text-black overflow-hidden"
//               >
//                 <div className="absolute inset-0 -z-10 bg-yellow-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
//                 Login
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </motion.nav>
//   );
// };
