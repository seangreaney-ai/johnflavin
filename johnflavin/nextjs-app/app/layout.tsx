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
  title: {
    default: "Wood Interiors by John Flavin | Fitted Kitchens & Furniture, Kerry",
    template: "%s | Wood Interiors by John Flavin",
  },
  description:
    "Custom fitted kitchens, wardrobes, living room units, utility rooms and more — handcrafted in Duagh, Co. Kerry and installed throughout Munster. Contact John for a free consultation.",
  metadataBase: new URL("https://johnflavin.ie"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://johnflavin.ie",
    siteName: "Wood Interiors by John Flavin",
    title: "Wood Interiors by John Flavin | Fitted Kitchens & Furniture, Kerry",
    description:
      "Custom fitted kitchens, wardrobes, living room units and more — handcrafted in Co. Kerry, installed throughout Munster.",
    images: [{ url: "/images/work1/shaker-kitchen-01.jpg", width: 1600, height: 1067, alt: "Fitted kitchen by John Flavin" }],
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wood Interiors by John Flavin",
    description: "Custom fitted kitchens, wardrobes and living room furniture — handcrafted in Co. Kerry.",
    images: ["/images/work1/shaker-kitchen-01.jpg"],
  },
  robots: { index: true, follow: true },
  keywords: ["fitted kitchens Kerry", "fitted wardrobes Kerry", "kitchen fitters Munster", "bespoke furniture Kerry", "wood interiors Kerry", "John Flavin furniture"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Wood Interiors by John Flavin",
              description: "Custom fitted kitchens, wardrobes, living room units, utility rooms and bespoke furniture — handcrafted in Co. Kerry and installed throughout Munster.",
              url: "https://johnflavin.ie",
              telephone: "+353870632065",
              email: "info@johnflavin.ie",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Duagh",
                addressRegion: "Co. Kerry",
                addressCountry: "IE",
              },
              areaServed: [
                { "@type": "AdministrativeArea", name: "Kerry" },
                { "@type": "AdministrativeArea", name: "Limerick" },
                { "@type": "AdministrativeArea", name: "Cork" },
                { "@type": "AdministrativeArea", name: "Munster" },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Fitted Furniture Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fitted Kitchens" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fitted Wardrobes" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Living Room Units" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Utility Rooms" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bathroom Furniture" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sliding Wardrobes" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wall Panelling" } },
                ],
              },
              image: "https://johnflavin.ie/images/work1/shaker-kitchen-01.jpg",
            }),
          }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
