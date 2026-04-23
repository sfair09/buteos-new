import { NextRequest } from 'next/server';

// Google Cloud Storage bucket information
const bucketName = 'buteos-res';
const commentsFolder = 'blogs/comments';
const bucketBaseUrl = `https://storage.googleapis.com/${bucketName}`;

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  content: string;
  date: string;
}

// GET handler to fetch comments for a specific article
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const postId = url.searchParams.get('postId');
  
  if (!postId) {
    return new Response(JSON.stringify({ message: 'Post ID is required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const commentsUrl = `${bucketBaseUrl}/${commentsFolder}/comments-${postId}.json`;
    const response = await fetch(commentsUrl);
    
    if (!response.ok) {
      // Return empty array if comments file doesn't exist yet
      return new Response(JSON.stringify([]), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const comments = await response.json();
    return new Response(JSON.stringify(comments), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new Response(JSON.stringify({ message: 'Error fetching comments' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// POST handler to add a new comment
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { postId, name, email, content } = body;
  
  if (!postId || !name || !email || !content) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // First, fetch existing comments
    const commentsUrl = `${bucketBaseUrl}/${commentsFolder}/comments-${postId}.json`;
    let comments: Comment[] = [];
    
    try {
      const response = await fetch(commentsUrl);
      if (response.ok) {
        comments = await response.json();
      }
    } catch (error) {
      // If file doesn't exist yet, we'll create it with the new comment
    }
    
    // Create new comment
    const newComment: Comment = {
      id: comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1,
      postId: Number(postId),
      name,
      email,
      content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    // Add new comment to array
    comments.push(newComment);
    
    // Upload updated comments to Google Cloud Storage
    const uploadUrl = `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${encodeURIComponent(`${commentsFolder}/comments-${postId}.json`)}`;
    
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comments)
    });
    
    if (!uploadResponse.ok) {
      throw new Error('Failed to upload comments');
    }
    
    return new Response(JSON.stringify(newComment), { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return new Response(JSON.stringify({ message: 'Error adding comment' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}