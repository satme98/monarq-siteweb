import { galleryChapters, galleryItems, photoDetails } from '../data/galleryData';
import { GalleryItem } from '../types';
import { Language } from './types';

type LangKey = 'en' | 'ar' | 'nl';

const chapterTranslations: Record<
  LangKey,
  Record<string, { label: string; title: string; description: string }>
> = {
  en: {
    'le-lieu': {
      label: 'The Space',
      title: 'The Space',
      description: 'Beneath the glass roof, marble and warm woodwork shape a serene haven in the heart of Tangier.',
    },
    'les-brunchs': {
      label: 'Brunches',
      title: 'Grand Brunches',
      description: 'Warm pancakes, fragrant mint tea and the pleasure of taking your time.',
    },
    'la-cuisine': {
      label: 'The Kitchen',
      title: 'The Kitchen',
      description: 'From caramelized beef ribs to preserved-lemon tagine, generous plates crafted for sharing.',
    },
    'cafe-douceurs': {
      label: 'Coffee & Sweets',
      title: 'Coffee & Sweets',
      description: 'A specialty coffee, a few spoonfuls of tiramisu and one last reason to linger at the table.',
    },
  },
  ar: {
    'le-lieu': {
      label: 'المكان',
      title: 'المكان',
      description: 'تحت القبة الزجاجية، يرسم الرخام والخشب الدافئ ملاذاً أنيقاً في قلب طنجة.',
    },
    'les-brunchs': {
      label: 'البرنش',
      title: 'البرنش الفاخر',
      description: 'بانكيك دافئ، أتاي بالنعناع ومتعة الاستمتاع بالوقت على مهل.',
    },
    'la-cuisine': {
      label: 'المطبخ',
      title: 'المطبخ',
      description: 'من أضلاع اللحم المكرملة إلى الطاجين بالليمون المرقد، أطباق سخية تدعو للمشاركة.',
    },
    'cafe-douceurs': {
      label: 'القهوة والحلويات',
      title: 'القهوة والحلويات',
      description: 'فنجان قهوة مختصة، ملاعق من التيراميسو وسبب أخير لإطالة الجلسة حول الطاولة.',
    },
  },
  nl: {
    'le-lieu': {
      label: 'Het Interieur',
      title: 'Het Interieur',
      description: 'Onder de glazen koepel vormen marmer en warm houtwerk een stijlvol toevluchtsoord in het hart van Tanger.',
    },
    'les-brunchs': {
      label: 'De Brunches',
      title: 'De Grote Brunches',
      description: 'Nog warme pancakes, verse muntthee en het plezier om rustig de tijd te nemen.',
    },
    'la-cuisine': {
      label: 'De Keuken',
      title: 'De Keuken',
      description: 'Van gekarameliseerde runderribben tot tajine met ingemaakte citroen: gerechten die uitnodigen om te delen.',
    },
    'cafe-douceurs': {
      label: 'Koffie & Zoetigheden',
      title: 'Koffie & Zoetigheden',
      description: 'Een kop koffie, enkele lepels tiramisu en een laatste reden om aan tafel te blijven.',
    },
  },
};

