/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add WASM support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Add rule for WASM files
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });

    // Add SVG support
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Externalize argon2 on the server
    if (isServer) {
      config.externals = [...(config.externals || []), '@node-rs/argon2'];
    }

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Additional safe configurations that won't conflict
  images: {
    domains: [], // Add your image domains if needed
    remotePatterns: [], // Add remote patterns if needed
  },
  typescript: {
    ignoreBuildErrors: false, // Enable type checking
  },
 /*  swcMinify: true, // Enable SWC minification */
};

export default nextConfig;