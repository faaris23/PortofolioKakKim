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
    description: ' An elegant digital painting capturing the quiet, dramatic art for the guardian maidens and the god of the earth, Terravox.',
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
    description: 'The official cover illustration for a fantasy web novel, Fantasy Romance genre story about hope with elegant manhwa steyl and elegant main character leading eachother on their shoulders',
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
    description: 'A cover for the highschool love story, with warmth art and lighting for romantic-comedy school vibe.',
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
    id: 'prismatic',
    title: 'Prismatic',
    subtitle: 'COMIC PROJECT',
    description: 'A cover for the highschool love story, with warmth art and lighting for romantic-comedy school vibe.',
    mainImageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Compressed/Prismatic-december-ART.webp`,
    externalUrl: 'https://www.webtoons.com/id/canvas/prismatic/list?title_no=964968',
    archivedCount: 1,
    tags: ['Comic', 'Fantasy', 'Prismatic'],
    artworks: [
      {
        title: 'Prismatic',
        role: 'COMIC COVER / 2024',
        year: '2024',
        imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Compressed/Prismatic-december-ART.webp`
      }
    ]
  },
  {
    id: 'honkai-star-rail-school-life',
    title: 'Honkai Star Rail: School Life',
    subtitle: 'COMIC PROJECT',
    description: 'A story of the main characters of Honkai: Star Rail in their school life, with a focus on humor and slice-of-life moments.',
    mainImageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Compressed/Cover-comic-Kyris-1.webp`,
    externalUrl: 'https://www.instagram.com/p/C8yyIAFS1mF/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==',
    archivedCount: 1,
    tags: ['Honkai: Star Rail', 'School Life', 'Fan Comic'],
    artworks: [
      {
        title: 'Honkai Star Rail: School Life',
        role: 'COMIC COVER / 2024',
        year: '2024',
        imageUrl: `${import.meta.env.BASE_URL}Rosalia_arts/Compressed/Cover-comic-Kyris-1.webp`
      }
    ]
  }
];