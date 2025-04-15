
import React from "react";

const WallpaperSkeleton: React.FC = () => {
  return (
    <div className="wallpaper-card">
      <div className="w-full h-full bg-dark-lighter shimmer rounded-lg"></div>
    </div>
  );
};

const WallpaperGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="wallpaper-grid">
      {[...Array(count)].map((_, index) => (
        <WallpaperSkeleton key={index} />
      ))}
    </div>
  );
};

export { WallpaperSkeleton, WallpaperGridSkeleton };
