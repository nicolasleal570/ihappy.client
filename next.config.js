const withPWA = require('next-pwa')

const nextConfig = {
    pwa: {
      disable: process.env.NODE_ENV === 'development',
      register: true,
      scope: '/app',
      sw: 'service-worker.js',
      dest: 'public'
    }
  }
module.exports = withPWA(nextConfig);