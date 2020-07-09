const withPWA = require('next-pwa');

const nextConfig = {
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    sw: '/sw.js'
  },
};
module.exports = withPWA(nextConfig);
