/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  sassOptions: {
    silenceDeprecations: ["import", "mixed-decls"],
  },
};

export default nextConfig;