const itemTitleTranslations: Record<LangKey, Record<string, string>> = {
  en: {
    '1': 'Le Monarq Prestige — Shrimp, Avocado & Mango Brioche',
    '2': 'Moroccan Touch — Royal Platter of Msemen, Baghrir, Harcha & Amlou',
    '3': 'Manhattan Style — Toasted Brioche, Poached Eggs & Hollandaise Sauce',
    '4': 'Smoked Salmon Bagel, Avocado Mousse & Pancakes',
    '5': 'First Light — Croissant Filled with Scrambled Eggs & Salmon',
    '6': 'A Sunday in Paris — Golden Brioche, Scrambled Eggs & Pancakes',
    '7': 'Tangier Breakfast & Traditional Mint Tea',
    '8': 'Croque-Madame & Golden Potato Rosti',
    '9': 'Grilled Chicken Caesar Toast & Parmesan Shavings',
    '10': 'Roasted Salmon Fillet Tagliatelle & Lime',
    '11': 'Honey, BBQ & Rosemary Caramelized Beef Ribs',
    '12': 'Gourmet Burger with Beef Bacon & Melted Cheddar',
    '13': 'Signature Gourmet Mini Burgers Trio',
    '14': 'Fresh Seafood & Basil Linguine',
    '15': 'Monarq Shrimp Penne & House Spicy Sauce',
    '16': 'Creamy Burrata, Mango & Balsamic Reduction Salad',
    '17': 'Portofino Salad with Grilled Shrimp & Avocado',
    '18': 'Thinly Sliced Beef Carpaccio with Parmesan & Arugula',
    '19': 'Crispy Tempura Prawns & Sweet-and-Sour Sauce',
    '20': 'Traditional Moroccan Briouates Assortment',
    '21': 'Wood-Fired Carnivore Pizza',
    '22': 'Artisan Pepperoni Pizza',
    '23': 'Royal Seven-Vegetable Couscous & Caramelized Tfaya',
    '24': 'Free-Range Chicken Daghmira Tagine with Olives & Preserved Lemon',
    '25': 'Beef Tagine with Caramelized Prunes & Almonds',
    '26': 'Chocolate & Raspberry Pancakes Duo with Caffè Latte',
    '27': 'MONARQ Signature Classic Tiramisu',
    '28': 'Creamy Pistachio & Rosebud Delight',
    '29': 'Artisanal Lotus Biscoff Speculoos Cheesecake',
    '30': 'Crispy Caesar Salad & Parmesan Shavings',
    '31': 'Marble Table & Emerald Velvet Armchairs Beneath the Glass Roof',
    '32': 'Reception & Sculpted Calacatta Marble Counter',
    '33': 'Sunlit Glass Atrium & Marble Tables',
    '34': 'Main Dining Room Beneath the Glass Roof',
    '35': 'Reception Hall & Backlit MONARQ Wall',
    '36': 'Restaurant Entrance',
  },
  ar: {
    '1': 'لو مونارك بريستيج — بريوش بالقمرون، الأفوكادو والمانجو',
    '2': 'اللمسة المغربية — طبق ملكي من المسمن، البغرير، الحرشة وأملو',
    '3': 'على طريقة مانهاتن — بريوش محمص، بيض بوشيه وصلصة هولنديز',
    '4': 'بيغل بالسلمون المدخن، موس الأفوكادو وبانكيك',
    '5': 'إشراقة الصباح — كرواسون محشو بالبيض المخفوق والسلمون',
    '6': 'أحدٌ في باريس — بريوش ذهبي، بيض مخفوق وبانكيك',
    '7': 'الفطور الطنجاوي وأتاي تقليدي بالنعناع',
    '8': 'كروك مدام وغاليت البطاطس الذهبية',
    '9': 'تارتين سيزر بالدجاج المشوي ورقائق البارميزان',
    '10': 'تالياتيلي بفيليه السلمون المحمر والليمون الأخضر',
    '11': 'أضلاع لحم البقر (ريبز) المكرملة بالعسل والباربكيو وإكليل الجبل',
    '12': 'برغر غورميه ببيكون اللحم البقري وجبن الشيدر الذائب',
    '13': 'ثلاثي ميني برغر غورميه المميز',
    '14': 'لينغويني بفواكه البحر الطازجة والريحان',
    '15': 'بيني مونارك بالقمرون والصلصة الحارة المميزة',
    '16': 'سلطة البوراتا الكريمية مع المانجو وخلاصة البلسميك',
    '17': 'سلطة بورتوفينو بالقمرون المشوي والأفوكادو',
    '18': 'كارباتشيو لحم البقر مع البارميزان والجرجير',
    '19': 'قمرون تمبورا مقرمش مع صلصة حلوة وحارة',
    '20': 'تشكيلة بريوات مغربية تقليدية',
    '21': 'بيتزا كارنيفور مطهوة على الحطب',
    '22': 'بيتزا بيبروني حرفية',
    '23': 'كسكس ملكي بسبع خضار والتفاية المكرملة',
    '24': 'طاجين الدجاج البلدي بالدغميرة والزيتون والليمون المرقد',
    '25': 'طاجين اللحم بالبرقوق المكرمل واللوز',
    '26': 'ثنائي البانكيك بالشوكولاتة والتوت مع كافيه لاتيه',
    '27': 'تيراميسو مونارك الكلاسيكي المميز',
    '28': 'حلوى الفستق الكريمية وبراعم الورد',
    '29': 'تشيز كيك حرفي بلوتس بيسكوف',
    '30': 'سلطة سيزر المقرمشة ورقائق البارميزان',
    '31': 'طاولة رخامية وكراسي مخملية زمردية تحت القبة الزجاجية',
    '32': 'الاستقبال وكونتوار رخام كالاكاتا المنحوت',
    '33': 'القبة الزجاجية المضيئة والطاولات الرخامية',
    '34': 'قاعة المطعم تحت القبة الزجاجية',
    '35': 'بهو الاستقبال وجدار مونارك المضيء',
    '36': 'مدخل المطعم',
  },
  nl: {
    '1': 'Le Monarq Prestige — Brioche met Garnalen, Avocado & Mango',
    '2': 'Moroccan Touch — Koninklijk Plateau met Msemen, Baghrir, Harcha & Amlou',
    '3': 'Manhattan Stijl — Geroosterde Brioche, Gepocheerde Eieren & Hollandaisesaus',
    '4': 'Bagel met Gerookte Zalm, Avocadomousse & Pancakes',
    '5': 'Eerste Uur — Gevulde Croissant met Roerei & Zalm',
    '6': 'Een Zondag in Parijs — Goudbruine Brioche, Roerei & Pancakes',
    '7': 'Tangérois Ontbijt & Traditionele Muntthee',
    '8': 'Croque-Madame & Goudbruine Aardappelrösti',
    '9': 'Caesar Tartine met Gegrilde Kip & Parmezaanse Schilfers',
    '10': 'Tagliatelle met Geroosterde Zalmfilet & Limoen',
    '11': 'Gekarameliseerde Runderribben met Honing, Barbecue & Rozemarijn',
    '12': 'Gourmet Burger met Runderbacon & Smeltende Cheddar',
    '13': 'Trio van Signature Gourmet Burgers',
    '14': 'Linguine met Verse Zeevruchten & Basilicum',
    '15': 'Penne Monarq met Garnalen & Huisgemaakte Pikante Saus',
    '16': 'Romige Burrata Salade met Mango & Balsamicoreductie',
    '17': 'Portofino Salade met Gegrilde Garnalen & Avocado',
    '18': 'Fijne Rundercarpaccio met Parmezaan & Rucola',
    '19': 'Krokante Gamba’s in Tempura & Zoetzure Saus',
    '20': 'Assortiment Traditionele Marokkaanse Briouates',
    '21': 'Pizza Carnivore uit de Houtoven',
    '22': 'Ambachtelijke Pizza Pepperoni',
    '23': 'Koninklijke Couscous met Zeven Groenten & Gekarameliseerde Tfaya',
    '24': 'Tajine van Scharrelkip Daghmira met Olijven & Ingemaakte Citroen',
    '25': 'Tajine van Rundvlees met Gekarameliseerde Pruimen & Amandelen',
    '26': 'Duo van Smeltende Pancakes met Chocolade, Framboos & Caffè Latte',
    '27': 'Klassieke Signature Tiramisu MONARQ',
    '28': 'Romige Pistachelekkernij & Rozenknopjes',
    '29': 'Ambachtelijke Lotus Biscoff Speculoos Cheesecake',
    '30': 'Krokante Caesar Salade & Parmezaanse Schilfers',
    '31': 'Marmeren Tafel & Smaragdgroene Fluwelen Fauteuils onder de Glazen Koepel',
    '32': 'Ontvangst & gebeeldhouwde Calacatta-marmeren Toog',
    '33': 'Lichte Glazen Koepel & Marmeren Tafels',
    '34': 'Restaurantzaal onder de glazen koepel',
    '35': 'Ontvangsthal & Verlichte MONARQ-wand',
    '36': 'Ingang van het restaurant',
  },
};

