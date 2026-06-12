export const siteConfig = {
  name: 'TheSiniySky',
  description: 'Premium SaaS Platform for Project Management and Client Services',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/thesiniysky',
    github: 'https://github.com/thesiniysky',
  },
};

export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://thesiniysky-backend.onrender.com/api/v1',
  socketURL: process.env.NEXT_PUBLIC_SOCKET_URL || 'https://thesiniysky-backend.onrender.com',
};
