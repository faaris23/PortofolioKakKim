import React, { useState } from 'react';
import { ARTWORKS } from '../data';
import { Artwork } from '../types';
import { Filter, Eye, Calendar, BookOpen, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ArtworkGridProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

export default function ArtworkGrid({ onSelectArtwork }: ArtworkGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Art', 'Comic/Novel Cover', 'Comic', 'Chibi'];

  const filteredArtworks = selectedCategory === 'All'
    ? ARTWORKS
    : ARTWORKS.filter(art => art.category === selectedCategory);

  // Determine grid columns and card styling based on category
  const getGridClass = () => {
    switch (selectedCategory) {
      case 'Art':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12';
      case 'Comic/Novel Cover':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12';
      case 'Comic':
        return 'grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12';
      case 'Chibi':
        return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8';
    }
  };

  return (
    <section id="portfolio-section" className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-sans text-[10px] tracking-[0.3em] text-brand-teal font-bold uppercase block mb-3">
              CREATIVE WORKS
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-brand-primary">
              The Gallery Archive
            </h2>
          </div>
          <p className="max-w-md font-sans text-brand-dark/70 text-sm leading-relaxed md:text-right">
            Curated illustrations, sequential panels, novel covers, and character designs exploring high-fantasy realms and sci-fi landscapes.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-start md:justify-center gap-2 md:gap-4 mb-16 border-b border-brand-border/60 pb-6 overflow-x-auto scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              id={`filter-btn-${category.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(category)}
              className={`relative font-sans text-xs md:text-sm font-semibold tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-brand-teal text-white shadow-sm'
                  : 'text-brand-dark/60 hover:text-brand-primary hover:bg-brand-surface-low'
              }`}
            >
              {category === 'All' ? 'ALL WORKS' : category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Art Grid Container */}
        <motion.div 
          layout
          className={getGridClass()}
          id="gallery-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((art) => (
              <motion.div
                key={art.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => onSelectArtwork(art)}
                className="group cursor-pointer flex flex-col h-full"
                id={`art-card-${art.id}`}
              >
                {/* Image Container with specific responsive styling */}
                <div 
                  className={`relative overflow-hidden bg-brand-surface-low border border-brand-border/40 transition-all duration-500 rounded-lg shadow-[0_4px_24px_-8px_rgba(0,0,0,0.03)] group-hover:shadow-[0_12px_40px_-12px_rgba(37,104,106,0.12)] group-hover:border-brand-teal/20 ${
                    art.aspectRatio === '3:4' 
                      ? 'aspect-[3/4]' 
                      : art.aspectRatio === '4:3'
                      ? 'aspect-[4/3]'
                      : art.aspectRatio === '1:1'
                      ? 'aspect-[1/1]'
                      : 'aspect-[16/9]'
                  }`}
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Backdrop blur & overlay details on Hover */}
                  <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex flex-col justify-between p-6">
                    {/* Top Tag Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {art.tags?.slice(0, 2).map((tag, i) => (
                        <span 
                          key={i} 
                          className="bg-white/90 text-brand-primary font-sans text-[9px] tracking-wider font-bold uppercase px-2 py-0.5 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Action */}
                    <div className="flex items-center justify-between text-white">
                      <div className="flex flex-col">
                        <span className="font-serif text-lg font-bold tracking-tight line-clamp-1">
                          {art.title}
                        </span>
                        <span className="font-mono text-[10px] tracking-wider text-brand-gold/90 mt-0.5">
                          {art.year} • {art.category}
                        </span>
                      </div>
                      <div className="bg-brand-teal/90 p-2 rounded-full text-white shadow-sm hover:scale-110 transition-transform">
                        <Eye size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic Novel/Cover overlay spines (Only for Comic/Novel Cover category) */}
                  {art.category === 'Comic/Novel Cover' && (
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-r from-black/20 via-white/10 to-transparent pointer-events-none" />
                  )}
                </div>

                {/* Visible Info Card Below Image */}
                <div className="mt-4 flex flex-col flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold tracking-tight text-brand-primary group-hover:text-brand-teal transition-colors line-clamp-1">
                      {art.title}
                    </h3>
                    <span className="font-mono text-xs text-brand-teal/80 font-semibold bg-brand-surface-low px-2 py-0.5 rounded">
                      {art.year}
                    </span>
                  </div>
                  
                  {art.description && (
                    <p className="font-sans text-brand-dark/60 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {art.description}
                    </p>
                  )}

                  {/* Categories detail */}
                  <div className="mt-auto pt-3 flex items-center gap-1">
                    <span className="font-mono text-[9px] tracking-[0.1em] text-brand-teal uppercase font-bold">
                      {art.category === 'Comic/Novel Cover' ? 'NOVEL COVER' : art.category}
                    </span>
                    <span className="text-brand-border">•</span>
                    <span className="font-mono text-[9px] text-brand-dark/40 truncate">
                      {art.medium}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
