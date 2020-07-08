const withPWA = require('next-pwa');

const nextConfig = {
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
  },
};
module.exports = withPWA(nextConfig);
