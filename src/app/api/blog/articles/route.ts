import { NextRequest } from 'next/server';
import { BlogPost } from '@/types/BlogPosts';
import fs from 'fs';
import path from 'path';

// Google Cloud Storage bucket information
const bucketName = 'buteos-systems-res';
const articlesFolder = 'blogs/articles';
const bucketBaseUrl = `https://storage.googleapis.com/${bucketName}`;

// GET handler to fetch all articles or a specific article
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  
  try {
    if (id) {
      // Try to fetch from Google Cloud Storage first (works in both environments)
      // First try with the ID as a number
      let articleUrl = `${bucketBaseUrl}/${articlesFolder}/article-${id}.json`;
      let response = await fetch(articleUrl);
      
      // If that fails and the ID looks like a slug, try with the slug
      if (!response.ok && !/^\d+$/.test(id)) {
        articleUrl = `${bucketBaseUrl}/${articlesFolder}/article-${id}.json`;
        response = await fetch(articleUrl);
      }
      
      if (!response.ok) {
        // If not found in GCS, return a 404
        return new Response(JSON.stringify({ message: 'Article not found' }), { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const article = await response.json();
      return new Response(JSON.stringify(article), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Fetch list of all articles
      const listUrl = `${bucketBaseUrl}/${articlesFolder}/articles-list.json`;
      const response = await fetch(listUrl);
      
      if (!response.ok) {
        // Return sample data if articles list doesn't exist yet
        const sampleArticles = [
          {
            id: 1,
            title: 'The AI Awakening in Business: More Than Just Hype',
            excerpt: 'Leveraging AI to create more efficient processes, deliver superior customer experiences, and unlock unprecedented levels of innovation.',
            author: 'John Doe',
            date: 'May 17, 2025',
            image: 'https://images.unsplash.com/photo-1677442135136-760c813770c8',
            main_image: {
              file_url: 'https://images.unsplash.com/photo-1677442135136-760c813770c8',
              alt_text: 'AI concept image'
            },
            slug: 'ai-awakening-business'
          },
          {
            id: 2,
            title: 'Your New Superpowered Teammates: How AI Agents Are Revolutionizing Business Operations',
            excerpt: 'The AI Agents of 2025 are sophisticated, specialized, and ready to become your business\'s new superpowered teammates.',
            author: 'Jane Smith',
            date: 'May 24, 2025',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
            main_image: {
              file_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
              alt_text: 'AI agents concept'
            },
            slug: 'ai-agents-business-operations'
          },
          {
            id: 3,
            title: 'The Mobile-First Mandate: Why Your Business\'s Front Door Is Now in Their Pocket',
            excerpt: 'In 2025, a strong mobile presence isn\'t just a nice-to-have—it\'s a fundamental business imperative for customer acquisition and retention.',
            author: 'Alex Johnson',
            date: 'June 1, 2025',
            image: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c',
            main_image: {
              file_url: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c',
              alt_text: 'Mobile phone in hand'
            },
            slug: 'mobile-first-mandate'
          }
        ];
        return new Response(JSON.stringify(sampleArticles), { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const articles = await response.json();
      return new Response(JSON.stringify(articles), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Return sample data as fallback in case of error
    const fallbackArticles = [
      {
        id: 1,
        title: 'The AI Awakening in Business: More Than Just Hype',
        excerpt: 'Leveraging AI to create more efficient processes, deliver superior customer experiences, and unlock unprecedented levels of innovation.',
        author: 'John Doe',
        date: 'May 17, 2025',
        image: 'https://images.unsplash.com/photo-1677442135136-760c813770c8',
        main_image: {
          file_url: 'https://images.unsplash.com/photo-1677442135136-760c813770c8',
          alt_text: 'AI concept image'
        },
        slug: 'ai-awakening-business'
      }
    ];
    return new Response(JSON.stringify(fallbackArticles), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
