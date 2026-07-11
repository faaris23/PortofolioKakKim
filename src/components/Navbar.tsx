import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Twitter, MessageSquare, ExternalLink } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'portfolio', label: 'PORTFOLIO' },
    { id: 'series', label: 'SERIES ARCHIVE' },
    { id: 'about', label: 'ABOUT' },
    { id: 'commissions', label: 'COMMISSION & INQUIRY' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-bg/90 backdrop-blur-md border-b border-brand-border py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <button
            id="logo-button"
            onClick={() => setActiveTab('portfolio')}
            className="flex flex-col items-start text-left focus:outline-none group"
          >
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-brand-primary group-hover:text-brand-teal transition-colors">
              Rosalia Arts
            </span>
            <span className="font-sans text-[10px] tracking-[0.2em] text-brand-teal/80 font-semibold uppercase mt-0.5">
              Digital Illustrator
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative font-sans text-xs font-semibold tracking-[0.12em] py-2 transition-colors duration-200 focus:outline-none ${
                    activeTab === item.id
                      ? 'text-brand-primary'
                      : 'text-brand-dark/60 hover:text-brand-primary'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-teal rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Social Icons / Quick VGen links */}
            <div className="flex items-center space-x-4 border-l border-brand-border pl-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                id="social-instagram-nav"
                className="text-brand-dark/60 hover:text-brand-teal transition-colors"
                title="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://x.com/theabags_1399?s=20"
                target="_blank"
                rel="noreferrer"
                id="social-twitter-nav"
                className="text-brand-dark/60 hover:text-brand-teal transition-colors"
                title="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://vgen.co"
                target="_blank"
                rel="noreferrer"
                id="social-vgen-nav"
                className="text-brand-dark/60 hover:text-brand-teal transition-colors flex items-center gap-1 text-[11px] font-bold"
                title="VGen Commissions"
              >
                <span className="font-sans tracking-wider">VGEN</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-primary hover:text-brand-teal p-1 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden absolute top-full left-0 right-0 bg-brand-bg/95 backdrop-blur-lg border-b border-brand-border py-6 px-8 animate-fade-in shadow-lg"
        >
          <div className="flex flex-col space-y-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`text-left font-sans text-sm font-semibold tracking-wider py-1 ${
                  activeTab === item.id
                    ? 'text-brand-teal pl-2 border-l-2 border-brand-teal'
                    : 'text-brand-dark/70 hover:text-brand-primary'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="h-[1px] bg-brand-border my-2" />

            <div className="flex items-center space-x-6 py-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-brand-dark/60 hover:text-brand-teal transition-colors flex items-center gap-2 text-xs font-medium"
              >
                <Instagram size={16} />
                <span>Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-brand-dark/60 hover:text-brand-teal transition-colors flex items-center gap-2 text-xs font-medium"
              >
                <Twitter size={16} />
                <span>Twitter</span>
              </a>
              <a
                href="https://vgen.co"
                target="_blank"
                rel="noreferrer"
                className="text-brand-dark/60 hover:text-brand-teal transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                <span>VGen</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
