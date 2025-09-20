/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'books.google.com',
          pathname: '/**', // Permite todas as rotas do domínio
        },
      ],
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
        };
      }
      
      // Resolver conflitos de case-sensitivity
      config.resolve.cacheWithContext = false;
      
      return config;
    }
  };
  
  export default nextConfig;