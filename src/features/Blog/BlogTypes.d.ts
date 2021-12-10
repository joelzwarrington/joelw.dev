export interface Article {
  id: number;
  image?: string;
  title: string;
  url: string;
  tags: string[];
  publishedAt: string;
  readingTimeMinutes: number;
  author: Author;
}

export interface Author {
  name: string;
  username: string;
  avatar: string;
}
