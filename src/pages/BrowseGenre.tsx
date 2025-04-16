
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import WallpaperGrid from "@/components/WallpaperGrid";
import { Wallpaper, Genre, WallpaperFilters } from "@/types/wallpaper";
import { getWallpapers, getGenres } from "@/services/wallpaperService";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const BrowseGenre = () => {
  const { genreSlug } = useParams<{ genreSlug: string }>();
  const navigate = useNavigate();
  
  const [wallpapers, setWallpapers] = useState<Wallpaper[] | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState<string | null>(genreSlug || null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<WallpaperFilters>({
    genre: genreSlug || undefined
  });
  
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
          description: "Failed to load genres. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    loadGenres();
  }, []);
  
  // Set active genre when URL param changes
  useEffect(() => {
    setActiveGenre(genreSlug || null);
    setFilters(prev => ({
      ...prev,
      genre: genreSlug || undefined
    }));
  }, [genreSlug]);
  
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
          description: "Failed to load wallpapers. Please try again.",
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
    // This navigation is now handled by Header component
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // If searching from a genre page, redirect to home with search query
    navigate("/");
    
    // Let the parent component handle the search
    setFilters(prev => ({
      ...prev,
      search: query.trim() || undefined
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
    
    toast({
      description: "Downloading wallpaper...",
    });
  };
  
  const currentGenre = genres.find(g => g.slug === activeGenre);
  
  return (
    <div className="min-h-screen bg-dark">
      <Header
        genres={genres}
        activeGenre={activeGenre}
        onGenreSelect={handleGenreSelect}
        onSearch={handleSearch}
      />
      
      <main className="container mx-auto px-4 py-8 mt-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-urbanist mb-4 text-white">
            {currentGenre ? currentGenre.name : "All Wallpapers"}
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Explore our curated collection of {currentGenre ? 
            `${currentGenre.name.toLowerCase()} themed` : ""} wallpapers
          </p>
        </div>
        
        <WallpaperGrid 
          wallpapers={wallpapers} 
          isLoading={isLoading} 
          onDownload={handleDownload} 
        />
      </main>
    </div>
  );
};

export default BrowseGenre;
