
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedWallpapers from "@/components/FeaturedWallpapers";
import WallpaperGrid from "@/components/WallpaperGrid";
import { Wallpaper, Genre, WallpaperFilters } from "@/types/wallpaper";
import { getGenres, getWallpapers, getTrendingWallpapers } from "@/services/wallpaperService";
import { toast } from "@/hooks/use-toast";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Fetch genres on mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await getGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error loading genres:", error);
        toast({
          title: "Error",
          description: "Failed to load genre categories",
          variant: "destructive",
        });
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
        toast({
          title: "Error",
          description: "Failed to load trending wallpapers",
          variant: "destructive",
        });
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
        toast({
          title: "Error",
          description: "Failed to load wallpapers",
          variant: "destructive",
        });
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
    
    // Clear search when changing genres
    if (searchQuery) {
      setSearchQuery("");
    }
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters(prev => ({
      ...prev,
      search: query.trim() || undefined
    }));
    
    // Reset to All category when searching
    if (activeGenre) {
      setActiveGenre(null);
      setFilters(prev => ({
        ...prev,
        genre: undefined,
        search: query.trim() || undefined
      }));
    }
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
    
    toast({
      description: "Download started...",
    });
  };
  
  return (
    <div className="min-h-screen bg-dark">
      <Header
        genres={genres}
        activeGenre={activeGenre}
        onGenreSelect={handleGenreSelect}
        onSearch={handleSearch}
      />
      
      {/* Hero Section */}
      <HeroSection />
      
      <main className="container mx-auto px-4 py-8">
        {/* Only show trending section when not searching */}
        {!searchQuery && (
          <div id="trending-section">
            <FeaturedWallpapers 
              wallpapers={trendingWallpapers} 
              isLoading={isLoadingTrending} 
              onDownload={handleDownload}
              title="Trending Wallpapers"
            />
          </div>
        )}
        
        {/* Main Wallpaper Grid */}
        <section className="py-8">
          <h2 className="text-xl md:text-2xl font-heading font-medium mb-6">
            {searchQuery 
              ? `Search results for "${searchQuery}"`
              : activeGenre 
                ? genres.find(g => g.slug === activeGenre)?.name || 'Wallpapers' 
                : 'All Wallpapers'
            }
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
