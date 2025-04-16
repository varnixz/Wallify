
import React from "react";
import { Wallpaper } from "@/types/wallpaper";
import WallpaperCard from "./WallpaperCard";
import { WallpaperGridSkeleton } from "./WallpaperSkeleton";

interface WallpaperGridProps {
  wallpapers: Wallpaper[] | null;
  isLoading: boolean;
  onDownload: (url: string) => void;
}

const WallpaperGrid: React.FC<WallpaperGridProps> = ({
  wallpapers,
  isLoading,
  onDownload,
}) => {
  if (isLoading) {
    return <WallpaperGridSkeleton count={12} />;
  }

  if (!wallpapers || wallpapers.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-xl font-medium text-white/70">
          No wallpapers found
        </h3>
        <p className="mt-2 text-white/50">
          Try another filter or check back later
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 animate-fade-in">
      {wallpapers.map((wallpaper) => (
        <WallpaperCard
          key={wallpaper.id}
          wallpaper={wallpaper}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};

export default WallpaperGrid;
