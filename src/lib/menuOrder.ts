import { MenuChapter, MenuExtra, MenuItem, CartItem, PastaType } from '../types';
import { Language } from '../i18n/types';

export const pastaTypes: readonly PastaType[] = ['Spaghetti', 'Penne', 'Tagliatelle', 'Torsades', 'Linguine'];

export const pastaLabels = {
  fr: { required: 'Type de pâtes (obligatoire)', missing: 'Choisissez un type de pâtes pour ce plat.' },
  en: { required: 'Pasta type (required)', missing: 'Choose a pasta type for this dish.' },
  ar: { required: 'نوع المعكرونة (إجباري)', missing: 'اختر نوع المعكرونة لهذا الطبق.' },
  nl: { required: 'Pastasoort (verplicht)', missing: 'Kies een pastasoort voor dit gerecht.' },
};

export function needsPastaType({ item, pastaType }: CartItem): boolean {
  return item.category === 'pates' && !pastaType;
}

export const extraLabels = {
  fr: { optional: 'Suppléments facultatifs', add: 'Ajouter', save: 'Mettre à jour', edit: 'Modifier' },
  en: { optional: 'Optional extras', add: 'Add', save: 'Update', edit: 'Edit' },
  ar: { optional: 'إضافات اختيارية', add: 'إضافة', save: 'تحديث', edit: 'تعديل' },
  nl: { optional: 'Optionele extra’s', add: 'Toevoegen', save: 'Bijwerken', edit: 'Wijzigen' },
};

export function browseMenuChapters(chapters: MenuChapter[]): MenuChapter[] {
  return chapters.flatMap((chapter) => {
    const categories = chapter.categories.filter((category) => !category.optionsOnly);
    return categories.length ? [{ ...chapter, categories }] : [];
  });
}

const categoriesByGroup = {
  'accompagnements-supplements': ['petits-dejeuners', 'brunches', 'tartines', 'croques', 'omelettes'],
  'supplements-sales': ['entrees-froides', 'entrees-chaudes', 'salades', 'risottos', 'burgers', 'viandes', 'ribs', 'plats-marocains'],
  'supplements-pizzas': ['pizzas'],
  'supplements-sucres': ['desserts', 'crepes', 'gaufres-liegeoises', 'glaces'],
};

export function menuExtras(item: MenuItem, chapters: MenuChapter[], lang: Language): MenuExtra[] {
  const categories = chapters.flatMap(({ categories }) => categories);
  if (item.category === 'pates') {
    const soda = categories.find(({ id }) => id === 'boissons-fraiches')?.items
      .find(({ id }) => id === 'boissons-fraiches-soda');
    return soda ? [{ id: soda.id, name: soda.name, price: soda.price }] : [];
  }
  const group = Object.entries(categoriesByGroup).find(([, categories]) => categories.includes(item.category))?.[0];
  if (!group) return [];
  const extras = (categories.find(({ id }) => id === group)?.items ?? []).map(({ id, name, price }) => ({ id, name, price }));
  if (group !== 'accompagnements-supplements') return extras;
  const breakfast = categories.find(({ id }) => id === 'a-la-carte-pain')?.items ?? [];
  const aLaCarteExtras = breakfast.filter(({ id }) => id !== 'trio-marocain');
  const trio = breakfast.find(({ id }) => id === 'trio-marocain');
  const breadNames = lang === 'ar' ? ['حرشة', 'مسمن', 'بغرير'] : ['Harcha', 'Msemen', 'Baghrir'];
  return [
    ...(trio ? breadNames.map((name, index) => ({ id: 'morning-bread-' + index, name, price: trio.price })) : []),
    ...extras,
    ...aLaCarteExtras.map(({ id, name, price }) => ({ id, name, price })),
  ];
}

export function cartLineKey({ item, pastaType, extras = [] }: CartItem): string {
  return [item.id, ...(pastaType ? [pastaType] : []), ...extras.map(({ id }) => id).sort()].join(':');
}

export function unitPrice({ item, extras = [] }: CartItem): number {
  return extras.reduce((total, { price }) => total + price, item.price);
}

export function lineTotal(line: CartItem): number {
  return unitPrice(line) * line.quantity;
}

export function restoreCart(raw: unknown, chapters: MenuChapter[], lang: Language = 'fr'): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const catalogue = new Map(chapters.flatMap(({ categories }) =>
    categories.flatMap(({ items }) => items.map((item) => [item.id, item] as const))));
  const restored = new Map<string, CartItem>();
  for (const saved of raw) {
    const item = catalogue.get(saved?.item?.id);
    if (!item || !Number.isSafeInteger(saved.quantity) || saved.quantity <= 0) continue;
    const ids = new Set(Array.isArray(saved.extras) ? saved.extras.map((extra: unknown) =>
      (extra as { id?: string } | null)?.id) : []);
    const extras = menuExtras(item, chapters, lang).filter(({ id }) => ids.has(id));
    const pastaType = item.category === 'pates' ? pastaTypes.find((type) => type === saved.pastaType) : undefined;
    const line = { item, extras, pastaType, quantity: saved.quantity };
    const key = cartLineKey(line);
    const existing = restored.get(key);
    if (existing) existing.quantity += line.quantity;
    else restored.set(key, line);
  }
  return [...restored.values()];
}
