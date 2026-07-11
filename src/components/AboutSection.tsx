import React from 'react';
import { PenTool, Laptop, BookOpen, Sparkles, Award, Heart } from 'lucide-react';

export default function AboutSection() {
  const tools = [
    {
      name: 'Clip Studio Paint',
      detail: 'Main drawing & comic lineart',
      proof: 'Digunakan untuk menyelesaikan 30+ halaman webtoon beresolusi tinggi, pembuatan kuas kustom, dan pengerjaan lineart vektor yang sangat presisi.'
    },
    {
      name: 'Adobe Photoshop',
      detail: 'Color grading & atmospheric painting',
      proof: 'Dimanfaatkan untuk manipulasi pencahayaan tingkat lanjut, koreksi warna atmosferik sampul novel, dan pemrosesan akhir file cetak 300 DPI.'
    },
    {
      name: 'Procreate',
      detail: 'Concept sketching & chibis',
      proof: 'Pendukung utama dalam pembuatan sketsa cepat, eksplorasi komposisi cerita (thumbnailing), serta seluruh pengerjaan pesanan ilustrasi chibi.'
    },
    {
      name: 'Wacom Cintiq Pro 24',
      detail: 'Primary hardware display',
      proof: 'Perangkat keras utama dengan kalibrasi warna sRGB penuh untuk menjamin akurasi warna yang konsisten antara layar digital dan hasil cetak.'
    },
  ];

  const milestones = [
    { year: '2023 - Present', text: 'Lead cover artist for several Korean web novels (fantasy genre)' },
    { year: '2022', text: 'Serialized independent full-color comic "Neural Overdrive"' },
    { year: '2021', text: 'VGen certified designer and premium chibi illustrator' },
  ];

  return (
    <section id="about-section" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Portrait & Artistic Canvas Frame */}
          <div className="lg:col-span-5 relative" id="about-portrait-frame">
            {/* Main Portrait Frame */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-brand-border/60 bg-brand-surface-low shadow-xl">
              <img
                src="assets/Rosalia_arts/Compressed/Profile_1.webp"
                alt="Rosalia Arts - Profile Portrait"
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Glassmorphism Name Tag Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md border border-white/20 p-5 rounded-lg shadow-lg">
                <span className="font-sans text-[9px] tracking-[0.25em] text-brand-teal font-extrabold block">
                  THE ALCHEMIST
                </span>
                <h4 className="font-serif text-xl font-bold text-brand-primary mt-1">
                  Rosalia
                </h4>
                <p className="font-sans text-[11px] text-brand-dark/70 mt-1">
                  Indonesia-based Digital Illustrator & Character Designer
                </p>
              </div>
            </div>

            {/* Aesthetic Gold Framing Box behind portrait */}
            <div className="absolute -top-6 -left-6 w-full h-full border-t border-l border-brand-gold/25 rounded-lg -z-10 pointer-events-none hidden lg:block" />
            <div className="absolute -bottom-6 -right-6 w-full h-full border-b border-r border-brand-gold/25 rounded-lg -z-10 pointer-events-none hidden lg:block" />
          </div>

          {/* Right Column: Bio & Alchemy of Creation */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="font-sans text-[10px] tracking-[0.3em] text-brand-teal font-bold uppercase block mb-3">
                ARTIST PROFILE
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-brand-primary">
                Halo, Saya Rosalia.
              </h2>
              <p className="font-serif text-lg text-brand-teal/80 italic mt-3">
                "Connecting transient reality and celestial dreamscapes through precise ink and golden hues."
              </p>
            </div>

            <div className="space-y-6 font-sans text-brand-dark/80 text-sm md:text-base leading-relaxed">
              <p>
                Saya adalah seorang ilustrator digital yang mendedikasikan sebagian besar perjalanan seni saya pada visualisasi fantasi tingkat tinggi, manhwa, dan desain karakter orisinal. Dengan memadukan garis kuas yang bersih serta kedalaman warna yang kaya, saya mencoba menangkap ketegangan, kemuliaan, dan emosi yang tertimbun di dalam setiap tokoh cerita.
              </p>
              <p>
                Karya-karya saya terinspirasi oleh mitologi kuno, konflik takhta kerajaan, dan keajaiban tekno-siber. Sepanjang karier, saya telah membantu mendesain puluhan sampul novel web, promo komik mingguan, serta ilustrasi chibi yang penuh kehangatan.
              </p>
            </div>

            {/* Milestones / Chronicles */}
            <div className="space-y-4 pt-4 border-t border-brand-border/60">
              <h3 className="font-serif text-lg font-bold text-brand-primary flex items-center gap-2">
                <Award size={18} className="text-brand-gold" />
                Saga Chronicles
              </h3>
              <div className="space-y-3">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="font-mono text-xs font-bold text-brand-teal min-w-[100px] pt-0.5">
                      {m.year}
                    </span>
                    <span className="font-sans text-xs md:text-sm text-brand-dark/70">
                      {m.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alchemy of Creation (Software & Hardware Specifications) */}
            <div className="space-y-5 pt-6 border-t border-brand-border/60">
              <h3 className="font-serif text-lg font-bold text-brand-primary flex items-center gap-2">
                <Laptop size={18} className="text-brand-teal" />
                Alchemy of Creation (Tools & Hardware)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {tools.map((tool, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-brand-border/40 bg-brand-surface-low/30 hover:border-brand-teal/40 transition-colors space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-sans text-xs font-bold text-brand-primary block">
                          {tool.name}
                        </span>
                        <span className="font-sans text-[10px] text-brand-teal font-medium uppercase tracking-wider block mt-0.5">
                          {tool.detail}
                        </span>
                      </div>
                    </div>
                    <p className="font-sans text-xs text-brand-dark/70 leading-relaxed pt-1 border-t border-brand-border/30">
                      {tool.proof}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
