export const siteConfig = {
  name: "MapYourRoad",
  shortName: "MapYourRoad",
  description:
    "Build, explore, and track interactive learning roadmaps. Turn any subject into a living map of nodes and connections.",
  url: "https://mapyourroad.vercel.app",
} as const;

export type SiteConfig = typeof siteConfig;
