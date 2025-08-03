"use client";

import Image from "next/image";
import Herosection from "../components/Herosection/Herosection";
import { Navbar } from "@/components/Navbar/Navbar";
import { AboutSection } from "@/components/AboutUs/AboutUs";
import { ContactSection } from "@/components/ContactUs/ContactUs";
import { PricingSection } from "@/components/Pricing/Pricing";
import { useEffect } from "react";

import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const element = document.getElementById(hash);
    if (element) {
      setTimeout(() => {
        const navBarHeight = 80; // 👈 Adjust based on your actual nav height
        const y =
          element.getBoundingClientRect().top +
          window.pageYOffset -
          navBarHeight;

        window.scrollTo({ top: y, behavior: "smooth" });
      }, 100);
    }
  }, [pathname]);
  return (
    <>
      <Navbar />
      <section id="home" className="pt-50">
        <Herosection />
      </section>
      <section id="aboutus" className="pt-10">
        <AboutSection />
      </section>
      <section id="pricing" className="pt-10">
        <PricingSection />
      </section>

      <ContactSection />
    </>
  );
}
