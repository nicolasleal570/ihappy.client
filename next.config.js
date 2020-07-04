const withPWA = require('next-pwa')

const nextConfig = {
    pwa: {
      dest: 'public'
    }
  }
module.exports = withPWA(nextConfig);