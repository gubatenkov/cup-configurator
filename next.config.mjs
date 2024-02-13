/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    outputFileTracingExcludes: {
      'canvas': ['**canvas**']
    }
  },
  webpack: (config) => {
    config.externals = [...config.externals, "canvas", "jsdom"]
    return config
  }
};

export default nextConfig;
