import React from 'react';
import { Artwork } from '../types';
import { X, ChevronLeft, ChevronRight, Share2, Tag, Calendar, PenTool, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface LightboxProps {
  artwork: Artwork;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ artwork, onClose, onNext, onPrev }: LightboxProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 bg-brand-dark/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto animate-fade-in"
    >
      {/* Absolute Header Overlay */}
      <div className="absolute top-4 right-4 flex items-center space-x-3 z-50">
        <button
          onClick={handleCopyLink}
          className="p-2.5 bg-brand-bg/10 hover:bg-brand-bg/20 rounded-full text-white/80 hover:text-white transition-all cursor-pointer"
          title="Share portfolio link"
        >
          {copied ? <Check size={20} className="text-emerald-400" /> : <Share2 size={20} />}
        </button>
        <button
          onClick={onClose}
          id="lightbox-close-btn"
          className="p-2.5 bg-brand-bg/10 hover:bg-brand-bg/20 rounded-full text-white/80 hover:text-white transition-all cursor-pointer"
          title="Close gallery"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Lightbox Card */}
      <div
        id="lightbox-modal-content"
        className="relative max-w-6xl w-full bg-brand-bg rounded-xl overflow-hidden shadow-2xl border border-brand-border/20 grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] lg:max-h-[85vh] mt-8 lg:mt-0"
      >
        {/* Left: Image Container with navigation buttons */}
        <div className="lg:col-span-7 bg-black/40 flex items-center justify-center relative aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden select-none">
          
          {/* Main Visual */}
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="max-h-[50vh] lg:max-h-[85vh] max-w-full w-auto object-contain z-10 transition-all duration-300"
            referrerPolicy="no-referrer"
          />

          {/* Background Blurred Glow */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-20 pointer-events-none scale-110"
            style={{ backgroundImage: `url(${artwork.imageUrl})` }}
          />

          {/* Navigtion Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            id="lightbox-prev-btn"
            className="absolute left-4 z-20 p-2.5 rounded-full bg-brand-primary/30 hover:bg-brand-primary/60 text-white transition-all focus:outline-none cursor-pointer"
            title="Previous artwork"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            id="lightbox-next-btn"
            className="absolute right-4 z-20 p-2.5 rounded-full bg-brand-primary/30 hover:bg-brand-primary/60 text-white transition-all focus:outline-none cursor-pointer"
            title="Next artwork"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Right: Technical Sheet details & description */}
        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between overflow-y-auto bg-brand-surface-lowest lg:h-full border-t lg:border-t-0 lg:border-l border-brand-border">
          <div className="space-y-6">
            
            {/* Category Tag */}
            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] tracking-[0.2em] text-brand-teal bg-brand-teal/10 px-3 py-1 font-bold rounded-sm uppercase">
                {artwork.category}
              </span>
              <span className="font-mono text-xs text-brand-dark/40 font-bold">
                YEAR: {artwork.year}
              </span>
            </div>

            {/* Title */}
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-brand-primary">
                {artwork.title}
              </h3>
              <div className="h-[2px] w-12 bg-brand-teal mt-4" />
            </div>

            {/* Description */}
            {artwork.description && (
              <div className="space-y-2">
                <span className="font-sans text-[10px] tracking-wider text-brand-dark/40 font-bold uppercase block">
                  Artwork Description
                </span>
                <p className="font-sans text-brand-dark/70 text-sm leading-relaxed">
                  {artwork.description}
                </p>
              </div>
            )}

            {/* Technical Metadata Table */}
            <div className="border-t border-brand-border/60 pt-6 space-y-4">
              <span className="font-sans text-[10px] tracking-wider text-brand-dark/40 font-bold uppercase block">
                Technical Sheet
              </span>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs font-sans">
                {/* Year */}
                <div className="space-y-1">
                  <span className="text-brand-dark/50 flex items-center gap-1.5 font-semibold">
                    <Calendar size={13} className="text-brand-teal" />
                    Creation Date
                  </span>
                  <span className="text-brand-primary font-bold block">{artwork.year}</span>
                </div>

                {/* Medium */}
                <div className="space-y-1">
                  <span className="text-brand-dark/50 flex items-center gap-1.5 font-semibold">
                    <PenTool size={13} className="text-brand-teal" />
                    Software & Medium
                  </span>
                  <span className="text-brand-primary font-bold block truncate" title={artwork.medium}>
                    {artwork.medium || 'Digital Illustration'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags section */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div className="border-t border-brand-border/60 pt-6 space-y-3">
                <span className="font-sans text-[10px] tracking-wider text-brand-dark/40 font-bold uppercase block">
                  Tags & Taxonomy
                </span>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-sans text-xs text-brand-teal font-semibold border border-brand-teal/20 px-2.5 py-0.5 rounded-full bg-brand-teal/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Quick Notice footer inside lightbox */}
          <div className="mt-8 pt-6 border-t border-brand-border/40 text-[10px] font-sans text-brand-dark/50 flex items-center justify-between">
            <span>© Rosalia Arts. All rights reserved.</span>
            <span className="font-semibold text-brand-teal">Available for License</span>
          </div>
        </div>
      </div>
    </div>
  );
}
