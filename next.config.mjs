/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  devIndicators: false,
  sassOptions: {
    silenceDeprecations: ["import", "mixed-decls"],
  },
};

export default nextConfig;
