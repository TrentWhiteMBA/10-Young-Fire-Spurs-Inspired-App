export interface BibleBook {
  id: string;
  name: string;
  testament: 'OT' | 'NT';
  totalChapters: number;
  section?: string;
  purpose?: string;
}

export interface VerseItem {
  verseNumber: number;
  text: string;
}

export interface HighlightColor {
  id: string;
  name: string;
  dotColor: string;
  bgClass: string;
  borderClass: string;
  starColor: string;
}

export interface BibleTranslation {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
}

export interface BookmarkedVerse {
  id: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  translation?: string;
  color?: string;
  highlightColor?: string;
  savedAt?: string;
  type?: string;
  note?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}
