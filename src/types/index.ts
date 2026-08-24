export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isFridaySpecial?: boolean;
  tag?: string;
  image?: string;
  category: string;
  chapter: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  chapterId: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuChapter {
  id: string;
  title: string;
  subtitle: string;
  timeSlot?: string;
  iconName?: string;
  categories: MenuCategory[];
}

export interface Review {
  id: string;
  author: string;
  role: string;
  quote: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'lieu' | 'brunch' | 'cuisine' | 'douceurs' | 'atmosphere';
  image: string;
  span?: string;
}
