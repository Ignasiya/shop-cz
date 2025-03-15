import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true
      }
    ]
  },
  images: {
    domains: ['test2.sionic.ru']
  }
}

export default nextConfig
