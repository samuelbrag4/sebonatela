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
  };
  
  export default nextConfig;