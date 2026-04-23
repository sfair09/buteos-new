// src/app/blog/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPost, Comment, MainImage, ArticleBlock } from '@/types/BlogPosts';
import '../blog.css';

export default function BlogPostClient() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch the blog post and comments
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch the article
        const articleResponse = await fetch(`/api/blog/articles?id=${postId}`);
        if (!articleResponse.ok) {
          throw new Error('Failed to fetch article');
        }
        const articleData = await articleResponse.json();
        
        // Update URL to use slug for SEO
        if (articleData.slug && window.history) {
          const newUrl = `/blog/${articleData.slug}`;
          window.history.replaceState(null, '', newUrl);
        }
        
        setPost(articleData);
        
        // Fetch comments
        const commentsResponse = await fetch(`/api/blog/comments?postId=${postId}`);
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
        }
      } catch (err) {
        setError('Failed to load article. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    if (postId) {
      fetchData();
    }
  }, [postId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post.id,
          name: newComment.name,
          email: newComment.email,
          content: newComment.content
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      
      const newCommentData = await response.json();
      
      // Update local comments state
      setComments([...comments, newCommentData]);
      setNewComment({ name: '', email: '', content: '' });
    } catch (err) {
      setError('Failed to submit your comment. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = (platform: string) => {
    if (typeof window === 'undefined' || !post) return;
    
    const title = post.title;
    const url = window.location.href;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
  };

  // Render a block based on its type
  const renderBlock = (block: ArticleBlock, index: number) => {
    switch (block.type) {
      case 'image':
        return (
          <div key={block.id} className="blog-content-image">
            <img 
              src={block.data?.file_url} 
              alt={block.data?.alt_text || ''} 
              className="content-image"
            />
            {block.data?.caption && (
              <p className="image-caption">{block.data.caption}</p>
            )}
          </div>
        );
      
      case 'header':
        return block.level === 2 ? (
          <h2 key={block.id} className="blog-content-h2">{block.text}</h2>
        ) : (
          <h3 key={block.id} className="blog-content-h3">{block.text}</h3>
        );
      
      case 'paragraph':
        return (
          <p key={block.id} className="blog-content-paragraph">{block.text}</p>
        );
      
      case 'list':
        return block.style === 'ordered' ? (
          <ol key={block.id} className="blog-content-list ordered">
            {block.items?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        ) : (
          <ul key={block.id} className="blog-content-list unordered">
            {block.items?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      
      case 'code':
        return (
          <div key={block.id} className="blog-content-code">
            <pre>
              <code className={block.language ? `language-${block.language}` : ''}>
                {block.text}
              </code>
            </pre>
          </div>
        );
      
      case 'quote':
        return (
          <blockquote key={block.id} className="blog-content-quote">
            <p>{block.text}</p>
            {block.cite && <cite>— {block.cite}</cite>}
          </blockquote>
        );
      
      default:
        return null;
    }
  };

  // Group blocks into sections (image + header + paragraph)
  const renderSections = () => {
    if (!post?.content) return null;
    
    const sections = [];
    let currentSection = [];
    
    for (let i = 0; i < post.content.length; i++) {
      const block = post.content[i];
      currentSection.push(block);
      
      // If we have 3 blocks or if this is the last block or if we've completed a section
      if (currentSection.length === 3 || i === post.content.length - 1 || 
          (currentSection.length > 0 && i < post.content.length - 1 && post.content[i+1].type === 'image')) {
        sections.push([...currentSection]);
        currentSection = [];
      }
    }
    
    return sections.map((section, index) => (
      <div key={index} className="blog-content-section">
        {section.map(block => renderBlock(block, index))}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="blog-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner"></i>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-container">
        <div className="error-message">
          <p>{error || 'Article not found'}</p>
          <Link href="/blog" className="back-button">
            <i className="fas fa-arrow-left"></i> Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-hero">
        <div className="hero-content">
          <h1>Buteos Systems Blog</h1>
          <p>Insights, tutorials, and updates from our team</p>
        </div>
      </div>

      <div>
        <Link href="/blog" className="back-button">
          <i className="fas fa-arrow-left"></i> Back to all posts
        </Link>
        
        <div className="blog-post">
          <div className="blog-post-header">
            <img 
              src={post.main_image.file_url} 
              alt={post.main_image.alt_text} 
              className="blog-post-image"
            />
            
            <div className="blog-post-meta-container">
              <h2 className="blog-post-title">{post.title}</h2>
              
              <div className="blog-post-meta">
                <span>
                  <i className="fas fa-user"></i>
                  {post.author}
                </span>
                <span>
                  <i className="fas fa-calendar"></i>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="blog-categories-tags">
                <div className="blog-categories">
                  {post.categories.map((category, index) => (
                    <span key={index} className="blog-category">{category}</span>
                  ))}
                </div>
                <div className="blog-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="blog-tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="blog-post-content">
            {renderSections()}
          </div>
          
          <div className="share-container">
            <h3 className="share-title">Share this post</h3>
            <div className="share-buttons">
              <button 
                onClick={() => handleShare('twitter')}
                className="share-button share-twitter"
              >
                <i className="fab fa-twitter"></i>
              </button>
              <button 
                onClick={() => handleShare('facebook')}
                className="share-button share-facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </button>
              <button 
                onClick={() => handleShare('linkedin')}
                className="share-button share-linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </button>
              <button 
                onClick={() => handleShare('copy')}
                className="share-button share-link"
              >
                <i className="fas fa-link"></i>
              </button>
            </div>
          </div>
          
          <div className="comments-section">
            <h3 className="comments-title">Comments ({comments.length})</h3>
            
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{comment.name}</span>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                  <p className="comment-body">{comment.content}</p>
                </div>
              ))
            )}
            
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <h4 className="comment-form-title">Leave a comment</h4>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={newComment.name}
                    onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={newComment.email}
                    onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="comment" className="form-label">Comment</label>
                <textarea
                  id="comment"
                  value={newComment.content}
                  onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                  required
                  className="form-textarea"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="form-submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <i className="fas fa-spinner"></i> Posting...
                  </>
                ) : (
                  'Post Comment'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

