
export interface Post {
  id: number;
  title: string;
  date: string;
  updateDate: string;
  categories: string[];
  author: string;
  views: number;
  comments: number;
  content: string; // Summary
  fullContent: string; // Detailed Article
  cover: string;
}

export interface SiteStats {
  postCount: number;
  runtime: number;
  wordCount: string;
  totalViews: number;
}
