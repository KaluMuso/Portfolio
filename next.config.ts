import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
// Set to your repo name if deploying to https://<user>.github.io/<repo>
// Leave empty if deploying to https://<user>.github.io (username repo)
const repoName = process.env.REPO_NAME ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(isGithubPages && repoName
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
