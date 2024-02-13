/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    legacyBrowsers: false,
    outputFileTracingExcludes: ['**canvas**']
  },
  webpack: (config) => {
    config.externals = [...config.externals, "canvas", "jsdom"]
    return config
  }
};

export default nextConfig;
