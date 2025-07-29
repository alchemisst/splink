"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Page() {
  const [isRegister, setIsRegister] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMode = () => {
    setIsRegister(!isRegister);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.password || !loginForm.username) {
      toast.error("Enter all the fields!");
      return;
    }

    try {
      const res = await fetch("api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(loginForm),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error);
      }

      toast.success(resData.message);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.username
    ) {
      toast.error("Enter all the fields!");
      return;
    }

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });

      const resData = await res.json();
      if (!res.ok) {
        console.log(resData);
        throw new Error(resData.error);
      }
      toast.success(resData.message);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleRegisterForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterForm((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  return (
    <div className="mt-20 sm:mt-40 h-full px-4 sm:px-0">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl max-w-4xl mx-auto bg-gradient-to-r from-[#fffbde] to-[#ffffff] overflow-hidden"
        layout
      >
        {/* Form Section */}
        <motion.div
          className="px-6 py-10 order-1"
          animate={{
            x: isRegister && !isMobile ? "100%" : "0%",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.6,
          }}
        >
          <AnimatePresence mode="wait">
            {!isRegister ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isMobile ? 0 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleLogin}>
                  <h1 className="text-2xl sm:text-3xl font-semibold font-poppins text-black">
                    Login Into Your Account
                  </h1>
                  <p className="text-sm sm:text-base">Welcome back!</p>

                  <div className="mt-8 sm:mt-10 space-y-2">
                    <label className="block ml-1 text-lg sm:text-xl font-medium text-black">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={loginForm.username}
                      onChange={handleLoginForm}
                      className="p-3 rounded-xl w-full bg-white border-2 border-black shadow-[2px_3px_0px_black] focus:bg-green-50 focus:shadow-[3px_4px_0px_black] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200 outline-none placeholder:text-gray-600 text-sm sm:text-base"
                    />
                  </div>

                  <div className="mt-4 sm:mt-6 space-y-2">
                    <label className="block ml-1 text-lg sm:text-xl font-medium text-black">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginForm}
                      className="p-3 rounded-xl w-full bg-white border-2 border-black shadow-[2px_3px_0px_black] focus:bg-green-50 focus:shadow-[3px_4px_0px_black] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200 outline-none placeholder:text-gray-600 text-sm sm:text-base"
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="group mt-8 sm:mt-10 relative z-10 flex items-center justify-between gap-2 border-2 border-black bg-yellow-300 px-4 py-2 shadow-[2px_4px_0px_black] transition-transform duration-250 ease-in-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_3px_0px_black] active:saturate-[0.75] overflow-hidden rounded-xl"
                    >
                      <div className="absolute inset-0 -z-10 bg-green-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
                      <div className="relative flex items-center justify-start overflow-hidden text-xl sm:text-2xl font-semibold">
                        <span className="translate-x-[-100%] transition-all duration-250 ease-in-out group-hover:translate-x-0">
                          Login
                        </span>
                        <span className="translate-x-[-100%] transition-all duration-250 ease-in-out group-hover:translate-x-0">
                          Login
                        </span>
                      </div>
                      <div className="relative z-10 me-4 rounded-full border-4 bg-green-300 border-black p-1 transition-transform duration-250 ease-in-out group-hover:translate-x-[5px] group-active:translate-x-[8px] overflow-hidden">
                        <div className="absolute inset-0 -z-10 rounded-full bg-yellow-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
                        <svg
                          width="20"
                          height="20"
                          className="sm:w-[25px] sm:h-[25px]"
                          viewBox="0 0 45 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M43.7678 20.7678C44.7441 19.7915 44.7441 18.2085 43.7678 17.2322L27.8579 1.32233C26.8816 0.34602 25.2986 0.34602 24.3223 1.32233C23.346 2.29864 23.346 3.88155 24.3223 4.85786L38.4645 19L24.3223 33.1421C23.346 34.1184 23.346 35.7014 24.3223 36.6777C25.2986 37.654 26.8816 37.654 27.8579 36.6777L43.7678 20.7678ZM0 21.5L42 21.5V16.5L0 16.5L0 21.5Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>

                  <div className="flex justify-center mt-4 sm:mt-6">
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-black hover:text-green-600 transition-colors duration-200 underline text-sm sm:text-base"
                    >
                      Don't have an account? Register here
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isMobile ? 0 : 20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleRegister}>
                  <h1 className="text-xl md:text-3xl font-semibold font-poppins text-black">
                    Create Your Account
                  </h1>
                  <p className="text-sm sm:text-base">Join us today!</p>

                  <div className="sm:mt-6 space-y-2">
                    <label className="block ml-1 text-lg sm:text-xl font-semibold text-black">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={handleRegisterForm}
                      value={registerForm.email}
                      className="p-3 rounded-xl w-full bg-white border-2 border-black shadow-[2px_3px_0px_black] focus:bg-green-50 focus:shadow-[3px_4px_0px_black] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200 outline-none placeholder:text-gray-600 text-sm sm:text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3  items-center justify-between  mt-6 mb-2 space-y-2">
                    <label className=" ml-1 text-lg sm:text-xl font-semibold  text-black">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={registerForm.username}
                      onChange={handleRegisterForm}
                      placeholder="Choose a username"
                      className="p-3 rounded-xl col-span-2 bg-white border-2 border-black shadow-[2px_3px_0px_black] focus:bg-green-50 focus:shadow-[3px_4px_0px_black] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200 outline-none placeholder:text-gray-600 text-sm sm:text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-between sm:mt-10 md:mt-4 space-y-2">
                    <label className=" ml-1  text-lg sm:text-xl font-semibold text-black">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={registerForm.password}
                      onChange={handleRegisterForm}
                      placeholder="Create a password"
                      className="p-3 rounded-xl col-span-2  bg-white border-2 border-black shadow-[2px_3px_0px_black] focus:bg-green-50 focus:shadow-[3px_4px_0px_black] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200 outline-none placeholder:text-gray-600 text-sm sm:text-base"
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="group mt-6 sm:mt-8 relative z-10 flex items-center justify-between gap-2 border-2 border-black bg-green-300 px-4 py-2 shadow-[2px_4px_0px_black] transition-transform duration-250 ease-in-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_3px_0px_black] active:saturate-[0.75] overflow-hidden rounded-xl"
                    >
                      <div className="absolute inset-0 -z-10 bg-yellow-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
                      <div className="relative flex items-center justify-start overflow-hidden text-xl sm:text-2xl font-semibold">
                        <span className="translate-x-[-100%] transition-all duration-250 ease-in-out group-hover:translate-x-0">
                          Register
                        </span>
                        <span className="translate-x-[-100%] transition-all duration-250 ease-in-out group-hover:translate-x-0">
                          Register
                        </span>
                      </div>
                      <div className="relative z-10 me-4 rounded-full border-4 bg-yellow-300 border-black p-1 transition-transform duration-250 ease-in-out group-hover:translate-x-[5px] group-active:translate-x-[8px] overflow-hidden">
                        <div className="absolute inset-0 -z-10 rounded-full bg-green-300 translate-x-[-100%] transition-transform duration-250 ease-in-out group-hover:translate-x-0"></div>
                        <svg
                          width="20"
                          height="20"
                          className="sm:w-[25px] sm:h-[25px]"
                          viewBox="0 0 45 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M43.7678 20.7678C44.7441 19.7915 44.7441 18.2085 43.7678 17.2322L27.8579 1.32233C26.8816 0.34602 25.2986 0.34602 24.3223 1.32233C23.346 2.29864 23.346 3.88155 24.3223 4.85786L38.4645 19L24.3223 33.1421C23.346 34.1184 23.346 35.7014 24.3223 36.6777C25.2986 37.654 26.8816 37.654 27.8579 36.6777L43.7678 20.7678ZM0 21.5L42 21.5V16.5L0 16.5L0 21.5Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>

                  <div className="flex justify-center  sm:mt-4">
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-black hover:text-green-600 transition-colors duration-200 underline text-sm sm:text-base"
                    >
                      Already have an account? Login here
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Image Section - Hidden on mobile */}
        <motion.div
          className="p-2 hidden sm:block order-2"
          animate={{
            x: isRegister && !isMobile ? "-100%" : "0%",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.6,
          }}
        >
          <Image
            className="border-0 rounded-2xl w-full h-auto "
            src={isRegister ? "/register.jpg" : "/login.jpg"}
            alt="login"
            width={500}
            height={100}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
