// src/app/blog/[id]/page.tsx
import { Metadata } from 'next';
import BlogPostClient from './page.client';

// Define the params type
interface BlogPostParams {
  params: {
    id: string;
  };
}

// Function to fetch a single blog post
async function fetchBlogPost(id: string): Promise<any> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/articles?id=${id}`, 
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = await fetchBlogPost(params.id);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Buteos Systems',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | Buteos Systems Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.id}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: `/blog/${post.id}`,
    },
  };
}

// Server component that wraps the client component
export default function BlogPostPage() {
  return <BlogPostClient />;
}
