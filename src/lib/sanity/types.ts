import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface SocialLink {
  _key: string;
  platform: string;
  url: string;
}

export interface Project {
  _id: string;
  _type: "project";
  title: string;
  slug: { current: string };
  description?: string;
  image?: SanityImage;
  tags?: string[];
  url?: string;
  body?: PortableTextBlock[];
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  name: string;
  title: string;
  description?: string;
  socialLinks?: SocialLink[];
}
