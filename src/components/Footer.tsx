import React, { useState, useEffect } from 'react';
import { Mail, Instagram, Twitter, MessageSquare, ArrowUp, Send, CheckCircle } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);

  useEffect(() => {
    const subs = localStorage.getItem('aurelia_subscribers');
    if (subs) {
      try {
        setSubscribersCount(JSON.parse(subs).length);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const existing = localStorage.getItem('aurelia_subscribers');
    let list: string[] = [];
    if (existing) {
      try {
        list = JSON.parse(existing);
      } catch (e) {
        console.error(e);
      }
    }

    if (!list.includes(email)) {
      list.push(email);
      localStorage.setItem('aurelia_subscribers', JSON.stringify(list));
      setSubscribersCount(list.length);
    }

    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start pb-16 border-b border-white/10">
          
          {/* Logo & Description */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white">
              Rosalia Arts
            </h3>
            <p className="font-sans text-xs text-white/60 leading-relaxed max-w-sm">
              An elegant space showcasing high-fantasy digital paintings, web novel covers, comic spreads, and custom character illustration commissions.
            </p>
            {/* Quick social links */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-white/60 hover:text-brand-gold transition-colors"
                title="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-white/60 hover:text-brand-gold transition-colors"
                title="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://vgen.co"
                target="_blank"
                rel="noreferrer"
                className="text-white/60 hover:text-brand-gold font-sans text-xs font-bold transition-colors"
                title="VGen Commissions"
              >
                VGEN
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <span className="font-sans text-[10px] tracking-wider text-white/40 font-bold block">
                NAVIGATE
              </span>
              <ul className="font-sans text-xs space-y-2.5">
                <li>
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    Gallery Portfolio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('series')}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    Series Archives
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('about')}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    About Artist
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('commissions')}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    Commission & Price
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <span className="font-sans text-[10px] tracking-wider text-white/40 font-bold block">
                EXTERNAL
              </span>
              <ul className="font-sans text-xs space-y-2.5 text-white/60">
                <li>
                  <a
                    href="https://vgen.co"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    VGen Commission Page
                  </a>
                </li>
                <li>
                  <a
                    href="https://artstation.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    ArtStation Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="https://email.com"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    Direct Email Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter subscription form */}
          <div className="md:col-span-4 space-y-4" id="newsletter-subscription-panel">
            <span className="font-sans text-[10px] tracking-wider text-white/40 font-bold block">
              CHRONICLES NEWSLETTER
            </span>
            <p className="font-sans text-xs text-white/60 leading-relaxed">
              Dapatkan email berkala ketika slot komisi baru dibuka atau seri baru dirilis.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-brand-gold bg-brand-gold/10 border border-brand-gold/20 p-3 rounded text-xs">
                <CheckCircle size={16} />
                <span>Subscribed! Local archive updated. ({subscribersCount})</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@chronicle.com"
                  required
                  className="bg-white/10 border border-white/15 rounded px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-brand-gold flex-grow"
                />
                <button
                  type="submit"
                  className="bg-brand-gold hover:bg-brand-gold/90 text-brand-primary p-2 rounded transition-all cursor-pointer"
                  title="Subscribe"
                >
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Bottom copyright and scroll up */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="font-sans text-[10px] text-white/40">
            © {new Date().getFullYear()} Rosalia Arts. All rights reserved. Designed with alchemical care.
          </span>
          <button
            onClick={scrollToTop}
            id="scroll-to-top-btn"
            className="group font-sans text-[10px] font-bold tracking-wider text-white/60 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            BACK TO HIGHLIGHTS
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
