import type { Metadata } from "next";
import { Abril_Fatface, Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const abril = Abril_Fatface({
  weight: "400",
  variable: "--font-abril",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wood Interiors by John Flavin",
  description:
    "Custom fitted kitchens, wardrobes, living room units and more — handcrafted in Kerry, installed throughout Munster. Free consultation available.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${abril.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/logo/WIbJF_Logo_v3.png" type="image/png" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
