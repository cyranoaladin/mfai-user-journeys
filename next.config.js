/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Désactiver le mode strict pour éviter les problèmes d'initialisation des hooks
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Exclure les fichiers Storybook de la compilation
  webpack: (config, { isServer }) => {
    // Exclure les fichiers .stories.* et les dossiers stories
    config.module.rules.push({
      test: /\.(stories|story)\.[tj]sx?$/,
      loader: 'ignore-loader',
    });
    
    // Exclure le dossier src/stories
    if (isServer) {
      config.externals = [...config.externals, 'src/stories/**/*'];
    }
    
    return config;
  },
};

module.exports = nextConfig;
