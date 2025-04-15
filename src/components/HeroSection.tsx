
import React from "react";
import { ArrowDownCircle, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark-accent/10 to-dark">
      {/* Decorative elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-dark-accent/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-urbanist mb-6 bg-gradient-to-r from-white via-purple-200 to-dark-accent bg-clip-text text-transparent">
          Elevate Your Screen's Aesthetic
        </h1>
        <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
          Level up your device with our curated collection of aesthetic wallpapers.
          Find your perfect vibe from minimalist to maximalist. ✨
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-12">
          <Sparkles className="w-6 h-6 text-dark-accent animate-pulse" />
          <span className="text-white/50 font-medium">
            500+ Handpicked Wallpapers
          </span>
        </div>
        
        <button 
          onClick={() => {
            const trendingSection = document.getElementById('trending-section');
            trendingSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 mx-auto text-white/90 hover:text-dark-accent transition-colors"
        >
          <span>Explore Collection</span>
          <ArrowDownCircle className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
