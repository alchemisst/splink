import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  DM_Sans,
  Poppins,
  Parkinsans,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "700"], // optional: specify font weights you want
});

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Splinky :)",
  description: "The place to shorten your links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${parkinsans.variable} ${poppins.variable} ${geistMono.variable} ${dmSans.variable} antialiased`}
      >
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 4000,
            style: {
              background: "#fffbde",
              color: "#000",
              border: "2px solid #000",
              borderRadius: "16px",
              boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
              padding: "16px",
              fontSize: "16px",
              fontWeight: "600",
              fontFamily: "inherit",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              style: {
                background: "linear-gradient(135deg, #d4f8d4 0%, #a7f3d0 100%)",
                color: "#000",
                border: "2px solid #000",
                borderRadius: "16px",
                boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
              },
              iconTheme: {
                primary: "#000",
                secondary: "#a7f3d0",
              },
            },
            error: {
              duration: 4000,
              style: {
                background: "linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)",
                color: "#000",
                border: "2px solid #000",
                borderRadius: "16px",
                boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
              },
              iconTheme: {
                primary: "#000",
                secondary: "#fca5a5",
              },
            },
            loading: {
              style: {
                background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                color: "#000",
                border: "2px solid #000",
                borderRadius: "16px",
                boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
              },
            },
          }}
        />

        {/* <div className="flex justify-center">
          <div className="max-w-7xl"> */}
        {children}
        {/* </div>
        </div> */}
      </body>
    </html>
  );
}
