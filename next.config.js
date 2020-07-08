const withPWA = require('next-pwa');

const nextConfig = {
  pwa: {
    swDest: 'static/service-worker.js',
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    sw: '/service-worker.js'
  },
};
module.exports = withPWA(nextConfig);
