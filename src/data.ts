import { Artwork, StorySeries } from './types';

export const ARTWORKS: Artwork[] = [
  // --- ART CATEGORY ---
  {
    id: 'art-1',
    title: "Crows' Descent",
    category: 'Art',
    imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Compressed/kuro-no-tenshi-ossa.webp`,
    description: 'An elegant digital painting capturing the quiet, dramatic descent of a dark princess under a flock of crows, featuring rich fabric textures and floating obsidian feathers.',
    year: '2026',
    aspectRatio: '3:4',
    medium: 'Digital Painting (Clip Studio Paint)',
    tags: ['Masterpiece', 'Illustration', 'Artistic Composition']
  },
  {
    id: 'art-2',
    title: 'Arjuna Ramayana',
    category: 'Art',
    imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Compressed/Arjuna-front.webp`,
    description: 'A majestic high-fantasy warrior character adorned with intricate golden ornaments, sashes, and ethereal lighting that highlights the detailed manhwa-style lineart.',
    year: '2024',
    aspectRatio: '3:4',
    medium: 'Digital Painting (Photoshop)',
    tags: ['Concept Art', 'Manhwa Style', 'Royal Armor']
  },
  {
    id: 'art-3',
    title: 'Prince Arka: The Formal Guard',
    category: 'Art',
    imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Compressed/ARKA-PRINCE-ATTIRE.webp`,
    description: 'A regal portrait of Prince Arka in his formal military court attire, framed in ornate gold filigree background, radiating power and hidden resolve.',
    year: '2024',
    aspectRatio: '3:4',
    medium: 'Digital Painting (Clip Studio Paint)',
    tags: ['The Crimson Kingdom', 'Portrait', 'Web Novel Art']
  },
  {
    id: 'art-4',
    title: "Dan Heng and Stelles Blossoom",
    category: 'Art',
    imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Compressed/DanStelle.webp`,
    description: 'An elegant digital painting capturing the quiet, dramatic descent of a dark princess under a flock of crows, featuring rich fabric textures and floating obsidian feathers.',
    year: '2024',
    aspectRatio: '3:4',
    medium: 'Digital Painting (Clip Studio Paint)',
    tags: ['Fan Fiction', 'Illustration', 'Honkai: Star Rail']
  },

  // --- COMIC/NOVEL COVER ---
  {
    id: 'cover-1',
    title: 'Hope/For Tomorrow',
    category: 'Comic/Novel Cover',
    imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Compressed/Cover_art_1.webp`,
    description: 'The official cover illustration for a fantasy web novel, depicting a giant ancient stone sentinel emitting magical energy, with two tiny travelers looking up in awe.',
    year: '2024',
    aspectRatio: '3:4',
    medium: 'Digital Painting (Photoshop)',
    tags: ['Web Novel Cover', 'Environment Painting', 'Epic Scale']
  },
  {
    id: 'cover-2',
    title: 'PRISMATIC',
    category: 'Comic/Novel Cover',
    imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Compressed/Prismatic-december-ART.webp`,
    description: 'A striking cover featuring a split-face lighting effect on an elf girl wearing a modern digital headset, showing the contrast between organic fantasy and cold synth magic.',
    year: '2024',
    aspectRatio: '3:4',
    medium: 'Digital Painting (Procreate)',
    tags: ['Book Cover', 'Cyber Fantasy', 'Lighting Study']
  },

  // --- COMIC ---
  {
    id: 'comic-1',
    title: 'Honkai Star Rail: The School Life',
    category: 'Comic',
    imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Compressed/Cover-comic-Kyris-1.webp`,
    description: 'Action scene key frame illustration showing a cyberpunk protagonist in a dark tech-hoodie amidst digital glitch shards and vibrant neon lighting grids.',
    year: '2024',
    aspectRatio: '3:4',
    medium: 'Webtoon Panel (Clip Studio Paint)',
    tags: ['School Life', 'Doujinshi', 'Fan Comic']
  },

  // --- CHIBI ---
  {
    id: 'chibi-1',
    title: 'Honkai Teachers',
    category: 'Chibi',
    imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Chibi_1.jpg`,
    description: 'The characters from Honkai: Star Rail as Teachers in a whimsical chibi style.',
    year: '2024',
    aspectRatio: '1:1',
    medium: 'Chibi Art (Procreate)',
    tags: ['Slice of Life', 'Chibi', 'Cute']
  },
  {
    id: 'chibi-2',
    title: 'Main Characters Chibi mode',
    category: 'Chibi',
    imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Chibi_2.jpg`,
    description: 'The Main Cast of Honkai: Star Rail as highschool students in their chibi forms.',
    year: '2024',
    aspectRatio: '1:1',
    medium: 'Chibi Art (Clip Studio Paint)',
    tags: ['Couple Art', 'Wedding Art', 'Chibi']
  },
  {
    id: 'chibi-3',
    title: 'Star Rail Student Chibis',
    category: 'Chibi',
    imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Chibi_3.png`,
    description: 'A collection of adorable chibi illustrations featuring various student characters from the Honkai: Star Rail universe.',
    year: '2024',
    aspectRatio: '1:1',
    medium: 'Chibi Art (Procreate)',
    tags: ['Commission', 'Romantic', 'Cherry Blossom']
  },
  {
    id: 'chibi-4',
    title: 'Star Rail Student Chibis 2',
    category: 'Chibi',
    imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Chibi_4.png`,
    description: 'A second collection of charming chibi illustrations showcasing additional student characters from the Honkai: Star Rail universe.',
    year: '2024',
    aspectRatio: '1:1',
    medium: 'Concept Reference Sheet (Photoshop)',
    tags: ['Reference Sheet', 'Character Design', 'Outfit Details']
  }
];

export const STORIES_SERIES: StorySeries[] = [
  {
    id: 'crimson-kingdom',
    title: 'The Crimson Kingdom',
    subtitle: 'CURATED WORLDS',
    description: 'A high-fantasy narrative exploring the intricate court politics and forbidden magic of a realm fractured by celestial lineage. Each piece captures a moment of tension between legacy and desire, weaving ornate manhwa lines with majestic light.',
    mainImageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    archivedCount: 14,
    tags: ['High Fantasy', 'Royal Politics', 'Court Drama'],
    artworks: [
      {
        title: 'Prince Arka: The Formal Guard',
        role: 'CHARACTER STUDY / 2024',
        year: '2024',
        imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80'
      },
      {
        title: 'The Silent Promenade',
        role: 'BACKGROUND CONCEPT / 2024',
        year: '2024',
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'digital-echoes',
    title: 'Digital Echoes',
    subtitle: 'ONGOING STORIES',
    description: 'An exploration of transhumanism and memory in a post-biological world. These illustrations contrast cold, geometric structures and bright neon cybernetic augmentation with the soft, organic remnants of human emotion.',
    mainImageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    archivedCount: 8,
    tags: ['Cyberpunk', 'Transhumanism', 'Sci-Fi'],
    artworks: [
      {
        title: 'Fragmented Reality 01',
        role: 'KEY ART / 2023',
        year: '2023',
        imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'
      },
      {
        title: 'The Last Connection',
        role: 'ILLUSTRATION / 2023',
        year: '2023',
        imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80'
      }
    ]
  }
];