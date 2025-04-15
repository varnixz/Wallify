
import React from "react";
import { Download, Heart } from "lucide-react";
import { Wallpaper } from "@/types/wallpaper";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onDownload: (url: string) => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper, onDownload }) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload(wallpaper.downloadUrl || wallpaper.url);
  };

  return (
    <div className="wallpaper-card animate-fade-in">
      <div className="relative h-full">
        {/* Image */}
        <img
          src={wallpaper.url}
          alt={wallpaper.title}
          className="wallpaper-image"
          loading="lazy"
        />

        {/* Overlay with info */}
        <div className="wallpaper-overlay">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-white truncate">
              {wallpaper.title}
            </h3>
            <p className="text-xs text-white/70">
              {wallpaper.source}
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center space-x-2">
              {wallpaper.likes !== undefined && (
                <div className="flex items-center text-white/70 text-xs">
                  <Heart size={12} className="mr-1" />
                  <span>{wallpaper.likes}</span>
                </div>
              )}
            </div>
            
            <button
              onClick={handleDownload}
              className="p-2 bg-dark-accent rounded-full hover:bg-dark-accent/80 transition-colors"
              aria-label="Download wallpaper"
            >
              <Download size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;
