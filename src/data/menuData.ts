import { MenuChapter, MenuItem } from '../types';
import catalogue from './menuCatalogue.json';

export const menuChapters: MenuChapter[] = catalogue;

const featured = [
  { itemId: 'le-monarq', image: '/website-images/dishes/_DSC6976.webp', objectPosition: 'center 55%' },
  { itemId: 'facon-manhattan', image: '/website-images/dishes/_DSC7015.webp', objectPosition: 'center 55%' },
  { itemId: 'bagel-au-saumon', image: '/website-images/dishes/_DSC6992.webp', objectPosition: 'center 55%' },
  { itemId: 'moroccan-touch', image: '/website-images/dishes/_DSC6971-Modifier.webp', objectPosition: 'center 60%' },
  { itemId: 'un-dimanche-a-paris', image: '/website-images/dishes/_DSC7007.webp', objectPosition: 'center 55%' },
  { itemId: 'pates-monarq-crevettes', image: '/website-images/dishes/_DSC7083.webp', objectPosition: 'center 55%' },
  { itemId: 'tagliatelle-salmone', image: '/website-images/dishes/_DSC110.webp', objectPosition: 'center 50%' },
  { itemId: 'ribs-miel', image: '/website-images/dishes/_DSC7063.webp', objectPosition: 'center 55%' },
  { itemId: 'burger-bacon', image: '/website-images/dishes/_DSC7124.webp', objectPosition: 'center 55%' },
  { itemId: 'salade-burrata', image: '/website-images/dishes/_DSC7052.webp', objectPosition: 'center 55%' },
  { itemId: 'pizza-carnivore', image: '/website-images/dishes/_DSC7048.webp', objectPosition: 'center 50%' },
  { itemId: 'tajine-viande-pruneaux', image: '/website-images/dishes/_DSC7096.webp', objectPosition: 'center 60%' },
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
