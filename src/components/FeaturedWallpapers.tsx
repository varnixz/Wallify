
import React from "react";
import { Wallpaper } from "@/types/wallpaper";
import WallpaperCard from "./WallpaperCard";
import { WallpaperGridSkeleton } from "./WallpaperSkeleton";

interface FeaturedWallpapersProps {
  wallpapers: Wallpaper[] | null;
  isLoading: boolean;
  onDownload: (url: string) => void;
  title?: string;
}

const FeaturedWallpapers: React.FC<FeaturedWallpapersProps> = ({
  wallpapers,
  isLoading,
  onDownload,
  title = "Trending Wallpapers"
}) => {
  if (isLoading) {
    return (
      <section className="py-8">
        <h2 className="text-xl md:text-2xl font-heading font-medium mb-6">
          {title}
        </h2>
        <WallpaperGridSkeleton count={4} />
      </section>
    );
  }

  if (!wallpapers || wallpapers.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <h2 className="text-xl md:text-2xl font-heading font-medium mb-6">
        {title}
      </h2>
      <div className="wallpaper-grid">
        {wallpapers.map((wallpaper) => (
          <WallpaperCard 
            key={wallpaper.id} 
            wallpaper={wallpaper} 
            onDownload={onDownload} 
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedWallpapers;
