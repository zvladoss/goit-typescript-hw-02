// src/types.ts
export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
  likes: number;
}
