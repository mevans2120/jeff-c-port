import { groq } from "next-sanity";

export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    image,
    tags,
    url
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    image,
    tags,
    url,
    body
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    name,
    title,
    description,
    socialLinks
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;
