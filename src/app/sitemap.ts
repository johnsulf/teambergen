import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://teambergen.no", lastModified: new Date() },
    { url: "https://teambergen.no/team", lastModified: new Date() },
    { url: "https://teambergen.no/om-oss", lastModified: new Date() },
    { url: "https://teambergen.no/kontakt", lastModified: new Date() },
  ];
}
