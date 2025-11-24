
export enum ContentType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  LINK = 'LINK',
}

export interface BentoItem {
  id: string;
  type: ContentType;
  content: string; // Text content, Image URL, or Link Label
  subContent?: string; // Author, Date, or URL
  colSpan?: number; // 1 or 2
  rowSpan?: number; // 1 or 2
  className?: string; // Optional specific tailwind classes
}

export interface BlogCategory {
  id: string;
  title: string;
  description: string;
  gradient: string; // Tailwind gradient classes for hover effects
}

export interface BlogPost {
  id: string;
  categoryId: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  content: string; // HTML string for the full article
}

export type ViewState = 'HOME' | 'COLLECTION' | 'BLOG';
