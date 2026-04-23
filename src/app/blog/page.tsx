// src/app/blog/page.tsx
import { Metadata } from 'next';
import BlogPageClient from './page.client';

export const metadata: Metadata = {
  title: 'Blog | Buteos Systems',
  description: 'Insights, tutorials, and updates from the Buteos Systems team on web development, mobile apps, and AI solutions.',
  openGraph: {
    title: 'Blog | Buteos Systems',
    description: 'Insights, tutorials, and updates from the Buteos Systems team on web development, mobile apps, and AI solutions.',
    url: '/blog',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
