const withPWA = require('next-pwa');

const nextConfig = {
  pwa: {
    scope: '/',
    dest: 'public',
  },
};
module.exports = withPWA(nextConfig);
