import React from 'react';
import { STORIES_SERIES } from '../data';
import { BookOpen, Tag, Calendar, FolderHeart } from 'lucide-react';
import { motion } from 'motion/react';

export default function SeriesShowcase() {
  return (
    <section id="series-section" className="py-24 bg-brand-surface-low/50 border-y border-brand-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="mb-20">
          <span className="font-sans text-[10px] tracking-[0.3em] text-brand-teal font-bold uppercase block mb-3">
            STORY PROJECTS & CHRONICLES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-brand-primary">
            Narrative Universes
          </h2>
          <div className="h-[2px] w-20 bg-brand-teal/30 mt-6" />
        </div>

        {/* Series Showcase List */}
        <div className="flex flex-col gap-28">
          {STORIES_SERIES.map((series, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={series.id}
                id={`series-row-${series.id}`}
                className={`flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Series Banner Card */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-[10px] tracking-[0.2em] text-brand-teal font-extrabold bg-brand-teal/10 px-3 py-1 rounded-sm uppercase">
                        {series.subtitle}
                      </span>
                      <span className="font-mono text-xs text-brand-dark/50 flex items-center gap-1">
                        <FolderHeart size={14} className="text-brand-gold" />
                        {series.archivedCount} ARCHIVED PIECES
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-primary">
                      {series.title}
                    </h3>

                    <p className="font-sans text-brand-dark/70 text-sm md:text-base leading-relaxed">
                      {series.description}
                    </p>

                    {/* Metadata Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {series.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="font-sans text-xs text-brand-teal font-semibold border border-brand-teal/20 px-3 py-1 rounded-full bg-brand-bg/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Stats Panel */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-brand-border/60">
                      <div className="p-4 bg-brand-surface-lowest rounded-lg border border-brand-border/30">
                        <span className="font-sans text-[10px] tracking-wider text-brand-dark/40 font-bold block mb-1">
                          PRIMARY MEDIUM
                        </span>
                        <span className="font-sans text-xs font-bold text-brand-primary">
                          Digital Full Color
                        </span>
                      </div>
                      <div className="p-4 bg-brand-surface-lowest rounded-lg border border-brand-border/30">
                        <span className="font-sans text-[10px] tracking-wider text-brand-dark/40 font-bold block mb-1">
                          UPDATE FREQUENCY
                        </span>
                        <span className="font-sans text-xs font-bold text-brand-teal flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active Monthly
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Series Featured Gallery Showcase */}
                <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                  {series.artworks.map((art, artIdx) => (
                    <div
                      key={artIdx}
                      className="group/item relative bg-brand-surface-lowest rounded-lg overflow-hidden border border-brand-border/40 hover:border-brand-teal/30 hover:shadow-md transition-all duration-300 flex flex-col"
                    >
                      {/* Visual Container */}
                      <div className="aspect-[3/4] relative overflow-hidden bg-brand-surface-low">
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        {/* Overlay subtle color shade */}
                        <div className="absolute inset-0 bg-brand-teal/5 opacity-40 mix-blend-multiply" />
                      </div>

                      {/* Info Panel */}
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <h4 className="font-serif text-sm font-bold text-brand-primary line-clamp-1 group-hover/item:text-brand-teal transition-colors">
                          {art.title}
                        </h4>
                        <span className="font-mono text-[9px] tracking-wider text-brand-dark/40 font-bold uppercase mt-1 block">
                          {art.role}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Decorative background framing to emphasize gold theme */}
                  <div className={`absolute -inset-4 border border-brand-gold/10 pointer-events-none rounded-xl hidden xl:block ${
                    isEven ? '-translate-x-4 translate-y-4' : 'translate-x-4 translate-y-4'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
