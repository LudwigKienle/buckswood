export interface AIFilm {
  id: string;
  title: string;
  creator: string;
  thumbnail_url: string;
  video_url: string;
  duration: string;
  description: string;
  ai_tools: string[];
  category: string;
  views: number;
  featured: boolean;
  created_at: string;
}