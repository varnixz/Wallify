
export interface Wallpaper {
  id: string;
  url: string;
  title: string;
  genre: string[];
  source: string;
  width: number;
  height: number;
  downloadUrl?: string;
  views?: number;
  likes?: number;
  featured?: boolean;
  createdAt?: number;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export type SortOption = 'trending' | 'newest' | 'popular' | 'random';

export interface WallpaperFilters {
  genre?: string;
  sort?: SortOption;
  search?: string;
}
