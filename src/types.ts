export interface Artwork {
  id: string;
  title: string;
  category: 'Art' | 'Comic/Novel Cover' | 'Comic' | 'Chibi';
  imageUrl: string;
  description?: string;
  year: string;
  aspectRatio: '3:4' | '4:3' | '1:1' | '16:9';
  medium?: string;
  tags?: string[];
}

export interface StorySeries {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mainImageUrl: string;
  archivedCount: number;
  tags: string[];
  artworks: {
    title: string;
    role: string;
    year: string;
    imageUrl: string;
  }[];
}

export interface InquiryMessage {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  description: string;
}
