/** @type {import('next').NextConfig} */
const nextConfig = {
//   experimental : {
//  serverActions : true
//   },
  // images: {
  //   domains: ["avatars.githubusercontent.com","lh3.googleusercontent.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
