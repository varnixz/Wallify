
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import WallpaperGrid from "@/components/WallpaperGrid";
import { Wallpaper, Genre } from "@/types/wallpaper";
import { getWallpapers, getGenres } from "@/services/wallpaperService";
import { useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const BrowseGenre = () => {
  const { genreSlug } = useParams<{ genreSlug: string }>();
  const [wallpapers, setWallpapers] = useState<Wallpaper[] | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState<string | null>(genreSlug || null);
  
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
  }, [genreSlug]);
  
  // Fetch wallpapers for the current genre
  useEffect(() => {
    const loadWallpapers = async () => {
      setIsLoading(true);
      try {
        const wallpapersData = await getWallpapers({
          genre: activeGenre || undefined
        });
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
  }, [activeGenre]);
  
  // Handle search
  const handleSearch = (query: string) => {
    // Implementation for search within genre
    if (query.trim()) {
      toast({
        title: "Search",
        description: `Searching for "${query}" in ${activeGenre || "all wallpapers"}`,
      });
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
      description: "Downloading wallpaper...",
    });
  };
  
  const currentGenre = genres.find(g => g.slug === activeGenre);
  
  return (
    <div className="min-h-screen bg-dark">
      <Header
        genres={genres}
        activeGenre={activeGenre}
        onGenreSelect={(genre) => {
          // This will be handled through navigation now
        }}
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
