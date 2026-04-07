export type Project = {
  slug: string;
  title: string;
  tagline: string;           // one-line outcome statement
  description: string;
  tags: string[];
  image: string;             // /images/projects/[slug].png
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  // Case study fields
  problem: string;
  solution: string;
  result: string;            // quantified where possible
};
