import Image from "next/image";
import Herosection from "../components/Herosection/Herosection";
import { Navbar } from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Herosection />
    </>
  );
}
