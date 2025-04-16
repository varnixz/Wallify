
import React, { useState } from "react";
import { Download, Heart } from "lucide-react";
import { Wallpaper } from "@/types/wallpaper";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onDownload: (url: string) => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper, onDownload }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload(wallpaper.downloadUrl || wallpaper.url);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="wallpaper-card animate-fade-in bg-dark-accent rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl hover:scale-[1.02] border border-dark-accent">
      <div className="relative h-full">
        {/* Image with error handling */}
        <AspectRatio ratio={9/16} className="bg-gray-900">
          {!imageError ? (
            <img
              src={wallpaper.url}
              alt={wallpaper.title}
              className="wallpaper-image object-cover w-full h-full"
              loading="lazy"
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 p-4">
              <p className="text-sm text-white/70 text-center">{wallpaper.title}</p>
            </div>
          )}
        </AspectRatio>

        {/* Overlay with info */}
        <div className="wallpaper-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
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
              className="p-2 bg-dark-accent/80 rounded-full hover:bg-dark-accent transition-colors"
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
