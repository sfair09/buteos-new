// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://buteossystems.com';
  
  // Get current date for lastModified
  const currentDate = new Date();
  
  // Define your routes with new structure
  const routes = [
    { path: '', priority: 1.0, changeFreq: 'weekly' as const },
    { path: '/web', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/agent', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/custom', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/soar-commerce', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/book', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/contact', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/about', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
  ];
  
  // Create sitemap entries
  return routes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }));
}