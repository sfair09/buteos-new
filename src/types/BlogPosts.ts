export interface ArticleBlock {
  id: string;
  type: 'image' | 'header' | 'paragraph' | 'list' | 'code' | 'quote';
  level?: number;
  text?: string;
  data?: {
    file_url: string;
    alt_text: string;
    caption?: string;
  };
  style?: 'ordered' | 'unordered';
  items?: string[];
  language?: string;
  cite?: string;
}

export interface MainImage {
  file_url: string;
  alt_text: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: ArticleBlock[];
  author: string;
  date: string;
  main_image: MainImage;
  image: string;
  tags: string[];
  categories: string[];
  slug: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  content: string;
  date: string;
}