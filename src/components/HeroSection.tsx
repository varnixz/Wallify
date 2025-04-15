
import React from "react";
import { ArrowDownCircle, Sparkles, Stars, ImageIcon } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark via-[#201A32] to-[#1A1F2C]">
      {/* Decorative elements */}
      <div className="absolute inset-0 w-full h-full">
        {/* Abstract shapes and blurs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-dark-accent/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        
        {/* Animated stars/dots */}
        <div className="absolute top-20 right-32 w-2 h-2 bg-white/70 rounded-full animate-pulse"></div>
        <div className="absolute top-40 left-24 w-1 h-1 bg-white/50 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 py-12 max-w-5xl mx-auto">
        <div className="flex justify-center mb-4">
          <span className="px-4 py-1.5 rounded-full bg-dark-accent/20 text-dark-accent text-sm font-medium backdrop-blur-sm border border-dark-accent/30">
            Wallpaper Collection
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-urbanist mb-6 bg-gradient-to-r from-white via-purple-200 to-dark-accent bg-clip-text text-transparent leading-tight">
          Elevate Your Screen's Aesthetic
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light">
          Level up your device with our curated collection of aesthetic wallpapers.
          Find your perfect vibe from minimalist to maximalist. ✨
        </p>
        
        <div className="flex items-center justify-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-dark-accent" />
            <span className="text-white/70 font-medium">500+ Handpicked</span>
          </div>
          <div className="flex items-center gap-2">
            <Stars className="w-5 h-5 text-dark-accent" />
            <span className="text-white/70 font-medium">High Resolution</span>
          </div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-dark-accent" />
            <span className="text-white/70 font-medium">15+ Categories</span>
          </div>
        </div>
        
        <button 
          onClick={() => {
            const trendingSection = document.getElementById('trending-section');
            trendingSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 mx-auto bg-gradient-to-r from-dark-accent to-purple-600 hover:from-dark-accent/90 hover:to-purple-600/90 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg shadow-purple-600/20"
        >
          <span className="font-medium">Explore Collection</span>
          <ArrowDownCircle className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </button>

        {/* Decorative wallpaper previews */}
        <div className="hidden lg:flex absolute -bottom-16 left-8 right-8 justify-between opacity-50">
          <div className="h-28 w-20 rounded-lg bg-gradient-to-br from-pink-500/30 to-purple-600/30 backdrop-blur-sm transform -rotate-6"></div>
          <div className="h-24 w-16 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-600/30 backdrop-blur-sm transform rotate-3"></div>
          <div className="h-32 w-20 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-600/30 backdrop-blur-sm transform -rotate-12"></div>
          <div className="h-28 w-18 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-600/30 backdrop-blur-sm transform rotate-6"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
