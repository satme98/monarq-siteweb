import { MenuChapter, MenuItem } from '../types';
import catalogue from './menuCatalogue.json';

export const menuChapters: MenuChapter[] = catalogue;

const featured = [
  { itemId: 'le-monarq', image: '/images/photographer/_DSC6976.jpg', objectPosition: 'center 55%' },
  { itemId: 'facon-manhattan', image: '/images/photographer/_DSC7015.jpg', objectPosition: 'center 55%' },
  { itemId: 'bagel-au-saumon', image: '/images/photographer/_DSC6992.jpg', objectPosition: 'center 55%' },
  { itemId: 'moroccan-touch', image: '/images/photographer/_DSC6971-Modifier.jpg', objectPosition: 'center 60%' },
  { itemId: 'un-dimanche-a-paris', image: '/images/photographer/_DSC7007.jpg', objectPosition: 'center 55%' },
  { itemId: 'pates-monarq-crevettes', image: '/images/photographer/_DSC7083.jpg', objectPosition: 'center 55%' },
  { itemId: 'tagliatelle-salmone', image: '/images/photographer/_DSC110.jpg', objectPosition: 'center 50%' },
  { itemId: 'ribs-miel', image: '/images/photographer/_DSC7063.jpg', objectPosition: 'center 55%' },
  { itemId: 'burger-bacon', image: '/images/photographer/_DSC7124.jpg', objectPosition: 'center 55%' },
  { itemId: 'salade-burrata', image: '/images/photographer/_DSC7052.jpg', objectPosition: 'center 55%' },
  { itemId: 'pizza-carnivore', image: '/images/photographer/_DSC7048.jpg', objectPosition: 'center 50%' },
  { itemId: 'tajine-viande-pruneaux', image: '/images/photographer/_DSC7096.jpg', objectPosition: 'center 60%' },
];

export const signatureHighlights = featured.map((highlight) => {
  const chapter = menuChapters.find(({ categories }) =>
    categories.some(({ items }) => items.some(({ id }) => id === highlight.itemId)))!;
  const category = chapter.categories.find(({ items }) => items.some(({ id }) => id === highlight.itemId))!;
  const dish = category.items.find(({ id }) => id === highlight.itemId)!;
  return {
    ...highlight,
    name: dish.name,
    description: dish.description ?? '',
    price: dish.price,
    category: category.name,
    menuChapter: chapter.id,
    menuCategory: category.id,
  };
});
