/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/agenda',
  // Adicione esta configuração para ignorar erros de rotas dinâmicas
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Use isto para ignorar a rota problemática
  distDir: 'out',
  trailingSlash: true,
};

module.exports = nextConfig;