const photoDetailsTranslations: Record<
  LangKey,
  Record<string, { name?: string; label?: string; alt?: string }>
> = {
  en: {
    '31': { alt: 'Marble table and green velvet armchairs beneath the glass roof at MONARQ Tangier' },
    '6': { alt: 'A Sunday in Paris brunch with golden brioche and scrambled eggs, MONARQ Tangier' },
    '11': { name: 'Caramelized beef ribs', label: 'Grills' },
    '12': { name: 'Gourmet burger', label: 'Burgers' },
    '14': { name: 'Seafood linguine', label: 'Pasta' },
    '21': { name: 'Carnivore pizza', label: 'Pizzas' },
    '24': { name: 'Chicken daghmira tagine', label: 'Moroccan cuisine' },
  },
  ar: {
    '31': { alt: 'طاولة رخامية وكراسي مخملية خضراء تحت القبة الزجاجية في مونارك طنجة' },
    '6': { alt: 'برنش أحدٌ في باريس مع بريوش ذهبي وبيض مخفوق، مونارك طنجة' },
    '11': { name: 'أضلاع لحم البقر المكرملة', label: 'المشويات' },
    '12': { name: 'برغر غورميه', label: 'برغر' },
    '14': { name: 'لينغويني فواكه البحر', label: 'باستا' },
    '21': { name: 'بيتزا كارنيفور', label: 'بيتزا' },
    '24': { name: 'طاجين الدجاج بالدغميرة', label: 'المطبخ المغربي' },
  },
  nl: {
    '31': { alt: 'Marmeren tafel en groene fluwelen fauteuils onder de glazen koepel van MONARQ Tanger' },
    '6': { alt: 'Brunch Een Zondag in Parijs met goudbruine brioche en roerei, MONARQ Tanger' },
    '11': { name: 'Gekarameliseerde runderribben', label: 'Grillgerechten' },
    '12': { name: 'Gourmet burger', label: 'Burgers' },
    '14': { name: 'Linguine met zeevruchten', label: 'Pasta' },
    '21': { name: 'Pizza carnivore', label: 'Pizza’s' },
    '24': { name: 'Tajine van kip daghmira', label: 'Marokkaanse keuken' },
  },
};

export function getLocalizedGalleryChapters(lang: Language) {
  if (lang === 'fr') return galleryChapters;
  const map = chapterTranslations[lang];
  return galleryChapters.map((ch) => ({
    ...ch,
    label: map[ch.id]?.label ?? ch.label,
    title: map[ch.id]?.title ?? ch.title,
    description: map[ch.id]?.description ?? ch.description,
  }));
}

export function getLocalizedGalleryItems(lang: Language): GalleryItem[] {
  if (lang === 'fr') return galleryItems;
  const map = itemTitleTranslations[lang];
  return galleryItems.map((it) => ({
    ...it,
    title: map[it.id] ?? it.title,
  }));
}

export function getLocalizedPhotoDetails(lang: Language) {
  if (lang === 'fr') return photoDetails;
  const map = photoDetailsTranslations[lang];
  const result: typeof photoDetails = {};
  for (const [id, detail] of Object.entries(photoDetails)) {
    const tr = map[id];
    result[id] = {
      ...detail,
      name: tr?.name ?? detail.name,
      label: tr?.label ?? detail.label,
      alt: tr?.alt ?? detail.alt,
    };
  }
  return result;
}
