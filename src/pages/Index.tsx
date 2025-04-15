
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import FeaturedWallpapers from "@/components/FeaturedWallpapers";
import WallpaperGrid from "@/components/WallpaperGrid";
import { Wallpaper, Genre, WallpaperFilters } from "@/types/wallpaper";
import { getGenres, getWallpapers, getTrendingWallpapers } from "@/services/wallpaperService";

const Index = () => {
  // State for wallpapers and loading states
  const [wallpapers, setWallpapers] = useState<Wallpaper[] | null>(null);
  const [trendingWallpapers, setTrendingWallpapers] = useState<Wallpaper[] | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTrending, setIsLoadingTrending] = useState(true);
  
  // State for filters
  const [filters, setFilters] = useState<WallpaperFilters>({});
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  
  // Fetch genres on mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await getGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error loading genres:", error);
      }
    };
    
    loadGenres();
  }, []);
  
  // Fetch trending wallpapers on mount
  useEffect(() => {
    const loadTrendingWallpapers = async () => {
      setIsLoadingTrending(true);
      try {
        const trending = await getTrendingWallpapers(4);
        setTrendingWallpapers(trending);
      } catch (error) {
        console.error("Error loading trending wallpapers:", error);
      } finally {
        setIsLoadingTrending(false);
      }
    };
    
    loadTrendingWallpapers();
  }, []);
  
  // Fetch wallpapers when filters change
  useEffect(() => {
    const loadWallpapers = async () => {
      setIsLoading(true);
      try {
        const wallpapersData = await getWallpapers(filters);
        setWallpapers(wallpapersData);
      } catch (error) {
        console.error("Error loading wallpapers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWallpapers();
  }, [filters]);
  
  // Handle genre selection
  const handleGenreSelect = (genre: string | null) => {
    setActiveGenre(genre);
    setFilters(prev => ({
      ...prev,
      genre: genre || undefined
    }));
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    setFilters(prev => ({
      ...prev,
      search: query || undefined
    }));
  };
  
  // Handle wallpaper download
  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wallpaper.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="min-h-screen bg-dark">
      <Header
        genres={genres}
        activeGenre={activeGenre}
        onGenreSelect={handleGenreSelect}
        onSearch={handleSearch}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Trending Section */}
        <FeaturedWallpapers 
          wallpapers={trendingWallpapers} 
          isLoading={isLoadingTrending} 
          onDownload={handleDownload}
          title="Trending Wallpapers"
        />
        
        {/* Main Wallpaper Grid */}
        <section className="py-8">
          <h2 className="text-xl md:text-2xl font-heading font-medium mb-6">
            {activeGenre ? genres.find(g => g.slug === activeGenre)?.name || 'Wallpapers' : 'All Wallpapers'}
          </h2>
          <WallpaperGrid 
            wallpapers={wallpapers} 
            isLoading={isLoading} 
            onDownload={handleDownload} 
          />
        </section>
      </main>
    </div>
  );
};

export default Index;
