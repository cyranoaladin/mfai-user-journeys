/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.moneyfactory.ai']
  },
  i18n: {
    locales: ['en', 'fr', 'ar'],
    defaultLocale: 'en'
  }
};

export default nextConfig;
