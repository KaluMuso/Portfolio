export type ProjectStatus = "active" | "upcoming" | "saas";
export type ProjectCategory = "Web Apps" | "Automation" | "E-commerce" | "SaaS";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: ProjectStatus;
  category: ProjectCategory;
  // Case study fields
  problem: string;
  solution: string;
  result: string;
};
