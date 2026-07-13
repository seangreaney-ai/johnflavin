import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/catalogue", "/showcase", "/account", "/selection", "/login", "/register"],
    },
    sitemap: "https://johnflavin.ie/sitemap.xml",
  };
}
