
import React, { useState, useEffect } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Genre } from "@/types/wallpaper";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface HeaderProps {
  genres: Genre[];
  activeGenre: string | null;
  onGenreSelect: (genre: string | null) => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  genres, 
  activeGenre, 
  onGenreSelect, 
  onSearch 
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Show first 6 genres in main nav, rest in dropdown
  const mainGenres = genres.slice(0, 6);
  const dropdownGenres = genres.slice(6);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      navigate("/");
      toast({
        description: `Searching for "${searchQuery}"...`,
      });
    }
  };

  const handleGenreClick = (genreSlug: string | null) => {
    if (genreSlug === null) {
      navigate('/');
    } else {
      navigate(`/genre/${genreSlug}`);
    }
    onGenreSelect(genreSlug);
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-dark/90 backdrop-blur-md shadow-md" : "bg-dark"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-urbanist font-bold text-white">
              <span className="text-dark-accent">Wallify</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleGenreClick(null)}
              className={`text-sm font-medium transition-colors hover:text-dark-accent ${
                activeGenre === null ? "text-dark-accent" : "text-white/80"
              }`}
            >
              All
            </button>
            
            {mainGenres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.slug)}
                className={`text-sm font-medium transition-colors hover:text-dark-accent ${
                  activeGenre === genre.slug ? "text-dark-accent" : "text-white/80"
                }`}
              >
                {genre.name}
              </button>
            ))}

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="text-sm font-medium text-white/80 hover:text-dark-accent"
                  >
                    More Genres
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-1 p-4 bg-dark-lighter">
                      {dropdownGenres.map((genre) => (
                        <button
                          key={genre.id}
                          onClick={() => handleGenreClick(genre.slug)}
                          className={`flex items-center px-4 py-2 text-sm text-left rounded-md transition-colors hover:bg-dark-accent/10 ${
                            activeGenre === genre.slug ? "text-dark-accent" : "text-white/80"
                          }`}
                        >
                          {genre.name}
                        </button>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Search and Mobile menu button */}
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="hidden md:flex items-center mr-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  type="text"
                  placeholder="Search wallpapers..."
                  className="bg-dark-lighter rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-dark-accent w-48 lg:w-64 text-white/90"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <button 
              className="md:hidden p-2 rounded-md text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-dark-lighter`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <form onSubmit={handleSearch} className="p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                type="text"
                placeholder="Search wallpapers..."
                className="bg-dark w-full rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-dark-accent text-white/90"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <button 
            onClick={() => handleGenreClick(null)}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
              activeGenre === null ? "text-dark-accent" : "text-white/80"
            }`}
          >
            All
          </button>
          
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.slug)}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeGenre === genre.slug ? "text-dark-accent" : "text-white/80"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
