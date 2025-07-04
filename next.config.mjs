const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
    });
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["socket.io"],
  },
};

export default nextConfig;
