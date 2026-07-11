import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ArtworkGrid from './components/ArtworkGrid';
import SeriesShowcase from './components/SeriesShowcase';
import AboutSection from './components/AboutSection';
import InquiryForm from './components/InquiryForm';
import Lightbox from './components/Lightbox';
import Footer from './components/Footer';
import { ARTWORKS } from './data';
import { Artwork } from './types';
import { Sparkles, Heart, ShieldCheck, Mail, ChevronRight, MessageSquare, Compass, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('portfolio');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleNextArtwork = () => {
    if (!selectedArtwork) return;
    const currentIndex = ARTWORKS.findIndex((art) => art.id === selectedArtwork.id);
    const nextIndex = (currentIndex + 1) % ARTWORKS.length;
    setSelectedArtwork(ARTWORKS[nextIndex]);
  };

  const handlePrevArtwork = () => {
    if (!selectedArtwork) return;
    const currentIndex = ARTWORKS.findIndex((art) => art.id === selectedArtwork.id);
    const prevIndex = (currentIndex - 1 + ARTWORKS.length) % ARTWORKS.length;
    setSelectedArtwork(ARTWORKS[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark flex flex-col selection:bg-brand-teal/20 selection:text-brand-teal">
      {/* Navbar navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          {activeTab === 'portfolio' && (
            <motion.div
              key="portfolio-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* --- HERO / FEATURED MASTERPIECE SECTION --- */}
              <section id="hero-showcase" className="relative pt-12 pb-24 md:py-32 overflow-hidden bg-brand-bg">
                {/* Visual subtle ambient background elements */}
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-teal/5 rounded-full filter blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-brand-gold/5 rounded-full filter blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                  
                  {/* Left Hero Side: High-End Typography */}
                  <div className="lg:col-span-6 space-y-8 text-left">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
                        <span className="font-sans text-[10px] tracking-[0.3em] text-brand-teal font-extrabold uppercase">
                          MANHWA & HIGH-FANTASY ILLUSTRATION
                        </span>
                      </div>
                      
                      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-primary leading-[1.05]">
                        The Alchemic Lines
                      </h1>
                      <p className="font-serif text-xl md:text-2xl text-brand-teal font-light italic">
                        "Curated expressions of myth, destiny, and cosmic armor."
                      </p>
                    </div>

                    <p className="font-sans text-brand-dark/70 text-sm md:text-base leading-relaxed max-w-lg">
                      Selamat datang di ruang aliansi seni Rosalia Arts. Temukan koleksi lukisan digital berkualitas tinggi, halaman promosi komik mingguan, desain sampul novel, dan ilustrasi chibi yang menggabungkan presisi garis dengan kehangatan warna.
                    </p>

                    {/* High-End Quick Interaction Stats */}
                    <div className="grid grid-cols-3 gap-6 py-6 border-y border-brand-border/60 max-w-md">
                      <div>
                        <span className="font-serif text-2xl font-black text-brand-primary block">
                          50+
                        </span>
                        <span className="font-sans text-[10px] tracking-wider text-brand-dark/50 font-bold block mt-1">
                          COVERS DONE
                        </span>
                      </div>
                      <div>
                        <span className="font-serif text-2xl font-black text-brand-primary block text-brand-teal">
                          OPEN
                        </span>
                        <span className="font-sans text-[10px] tracking-wider text-brand-dark/50 font-bold block mt-1">
                          COMMISSIONS
                        </span>
                      </div>
                      <div>
                        <span className="font-serif text-2xl font-black text-brand-primary block text-brand-gold-dark">
                          Indonesia
                        </span>
                        <span className="font-sans text-[10px] tracking-wider text-brand-dark/50 font-bold block mt-1">
                          ARTIST BASE
                        </span>
                      </div>
                    </div>

                    {/* CTA Actions */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        onClick={() => {
                          const el = document.getElementById('portfolio-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="font-sans text-xs font-bold uppercase tracking-wider bg-brand-primary hover:bg-brand-primary/90 text-white px-7 py-4 rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-2"
                      >
                        Explore Gallery
                        <ChevronRight size={14} />
                      </button>
                      <button
                        onClick={() => setActiveTab('commissions')}
                        className="font-sans text-xs font-bold uppercase tracking-wider bg-white hover:bg-brand-surface-low text-brand-teal border border-brand-teal/20 px-7 py-4 rounded-lg transition-all cursor-pointer flex items-center gap-2"
                      >
                        Inquire Slot
                        <Sparkles size={13} className="text-brand-gold animate-bounce" />
                      </button>
                    </div>
                  </div>

                  {/* Right Hero Side: Elegant Masterpiece Display */}
                  <div className="lg:col-span-6 relative flex justify-center">
                    <div 
                      id="hero-featured-canvas"
                      className="group relative max-w-md w-full aspect-[3/4] rounded-xl overflow-hidden border border-brand-border/60 shadow-2xl transition-all duration-500 cursor-pointer"
                      onClick={() => setSelectedArtwork(ARTWORKS[0])}
                    >
                      {/* Masterpiece visual */}
                        <img
                          src={`${import.meta.env.BASE_URL}assets/Rosalia_arts/kuro no tenshi ossa.jpg`}
                          alt="Masterpiece - Crows' Descent"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                          referrerPolicy="no-referrer"
                        />
                      {/* Absolute Bottom banner overlay representing the gold theme */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/50 to-transparent p-6 pt-16 flex flex-col justify-end text-white text-left">
                        <span className="font-sans text-[9px] tracking-[0.2em] text-brand-gold font-black uppercase">
                          ACTIVE MASTERPIECE
                        </span>
                        <h2 className="font-serif text-2xl font-bold tracking-tight text-white mt-1">
                          Crows' Descent
                        </h2>
                        <p className="font-sans text-xs text-white/70 line-clamp-2 mt-2 leading-relaxed">
                          Saksikan kemegahan bayang-bayang kegelapan dan bulu gagak obsidian yang mempesona di dalam lukisan digital orisinal karya Rosalia Arts.
                        </p>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10 text-[10px] font-mono text-brand-gold/90">
                          <span>Year: 2026</span>
                          <span className="underline group-hover:text-white transition-colors flex items-center gap-1">
                            VIEW DETAILS
                            <ChevronRight size={10} />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Backdrop Golden frame to represent the premium alchemic theme */}
                    <div className="absolute -inset-4 border border-brand-gold/15 pointer-events-none rounded-2xl -z-10 -translate-x-3 translate-y-3 hidden md:block" />
                  </div>

                </div>
              </section>

              {/* Grid Gallery */}
              <ArtworkGrid onSelectArtwork={setSelectedArtwork} />
            </motion.div>
          )}

          {activeTab === 'series' && (
            <motion.div
              key="series-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <SeriesShowcase />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <AboutSection />
            </motion.div>
          )}

          {activeTab === 'commissions' && (
            <motion.div
              key="commissions-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <InquiryForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Lightbox details view */}
      <AnimatePresence>
        {selectedArtwork && (
          <Lightbox
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
            onNext={handleNextArtwork}
            onPrev={handlePrevArtwork}
          />
        )}
      </AnimatePresence>

      {/* Footer copyright & subscription */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
