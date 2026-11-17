import { catalogueDescription, catalogueTranslation } from './catalogueTranslations';
import { MenuChapter, MenuItem } from '../types';
import { menuChapters, signatureHighlights } from '../data/menuData';
import { Language } from './types';

interface ChapterTranslation {
  title: string;
  subtitle: string;
  timeSlot?: string;
}

interface ItemTranslation {
  name: string;
  description?: string;
  tag?: string;
}

type LangKey = 'en' | 'ar' | 'nl';

const chapterTranslations: Record<LangKey, Record<string, ChapterTranslation>> = {
  en: {
    'le-matin': {
      title: 'MORNING',
      subtitle: 'Breakfasts & Grand Signature Brunches',
      timeSlot: '09:00 AM — 02:00 PM',
    },
    'carte-du-matin': {
      title: 'MORNING À LA CARTE',
      subtitle: 'Artisan Toasts, Crispy Croques & Omelettes',
      timeSlot: '09:00 AM — 02:00 PM',
    },
    'la-cuisine': {
      title: 'THE KITCHEN',
      subtitle: 'Delicate Starters, Fresh Salads, Artisan Pasta & Risottos',
      timeSlot: '12:00 PM — 12:00 AM',
    },
    'pizzas-grillades': {
      title: 'PIZZAS & GRILLS',
      subtitle: 'Artisan Pizzas, Gourmet Burgers, Prime Cuts & Moroccan Classics',
      timeSlot: '12:00 PM — 12:00 AM',
    },
  },
  ar: {
    'le-matin': {
      title: 'الصباح',
      subtitle: 'فطور الصباح وبرنش مونارك الفاخر',
      timeSlot: '09:00 — 14:00',
    },
    'carte-du-matin': {
      title: 'قائمة الصباح المختارة',
      subtitle: 'تارتين شهي، كروك مقرمش وأومليت طازج',
      timeSlot: '09:00 — 14:00',
    },
    'la-cuisine': {
      title: 'المطبخ',
      subtitle: 'مقبلات راقية، سلطات طازجة، باستا حرفية وريزوتو',
      timeSlot: '12:00 — 00:00',
    },
    'pizzas-grillades': {
      title: 'البيتزا والمشويات',
      subtitle: 'بيتزا على الحطب، برغر غورميه، لحوم فاخرة وأطباق مغربية أصيلة',
      timeSlot: '12:00 — 00:00',
    },
  },
  nl: {
    'le-matin': {
      title: 'DE OCHTEND',
      subtitle: 'Ontbijten & Grote Signature Brunches',
      timeSlot: '09:00 — 14:00',
    },
    'carte-du-matin': {
      title: 'OCHTEND À LA CARTE',
      subtitle: 'Gastronomische Tartines, Krokante Croques & Omeletten',
      timeSlot: '09:00 — 14:00',
    },
    'la-cuisine': {
      title: 'DE KEUKEN',
      subtitle: 'Verfijnde Voorgerechten, Verse Salades, Ambachtelijke Pasta & Risotto',
      timeSlot: '12:00 — 00:00',
    },
    'pizzas-grillades': {
      title: 'PIZZA’S & GRILLGERECHTEN',
      subtitle: 'Houtovenpizza’s, Gourmet Burgers, Edele Vleessoorten & Marokkaanse Klassiekers',
      timeSlot: '12:00 — 00:00',
    },
  },
};

const itemTranslations: Record<LangKey, Record<string, ItemTranslation>> = {
  en: {
    // Petits déjeuners
    'a-la-hate': {
      name: 'On the Go',
      description: 'Toasted bread, 3 mini pastries, butter, jam, olives, mini orange juice, hot drink.',
    },
    'tangerois': {
      name: 'Tangier Morning',
      description: 'Fried eggs, wholemeal bread, turkey ham, traditional jben cheese, red cheese, olive oil, olives, mini orange juice, hot drink.',
      tag: 'Local Specialty',
    },
    'hollandaise': {
      name: 'Hollandaise',
      description: '2 fried eggs, toasted bread, smoked turkey, Edam cheese, mixed greens, olives, hollandaise sauce, mini orange juice, hot drink.',
    },
    'espagnol': {
      name: 'Spanish Morning',
      description: 'Toasted bread, Manchego cheese, fresh crushed tomato, olive oil, olive tapenade, mini orange juice, hot drink.',
    },
    // Brunches
    'bagel-au-saumon': {
      name: 'Smoked Salmon Bagel',
      description: 'Bagel, cream cheese, avocado mousse, smoked salmon and arugula. Served with a hot drink of your choice, orange juice, a pancake and homemade yogurt.',
    },
    'premiere-heure': {
      name: 'First Light',
      description: 'Croissant filled with scrambled eggs, avocado, crispy beef bacon or smoked salmon, Edam cheese and arugula. Served with hot drink, orange juice, pancake and homemade yogurt.',
    },
    'le-brunch-equilibre': {
      name: 'The Balanced Brunch',
      description: 'Toasted wholemeal bread, scrambled egg whites, avocado, granola bowl and mixed greens. Served with a hot drink of your choice and mini orange juice.',
    },
    'un-dimanche-a-paris': {
      name: 'A Sunday in Paris',
      description: 'French toast-style brioche, smoked beef bacon, scrambled eggs and truffle-scented sautéed mushrooms. Served with hot drink, orange juice, duo of mini pancakes and homemade yogurt.',
      tag: 'Guest Favorite',
    },
    'moroccan-touch': {
      name: 'Moroccan Touch',
      description: 'Bread basket, amlou, olives, gourmet trio of msemen, baghrir and harcha, with fried eggs or khlii. Served with hot drink, orange juice and homemade yogurt.',
      tag: 'Must-Try',
    },
    'mqila-a-la-chakchouka': {
      name: 'Chakchouka Skillet',
      description: 'Bread basket, butter, jam, red olives and eggs poached in spiced tomato and bell pepper sauce. Served with hot drink, orange juice, duo of mini pastries and homemade yogurt.',
    },
    'london-morning': {
      name: 'London Morning',
      description: 'Sausages, eggs, sautéed mushrooms, golden potato rosti and mixed salad. Served with hot drink, orange juice, duo of mini pastries and homemade yogurt.',
    },
    'facon-manhattan': {
      name: 'Manhattan Style',
      description: 'Brioche, tzatziki sauce, avocado mousse, beef bacon or smoked salmon, poached eggs, hollandaise sauce and chives. Served with hot drink, orange juice, mini pancake and homemade yogurt.',
    },
    'le-monarq': {
      name: 'Le Monarq (Prestige)',
      description: 'Brioche with shrimp, avocado, mango, spicy sauce and onions, accompanied by an omelette, potato rosti, Emmental cheese, homemade yogurt and French toast. Hot drink of choice and orange juice.',
      tag: 'Prestige Signature',
    },
    // Tartines
    'tartine-orientale': {
      name: 'Oriental Toast',
      description: 'Multigrain toast, tzatziki sauce, hummus, cucumber, falafel and arugula.',
    },
    'tartine-au-saumon': {
      name: 'Salmon Toast',
      description: 'Multigrain toast, avocado mousse, poached eggs, sliced avocado, cream cheese and smoked salmon.',
    },
    'tartine-stracciatella': {
      name: 'Stracciatella Toast',
      description: 'Multigrain toast, cream cheese, beef bacon, caramelized peach, stracciatella, basil, arugula and balsamic glaze.',
    },
    'tartine-cesar-poulet': {
      name: 'Chicken Caesar Toast',
      description: 'Multigrain toast, Caesar dressing, grilled chicken, cherry tomatoes, Parmesan shavings and arugula.',
    },
    // Croques
    'croque-madame': {
      name: 'Croque-Madame',
      description: 'Croque-madame topped with a fried egg, served with a golden potato rosti.',
    },
    'croque-monsieur': {
      name: 'Croque-Monsieur',
      description: 'Croque-monsieur wrapped in a soft omelette, served with a golden potato rosti.',
    },
    // Omelettes
    'omelette-nature': { name: 'Plain Omelette' },
    'omelette-champignons': { name: 'Mushroom & Fine Herbs Omelette' },
    'omelette-fromage': { name: 'Cheese Omelette' },
    'omelette-charcuterie': { name: 'Cold Cuts & Cheese Omelette' },
    'omelette-saumon': { name: 'Smoked Salmon & Spinach Omelette' },
    // Pain
    'pain-grille': { name: 'Toasted Bread of Choice' },
    'trio-marocain': { name: 'Harcha / Msemen / Baghrir' },
    'viennoiserie': { name: 'Pastry of Choice' },
    'baghrir-amlou': { name: 'Baghrir with Berber Amlou' },
    // Entrées
    'carpaccio-boeuf': {
      name: 'Beef Carpaccio',
      description: 'Thinly sliced marinated beef, extra virgin olive oil and aged Parmesan.',
    },
    'carpaccio-burrata': {
      name: 'Beef Carpaccio & Burrata',
      description: 'Marinated beef carpaccio crowned with a creamy burrata heart.',
    },
    'aiguillettes-poulet': {
      name: 'Crispy Chicken Tenders',
      description: 'Breaded chicken fillets served with your choice of dipping sauce.',
    },
    'gambas-tempura': {
      name: 'Tempura Prawns',
      description: 'Crispy tempura prawns with a mildly spiced sweet-and-sour sauce.',
    },
    'briouates-marocaines': {
      name: 'Moroccan Briouates Assortment',
      description: 'Traditional crispy Moroccan stuffed pastries.',
    },
    'croquettes-crevettes': {
      name: 'Homemade Shrimp Croquettes',
      description: 'Artisanal recipe crafted by our chef.',
    },
    'trio-tacos': { name: 'Gourmet Tacos Trio' },
    'trio-burgers': {
      name: 'Gourmet Mini Burgers Trio',
      description: 'Three prime sliders crafted for sharing.',
    },
    // Salades
    'salade-cesar': {
      name: 'Caesar Salad',
      description: 'Crisp lettuce, grilled chicken, Parmesan shavings, tomatoes, quail eggs, croutons and Caesar dressing.',
    },
    'salade-nicoise': {
      name: 'Niçoise Salad',
      description: 'Lettuce, sweet corn, cherry tomatoes, tuna, onion, black olives, eggs, penne and house vinaigrette.',
    },
    'salade-portofino': {
      name: 'Portofino Salad',
      description: 'Arugula, avocado, grilled shrimp, cherry tomatoes and fragrant vinaigrette.',
    },
    'salade-burrata': {
      name: 'Burrata Salad',
      description: 'Creamy burrata, arugula, cherry tomatoes, peach, grapes, orange segments and balsamic glaze.',
      tag: 'Chef’s Favorite',
    },
    // Pâtes
    'pates-monarq-crevettes': {
      name: 'Monarq Shrimp Pasta',
      description: 'Penne with sautéed shrimp in our signature house spicy sauce.',
      tag: 'Signature Dish 🌶️',
    },
    'pates-monarq-poulet': {
      name: 'Monarq Chicken Pasta',
      description: 'Penne with sliced chicken breast in our signature house spicy sauce.',
      tag: 'Signature 🌶️',
    },
    'pates-alfredo': {
      name: 'Alfredo',
      description: 'Penne, mushrooms, chicken and velvety cream sauce.',
    },
    'pates-bolognaise': {
      name: 'Bolognese',
      description: 'Spaghetti with slow-simmered herbed beef Bolognese sauce.',
    },
    'pates-fruits-de-mer': {
      name: 'Seafood Linguine',
      description: 'Linguine with fresh seafood and your choice of sauce.',
    },
    'pates-saumon': {
      name: 'Salmon & Spinach',
      description: 'Tagliatelle, smoked salmon, fresh spinach and pink cream sauce.',
    },
    'pates-pesto': {
      name: 'Chicken Pesto',
      description: 'Penne, mushrooms, chicken, cream sauce and basil pesto.',
    },
    'pates-carbonara': {
      name: 'Carbonara',
      description: 'Cream, aged Parmesan and smoked turkey.',
    },
    'pates-arrabbiata': {
      name: 'Arrabbiata',
      description: 'Penne with slow-simmered tomato and chili sauce.',
    },
    'tagliatelle-alfredo': {
      name: 'Tagliatelle Alfredo',
      description: 'Tagliatelle, creamy sliced chicken, mushrooms and Parmesan cheese.',
    },
    'tagliatelle-salmone': {
      name: 'Tagliatelle Salmone',
      description: 'Tagliatelle, smoked salmon, spinach and delicate cream sauce.',
    },
    'pates-cardinale': {
      name: 'Cardinale',
      description: 'Linguine, shrimp, mushrooms and white cream sauce.',
    },
    'lasagnes': {
      name: 'Homemade Lasagna',
      description: 'Layered pasta with Bolognese sauce, béchamel and melted mozzarella.',
    },
    'crazy-pasta': {
      name: 'Crazy Pasta',
      description: 'Fusilli, shrimp, melted mozzarella and pink cream sauce.',
    },
    // Risottos
    'risotto-fruits-de-mer': {
      name: 'Seafood Risotto',
      description: 'Creamy risotto, shellfish bisque reduction, fresh seafood and Parmesan.',
    },
    'risotto-milanais': {
      name: 'Milanese Risotto',
      description: 'Creamy risotto with tender chicken and pure saffron sauce.',
    },
    'risotto-saumon': {
      name: 'Salmon Risotto',
      description: 'Risotto topped with roasted salmon fillet, spinach and green basil pesto.',
      tag: 'Chef’s Recommendation',
    },
    'risotto-alfredo': {
      name: 'Alfredo Risotto',
      description: 'Creamy risotto with chicken, cream sauce and aged Parmesan.',
    },
    // Pizzas
    'pizza-margherita': {
      name: 'Margherita',
      description: 'Tomato sauce, fresh mozzarella and sweet basil.',
    },
    'pizza-carnivore': {
      name: 'Carnivore',
      description: 'Tomato sauce, mozzarella, pepperoni, turkey ham, chicken, minced beef and barbecue sauce.',
    },
    'pizza-fruits-de-mer': {
      name: 'Seafood',
      description: 'Tomato sauce, mozzarella, mixed seafood and garlic.',
    },
    'pizza-royale': {
      name: 'Royale',
      description: 'Mozzarella, pepperoni, mushrooms, green bell pepper, red onion, olives and minced beef.',
    },
    'pizza-roasted-potatoes': {
      name: 'Roasted Potatoes',
      description: 'Crème fraîche, mozzarella, roasted potatoes, chicken, garlic and rosemary.',
    },
    'pizza-mexicaine': {
      name: 'Mexicana',
      description: 'Tomato sauce, mozzarella, pepperoni, red onions, olives, chili peppers and garlic.',
    },
    'pizza-cheesy': {
      name: 'Cheesy',
      description: 'Tomato sauce, mozzarella, feta and goat cheese.',
    },
    'pizza-tasty-chicken': {
      name: 'Tasty Chicken',
      description: 'Tomato sauce, mozzarella, chicken, red onions and green bell pepper.',
    },
    'pizza-vegetarienne': {
      name: 'Vegetarian',
      description: 'Tomato sauce, mozzarella, mushrooms, red onions, green bell pepper, olives and cherry tomatoes.',
    },
    'pizza-pepperoni': {
      name: 'Pepperoni',
      description: 'Tomato sauce, mozzarella and sliced pepperoni.',
    },
    'pizza-hawai': {
      name: 'Hawaiian',
      description: 'Tomato sauce, mozzarella, turkey ham and pineapple.',
    },
    'pizza-poulet-barbecue': {
      name: 'BBQ Chicken',
      description: 'Barbecue sauce, mozzarella, chicken, green bell pepper and red onions.',
    },
    'pizza-shrimp': {
      name: 'Shrimp',
      description: 'Tomato sauce, mozzarella, red onions, cherry tomatoes, olives, mushrooms, paprika, garlic and shrimp.',
    },
    'pizza-viande-hachee': {
      name: 'Seasoned Beef',
      description: 'Tomato sauce, mozzarella and seasoned minced beef.',
    },
    'pizza-feta': {
      name: 'Feta & Caramelized Onion',
      description: 'Tomato sauce, mozzarella, caramelized onions, feta cheese and chicken.',
    },
    'pizza-thon': {
      name: 'Tuna',
      description: 'Tomato sauce, mozzarella and tuna.',
    },
    'pizza-saumon': {
      name: 'Smoked Salmon',
      description: 'Tomato sauce, mozzarella, cherry tomatoes, red onions, salmon and garlic.',
    },
    'pizza-burrata': {
      name: 'Burrata',
      description: 'Tomato sauce, mozzarella, whole creamy burrata, cherry tomatoes and fresh basil.',
      tag: 'Prestige',
    },
    'pizza-poulet-satay': {
      name: 'Satay Chicken',
      description: 'Peanut satay sauce, mozzarella, chicken, green bell pepper and red onions.',
    },
    // Burgers
    'burger-classique': {
      name: 'The Classic Burger',
      description: 'Beef patty, cheddar, shredded iceberg lettuce, caramelized onions, sliced tomato and chef’s sauce.',
    },
    'burger-fume': {
      name: 'The Truffle Burger',
      description: 'Beef patty, Emmental cheese, arugula, sautéed mushrooms, tomato slices, homemade truffle mayonnaise and chef’s sauce.',
      tag: 'Truffle Flavor',
    },
    'burger-poulet': {
      name: 'The Crispy Chicken Burger',
      description: 'Chicken fillet, cheddar, paprika caramelized onions, shredded iceberg lettuce, truffle sauce and chef’s sauce.',
    },
    'burger-bacon': {
      name: 'The Beef Bacon Burger',
      description: 'Beef patty, cheddar, paprika caramelized onions, shredded iceberg lettuce, red onions, crispy beef bacon, tomato, pickles and BBQ sauce.',
      tag: 'Gourmet Max',
    },
    // Viandes & Ribs
    'filet-black-angus': {
      name: 'Black Angus Tenderloin',
      description: 'Prime beef tenderloin grilled to perfection, served with your choice of side.',
      tag: 'Signature Cut',
    },
    'tagliata-boeuf': {
      name: 'Truffle Beef Tenderloin Tagliata',
      description: 'Thinly sliced beef tenderloin, arugula, aged Parmesan and noble truffle oil.',
    },
    'emince-volaille': {
      name: 'Sliced Supreme of Poultry',
      description: 'Sautéed seasonal vegetables and fragrant pan reduction.',
    },
    'ribs-epice': {
      name: 'Beef Ribs — Spicy & BBQ',
      description: 'Slow-braised beef short ribs glazed with a bold spicy barbecue sauce.',
    },
    'ribs-miel': {
      name: 'Beef Ribs — Honey & BBQ',
      description: 'Melt-in-the-mouth beef short ribs glazed with golden honey and barbecue.',
    },
    // Plats Marocains
    'couscous-poulet': {
      name: 'Chicken Couscous with Seven Vegetables',
      description: 'Steamed fine semolina, tender chicken and seven garden vegetables.',
      tag: 'Available on Fridays',
    },
    'couscous-viande': {
      name: 'Beef Couscous with Seven Vegetables',
      description: 'Steamed fine semolina, melt-in-the-mouth beef and fragrant broth.',
      tag: 'Available on Fridays',
    },
    'tajine-viande-pruneaux': {
      name: 'Beef Tagine with Caramelized Prunes',
      description: 'Beef slow-simmered with sweet spices, caramelized prunes and toasted almonds.',
      tag: 'Royal Classic',
    },
    'tajine-poulet-daghmira': {
      name: 'Chicken Tagine Daghmira with Olives & Fries',
      description: 'Free-range chicken confit in rich onion daghmira sauce with preserved lemon and olives.',
    },
    'tajine-kefta': {
      name: 'Kefta Meatball Tagine with Eggs',
      description: 'Spiced beef meatballs with fresh herbs in rich tomato sauce, topped with eggs.',
    },
  },
  ar: {
    // Petits déjeuners
    'a-la-hate': {
      name: 'فطور سريع',
      description: 'خبز محمص، 3 ميني كرواسون ومعجنات، زبدة، مربى، زيتون، ميني عصير برتقال، مشروب ساخن.',
    },
    'tangerois': {
      name: 'الفطور الطنجاوي',
      description: 'بيض مقلي، خبز كامل، ديك رومي مدخن، جبن عربي بلدي، جبن أحمر، زيت زيتون، زيتون، ميني عصير برتقال، مشروب ساخن.',
      tag: 'تخصص محلي',
    },
    'hollandaise': {
      name: 'هولنديز',
      description: 'بيضتان مقليتان، توست محمص، ديك رومي مدخن، جبن إيدام، سلطة مشكلة، زيتون، صلصة هولنديز، ميني عصير برتقال، مشروب ساخن.',
    },
    'espagnol': {
      name: 'الفطور الإسباني',
      description: 'خبز محمص، جبن مانشيغو، هريس الطماطم الطازجة، زيت زيتون، تابيناد الزيتون، ميني عصير برتقال، مشروب ساخن.',
    },
    // Brunches
    'bagel-au-saumon': {
      name: 'بيغل بالسلمون المدخن',
      description: 'خبز البيغل، جبن كريمي، موس الأفوكادو، سلمون مدخن وجرجير. يُقدم مع مشروب ساخن، عصير برتقال، بانكيك وياغورت منزلي.',
    },
    'premiere-heure': {
      name: 'إشراقة الصباح',
      description: 'كرواسون محشو بالبيض المخفوق، أفوكادو، بيكون بقري مقرمش أو سلمون مدخن، جبن إيدام وجرجير. يُقدم مع مشروب ساخن، عصير برتقال، بانكيك وياغورت منزلي.',
    },
    'le-brunch-equilibre': {
      name: 'البرنش المتوازن',
      description: 'خبز كامل محمص، بياض بيض مخفوق، أفوكادو، وعاء غرانولا وسلطة خضراء. يُقدم مع مشروب ساخن وميني عصير برتقال.',
    },
    'un-dimanche-a-paris': {
      name: 'أحدٌ في باريس',
      description: 'بريوش فرنش توست، بيكون بقري مدخن، بيض مخفوق وفطر سوتيه بنكهة الكمأة (الترافل). يُقدم مع مشروب ساخن، عصير برتقال، ميني بانكيك وياغورت منزلي.',
      tag: 'المفضل لدى الضيوف',
    },
    'moroccan-touch': {
      name: 'اللمسة المغربية',
      description: 'سلة خبز، أملو، زيتون، تشكيلة مسمن وبغرير وحرشة، مع بيض مقلي أو خليع. يُقدم مع مشروب ساخن، عصير برتقال وياغورت منزلي.',
      tag: 'لا يُفوّت',
    },
    'mqila-a-la-chakchouka': {
      name: 'مقيلة شكشوكة',
      description: 'سلة خبز، زبدة، مربى، زيتون أحمر وبيض مطهو بصلصة الطماطم والفلفل. يُقدم مع مشروب ساخن، عصير برتقال، ميني معجنات وياغورت منزلي.',
    },
    'london-morning': {
      name: 'صباح لندن',
      description: 'نقانق، بيض، فطر سوتيه، غاليت البطاطس الذهبية وسلطة مشكلة. يُقدم مع مشروب ساخن، عصير برتقال، ميني معجنات وياغورت منزلي.',
    },
    'facon-manhattan': {
      name: 'على طريقة مانهاتن',
      description: 'بريوش محمص، صلصة تزاتزيكي، موس الأفوكادو، بيكون بقري أو سلمون مدخن، بيض بوشيه، صلصة هولنديز وثوم معمر. يُقدم مع مشروب ساخن، عصير برتقال، ميني بانكيك وياغورت منزلي.',
    },
    'le-monarq': {
      name: 'لو مونارك (بريستيج)',
      description: 'بريوش بالقمرون (الجمبري)، أفوكادو، مانجو، صلصة حارة وبصل، مرفق بأومليت، غاليت البطاطس، جبن إيمنتال، ياغورت منزلي وفرنش توست. مشروب ساخن وعصير برتقال.',
      tag: 'توقيع بريستيج',
    },
    // Tartines
    'tartine-orientale': {
      name: 'تارتين شرقي',
      description: 'توست الحبوب، صلصة تزاتزيكي، حمص، خيار، فلافل وجرجير.',
    },
    'tartine-au-saumon': {
      name: 'تارتين بالسلمون',
      description: 'توست الحبوب، موس الأفوكادو، بيض بوشيه، شرائح أفوكادو، جبن أبيض وسلمون مدخن.',
    },
    'tartine-stracciatella': {
      name: 'تارتين ستراتشياتيلا',
      description: 'توست الحبوب، جبن أبيض، بيكون بقري، خوخ مكرمل، جبن ستراتشياتيلا، ريحان، جرجير وصلصة البلسميك.',
    },
    'tartine-cesar-poulet': {
      name: 'تارتين سيزر بالدجاج',
      description: 'توست الحبوب، صلصة سيزر، دجاج مشوي، طماطم كرزية، رقائق البارميزان وجرجير.',
    },
    // Croques
    'croque-madame': {
      name: 'كروك مدام',
      description: 'كروك مدام مغطى ببيضة مقلية، مرفق بغلّيت البطاطس الذهبية.',
    },
    'croque-monsieur': {
      name: 'كروك مسيو',
      description: 'كروك مسيو مغلف بأومليت ناعم، مرفق بغلّيت البطاطس الذهبية.',
    },
    // Omelettes
    'omelette-nature': { name: 'أومليت سادة' },
    'omelette-champignons': { name: 'أومليت بالفطر والأعشاب العطرية' },
    'omelette-fromage': { name: 'أومليت بالجبن' },
    'omelette-charcuterie': { name: 'أومليت بالشاركتري والجبن' },
    'omelette-saumon': { name: 'أومليت بالسلمون والسبانخ' },
    // Pain
    'pain-grille': { name: 'خبز محمص حسب الاختيار' },
    'trio-marocain': { name: 'حرشة / مسمن / بغرير' },
    'viennoiserie': { name: 'معجنات صباحية حسب الاختيار' },
    'baghrir-amlou': { name: 'بغرير بأملو الأمازيغي' },
    // Entrées
    'carpaccio-boeuf': {
      name: 'كارباتشيو لحم البقر',
      description: 'شرائح رفيعة من لحم البقر المتبل مع زيت الزيتون وجبن البارميزان.',
    },
    'carpaccio-burrata': {
      name: 'كارباتشيو اللحم والبوراتا',
      description: 'كارباتشيو لحم البقر مع قلب جبن البوراتا الكريمي.',
    },
    'aiguillettes-poulet': {
      name: 'أصابع الدجاج المقرمشة',
      description: 'شرائح فيليه الدجاج المقرمشة تُقدم مع صلصة من اختياركم.',
    },
    'gambas-tempura': {
      name: 'قمرون تمبورا',
      description: 'قمرون بخلطة التمبورا المقرمشة مع صلصة حلوة وحارة.',
    },
    'briouates-marocaines': {
      name: 'تشكيلة بريوات مغربية',
      description: 'تشكيلة مقرمشة على الطريقة المغربية الأصيلة.',
    },
    'croquettes-crevettes': {
      name: 'كروكيت القمرون المنزلي',
      description: 'وصفة حرفية خاصة من إبداع الشيف.',
    },
    'trio-tacos': { name: 'ثلاثي التاكوس الغورميه' },
    'trio-burgers': {
      name: 'ثلاثي ميني برغر غورميه',
      description: 'ثلاث قطع ميني برغر بلحوم فاخرة.',
    },
    // Salades
    'salade-cesar': {
      name: 'سلطة سيزر',
      description: 'خس طازج، دجاج مشوي، رقائق البارميزان، طماطم، بيض السمان، خبز محمص وصلصة سيزر.',
    },
    'salade-nicoise': {
      name: 'سلطة نيسواز',
      description: 'خس، ذرة، طماطم كرزية، تونة، بصل، زيتون أسود، بيض، باستا بيني وصلصة فينيغريت.',
    },
    'salade-portofino': {
      name: 'سلطة بورتوفينو',
      description: 'جرجير، أفوكادو، قمرون مشوي، طماطم كرزية وصلصة فينيغريت عطرية.',
    },
    'salade-burrata': {
      name: 'سلطة البوراتا',
      description: 'بوراتا كريمية، جرجير، طماطم كرزية، خوخ، عنب، شرائح برتقال وصلصة البلسميك.',
      tag: 'اختيار مفضل',
    },
    // Pâtes
    'pates-monarq-crevettes': {
      name: 'باستا مونارك بالقمرون',
      description: 'باستا بيني بالقمرون السوتيه وصلصة مونارك الحارة المميزة.',
      tag: 'طبق مميز 🌶️',
    },
    'pates-monarq-poulet': {
      name: 'باستا مونارك بالدجاج',
      description: 'باستا بيني بشرائح الدجاج وصلصة مونارك الحارة المميزة.',
      tag: 'توقيع الدار 🌶️',
    },
    'pates-alfredo': {
      name: 'ألفريدو',
      description: 'باستا بيني، فطر، دجاج وصلصة بيضاء كريمية.',
    },
    'pates-bolognaise': {
      name: 'بولونيز',
      description: 'سباغيتي بصلصة البولونيز المطهوة على مهل مع الأعشاب العطرية.',
    },
    'pates-fruits-de-mer': {
      name: 'فواكه البحر',
      description: 'باستا لينغويني مع فواكه البحر الطازجة وصلصة من اختياركم.',
    },
    'pates-saumon': {
      name: 'سلمون وسبانخ',
      description: 'تالياتيلي، سلمون مدخن، سبانخ طازجة وصلصة وردية.',
    },
    'pates-pesto': {
      name: 'بيستو الدجاج',
      description: 'بيني، فطر، دجاج، صلصة بيضاء وبيستو الريحان.',
    },
    'pates-carbonara': {
      name: 'كاربونارا',
      description: 'كريمة، جبن بارميزان معتق وديك رومي مدخن.',
    },
    'pates-arrabbiata': {
      name: 'أرابياتا',
      description: 'باستا بيني بصلصة الطماطم المتبلة والحارة.',
    },
    'tagliatelle-alfredo': {
      name: 'تالياتيلي ألفريدو',
      description: 'تالياتيلي، شرائح الدجاج بالكريمة، فطر وجبن البارميزان.',
    },
    'tagliatelle-salmone': {
      name: 'تالياتيلي السلمون',
      description: 'تالياتيلي، سلمون مدخن، سبانخ وصلصة كريمة ناعمة.',
    },
    'pates-cardinale': {
      name: 'كاردينال',
      description: 'لينغويني، قمرون، فطر وصلصة بيضاء.',
    },
    'lasagnes': {
      name: 'لازانيا منزلية',
      description: 'طبقات اللازانيا بصلصة البولونيز، البشاميل وجبن الموزاريلا الذائب.',
    },
    'crazy-pasta': {
      name: 'كريزي باستا',
      description: 'فوزيلي، قمرون، موزاريلا وصلصة وردية.',
    },
    // Risottos
    'risotto-fruits-de-mer': {
      name: 'ريزوتو فواكه البحر',
      description: 'ريزوتو كريمي، خلاصة القشريات، فواكه البحر والبارميزان.',
    },
    'risotto-milanais': {
      name: 'ريزوتو ميلانيز',
      description: 'ريزوتو كريمي بالدجاج وصلصة الزعفران الحر.',
    },
    'risotto-saumon': {
      name: 'ريزوتو بالسلمون',
      description: 'ريزوتو مع فيليه السلمون المحمر، سبانخ وبيستو أخضر.',
      tag: 'توصية الشيف',
    },
    'risotto-alfredo': {
      name: 'ريزوتو ألفريدو',
      description: 'ريزوتو بالدجاج، صلصة الكريمة وجبن البارميزان.',
    },
    // Pizzas
    'pizza-margherita': {
      name: 'مارغريتا',
      description: 'صلصة طماطم، موزاريلا طازجة وريحان.',
    },
    'pizza-carnivore': {
      name: 'كارنيفور',
      description: 'صلصة طماطم، موزاريلا، بيبروني، ديك رومي، دجاج، لحم مفروم وصلصة باربكيو.',
    },
    'pizza-fruits-de-mer': {
      name: 'فواكه البحر',
      description: 'صلصة طماطم، موزاريلا، فواكه البحر وثوم.',
    },
    'pizza-royale': {
      name: 'رويال',
      description: 'موزاريلا، بيبروني، فطر، فلفل أخضر، بصل أحمر، زيتون ولحم مفروم.',
    },
    'pizza-roasted-potatoes': {
      name: 'روستد بوتيتوز',
      description: 'كريمة طازجة، موزاريلا، بطاطس محمرة، دجاج، ثوم وإكليل الجبل.',
    },
    'pizza-mexicaine': {
      name: 'مكسيكية',
      description: 'صلصة طماطم، موزاريلا، بيبروني، بصل أحمر، زيتون، فلفل حار وثوم.',
    },
    'pizza-cheesy': {
      name: 'تشيزي (الأجبان)',
      description: 'صلصة طماطم، موزاريلا، جبن فيتا وجبن الماعز.',
    },
    'pizza-tasty-chicken': {
      name: 'تيستي تشيكن',
      description: 'صلصة طماطم، موزاريلا، دجاج، بصل أحمر وفلفل أخضر.',
    },
    'pizza-vegetarienne': {
      name: 'نباتية',
      description: 'صلصة طماطم، موزاريلا، فطر، بصل أحمر، فلفل أخضر، زيتون وطماطم كرزية.',
    },
    'pizza-pepperoni': {
      name: 'بيبروني',
      description: 'صلصة طماطم، موزاريلا وشرائح البيبروني.',
    },
    'pizza-hawai': {
      name: 'هاواي',
      description: 'صلصة طماطم، موزاريلا، ديك رومي وأناناس.',
    },
    'pizza-poulet-barbecue': {
      name: 'دجاج باربكيو',
      description: 'صلصة باربكيو، موزاريلا، دجاج، فلفل أخضر وبصل أحمر.',
    },
    'pizza-shrimp': {
      name: 'شريمب (القمرون)',
      description: 'صلصة طماطم، موزاريلا، بصل أحمر، طماطم كرزية، زيتون، فطر، بابريكا، ثوم وقمرون.',
    },
    'pizza-viande-hachee': {
      name: 'لحم مفروم',
      description: 'صلصة طماطم، موزاريلا ولحم مفروم متبل.',
    },
    'pizza-feta': {
      name: 'فيتا',
      description: 'صلصة طماطم، موزاريلا، بصل مكرمل، جبن فيتا ودجاج.',
    },
    'pizza-thon': {
      name: 'تونة',
      description: 'صلصة طماطم، موزاريلا وتونة.',
    },
    'pizza-saumon': {
      name: 'سلمون',
      description: 'صلصة طماطم، موزاريلا، طماطم كرزية، بصل أحمر، سلمون وثوم.',
    },
    'pizza-burrata': {
      name: 'بوراتا',
      description: 'صلصة طماطم، موزاريلا، بوراتا كاملة كريمية، طماطم كرزية وريحان.',
      tag: 'بريستيج',
    },
    'pizza-poulet-satay': {
      name: 'دجاج ساتاي',
      description: 'صلصة ساتاي، موزاريلا، دجاج، فلفل أخضر وبصل أحمر.',
    },
    // Burgers
    'burger-classique': {
      name: 'البرغر الكلاسيكي',
      description: 'ستيك لحم بقري، شيدر، خس آيسبرغ، بصل مكرمل، شرائح طماطم وصلصة الشيف.',
    },
    'burger-fume': {
      name: 'البرغر المدخن بالترافل',
      description: 'لحم بقري، جبن إيمنتال، جرجير، فطر سوتيه، طماطم، مايونيز الكمأة (الترافل) المنزلي وصلصة الشيف.',
      tag: 'نكهة الترافل',
    },
    'burger-poulet': {
      name: 'برغر الدجاج',
      description: 'دجاج مقرمش، شيدر، بصل مكرمل بالبابريكا، خس آيسبرغ، صلصة الترافل وصلصة الشيف.',
    },
    'burger-bacon': {
      name: 'برغر بيكون اللحم البقري',
      description: 'لحم بقري، شيدر، بصل مكرمل بالبابريكا، خس آيسبرغ، بصل أحمر، بيكون بقري، طماطم، مخلل وصلصة باربكيو.',
      tag: 'غورميه ماكس',
    },
    // Viandes & Ribs
    'filet-black-angus': {
      name: 'فيليه بلاك أنغوس الصافي',
      description: 'قطعة لحم فاخرة مشوية بإتقان، تُقدم مع مرافقات من اختياركم.',
      tag: 'توقيع اللحوم',
    },
    'tagliata-boeuf': {
      name: 'تالياتا فيليه اللحم بزيت الترافل',
      description: 'شرائح فيليه بقري رفيعة، جرجير، بارميزان معتق وزيت الترافل الفاخر.',
    },
    'emince-volaille': {
      name: 'إيمانسيه صدر الدواجن',
      description: 'خضار موسمية سوتيه وصلصة غنية عطرة.',
    },
    'ribs-epice': {
      name: 'ريبز — حار وباربكيو',
      description: 'أضلاع لحم البقر المطهوة ببطء والمكرملة بصلصة الباربكيو الحارة.',
    },
    'ribs-miel': {
      name: 'ريبز — عسل وباربكيو',
      description: 'أضلاع لحم البقر الطرية والذائبة بالعسل الصافي وصلصة الباربكيو.',
    },
    // Plats Marocains
    'couscous-poulet': {
      name: 'كسكس بالدجاج والسبع خضار',
      description: 'سميد ناعم مطهو على البخار، دجاج طري وسبع خضار طازجة.',
      tag: 'متوفر يوم الجمعة',
    },
    'couscous-viande': {
      name: 'كسكس باللحم والسبع خضار',
      description: 'سميد ناعم، لحم بقري طري ومرق مغربي أصيل.',
      tag: 'متوفر يوم الجمعة',
    },
    'tajine-viande-pruneaux': {
      name: 'طاجين اللحم بالبرقوق',
      description: 'لحم بقري مطهو على مهل بالتوابل المغربية، برقوق مكرمل ولوز محمص.',
      tag: 'كلاسيكي ملكي',
    },
    'tajine-poulet-daghmira': {
      name: 'طاجين الدجاج بالدغميرة والزيتون',
      description: 'دجاج بلدي محمر بصلصة الدغميرة العريقة مع الليمون المرقد والزيتون ومرفق بالبطاطس المقلية.',
    },
    'tajine-kefta': {
      name: 'طاجين الكفتة بالبيض',
      description: 'كرات الكفتة بالأعشاب الطازجة في صلصة الطماطم مع البيض.',
    },
  },
  nl: {
    // Petits déjeuners
    'a-la-hate': {
      name: 'Snelle Ochtend',
      description: 'Geroosterd brood, 3 mini-koffiekoeken, boter, confituur, olijven, mini-sinaasappelsap, warme drank.',
    },
    'tangerois': {
      name: 'Tangérois Ontbijt',
      description: 'Spiegeleieren, volkorenbrood, kalkoenham, traditionele jben-kaas, rode kaas, olijfolie, olijven, mini-sinaasappelsap, warme drank.',
      tag: 'Lokale Specialiteit',
    },
    'hollandaise': {
      name: 'Hollandaise',
      description: '2 spiegeleieren, geroosterde toast, gerookte kalkoen, Edammer kaas, gemengde salade, olijven, hollandaisesaus, mini-sinaasappelsap, warme drank.',
    },
    'espagnol': {
      name: 'Spaans Ontbijt',
      description: 'Geroosterd brood, Manchego-kaas, verse tomatenpuree, olijfolie, tapenade, mini-sinaasappelsap, warme drank.',
    },
    // Brunches
    'bagel-au-saumon': {
      name: 'Bagel met Gerookte Zalm',
      description: 'Bagel, roomkaas, avocadomousse, gerookte zalm en rucola. Geserveerd met een warme drank naar keuze, sinaasappelsap, een pancake en huisgemaakte yoghurt.',
    },
    'premiere-heure': {
      name: 'Eerste Uur',
      description: 'Croissant gevuld met roerei, avocado, krokante runderbacon of gerookte zalm, Edammer kaas en rucola. Geserveerd met warme drank, sinaasappelsap, pancake en huisgemaakte yoghurt.',
    },
    'le-brunch-equilibre': {
      name: 'De Evenwichtige Brunch',
      description: 'Geroosterd volkorenbrood, roerei van eiwit, avocado, granolabowl en gemengde salade. Geserveerd met een warme drank naar keuze en mini-sinaasappelsap.',
    },
    'un-dimanche-a-paris': {
      name: 'Een Zondag in Parijs',
      description: 'Wentelteefjes-brioche, gerookte runderbacon, roerei en gebakken champignons met truffelaroma. Geserveerd met warme drank, sinaasappelsap, duo van mini-pancakes en huisgemaakte yoghurt.',
      tag: 'Favoriet van Gasten',
    },
    'moroccan-touch': {
      name: 'Moroccan Touch',
      description: 'Broodmandje, amlou, olijven, gastronomisch trio van msemen, baghrir en harcha, met spiegeleieren of khlii. Geserveerd met warme drank, sinaasappelsap en huisgemaakte yoghurt.',
      tag: 'Aanrader',
    },
    'mqila-a-la-chakchouka': {
      name: 'M’qila met Shakshuka',
      description: 'Broodmandje, boter, confituur, rode olijven en eieren in kruidige tomaten-paprikasaus. Geserveerd met warme drank, sinaasappelsap, duo van mini-koffiekoeken en huisgemaakte yoghurt.',
    },
    'london-morning': {
      name: 'London Morning',
      description: 'Worstjes, eieren, gebakken champignons, aardappelrösti en gemengde salade. Geserveerd met warme drank, sinaasappelsap, duo van mini-koffiekoeken en huisgemaakte yoghurt.',
    },
    'facon-manhattan': {
      name: 'Manhattan Stijl',
      description: 'Brioche, tzatzikisaus, avocadomousse, runderbacon of gerookte zalm, gepocheerde eieren, hollandaisesaus en bieslook. Geserveerd met warme drank, sinaasappelsap, mini-pancake en huisgemaakte yoghurt.',
    },
    'le-monarq': {
      name: 'Le Monarq (Prestige)',
      description: 'Brioche met garnalen, avocado, mango, pikante saus en uien, vergezeld van een omelet, aardappelrösti, Emmentaler kaas, huisgemaakte yoghurt en wentelteefjes. Warme drank naar keuze en sinaasappelsap.',
      tag: 'Signature Prestige',
    },
    // Tartines
    'tartine-orientale': {
      name: 'Oosterse Tartine',
      description: 'Meergranentoast, tzatzikisaus, hummus, komkommer, falafel en rucola.',
    },
    'tartine-au-saumon': {
      name: 'Zalmtartine',
      description: 'Meergranentoast, avocadomousse, gepocheerde eieren, avocadoschijfjes, verse kaas en gerookte zalm.',
    },
    'tartine-stracciatella': {
      name: 'Stracciatella Tartine',
      description: 'Meergranentoast, verse kaas, runderbacon, gekarameliseerde perzik, stracciatella, basilicum, rucola en balsamico.',
    },
    'tartine-cesar-poulet': {
      name: 'Caesar Kip Tartine',
      description: 'Meergranentoast, Caesarsaus, gegrilde kip, kerstomaatjes, Parmezaanse schilfers en rucola.',
    },
    // Croques
    'croque-madame': {
      name: 'Croque-Madame',
      description: 'Croque-madame belegd met een spiegelei, geserveerd met een goudbruine aardappelrösti.',
    },
    'croque-monsieur': {
      name: 'Croque-Monsieur',
      description: 'Croque-monsieur omhuld met een zachte omelet, geserveerd met een goudbruine aardappelrösti.',
    },
    // Omelettes
    'omelette-nature': { name: 'Omelet Natuur' },
    'omelette-champignons': { name: 'Omelet met Champignons en Fijne Kruiden' },
    'omelette-fromage': { name: 'Kaasomelet' },
    'omelette-charcuterie': { name: 'Omelet met Charcuterie en Kaas' },
    'omelette-saumon': { name: 'Omelet met Zalm en Spinazie' },
    // Pain
    'pain-grille': { name: 'Geroosterd Brood naar Keuze' },
    'trio-marocain': { name: 'Harcha / Msemen / Baghrir' },
    'viennoiserie': { name: 'Koffiekoek naar Keuze' },
    'baghrir-amlou': { name: 'Baghrir met Berberse Amlou' },
    // Entrées
    'carpaccio-boeuf': {
      name: 'Rundercarpaccio',
      description: 'Fijne sneetjes gemarineerd rundvlees, olijfolie en Parmezaanse kaas.',
    },
    'carpaccio-burrata': {
      name: 'Rundercarpaccio & Burrata',
      description: 'Rundercarpaccio met een hart van romige burrata.',
    },
    'aiguillettes-poulet': {
      name: 'Gepaneerde Kipfiletreepjes',
      description: 'Krokante kipfiletreepjes, geserveerd met een saus naar keuze.',
    },
    'gambas-tempura': {
      name: 'Gamba’s in Tempura',
      description: 'Krokante tempuragarnalen met licht pikante zoetzure saus.',
    },
    'briouates-marocaines': {
      name: 'Assortiment Marokkaanse Briouates',
      description: 'Traditioneel krokant gevuld bladerdeeggebak.',
    },
    'croquettes-crevettes': {
      name: 'Huisgemaakte Garnaalkroketten',
      description: 'Ambachtelijk recept van onze chef.',
    },
    'trio-tacos': { name: 'Trio van Gourmet Taco’s' },
    'trio-burgers': {
      name: 'Trio van Gourmet Mini-Burgers',
      description: 'Drie uitzonderlijke mini-burgers om te delen.',
    },
    // Salades
    'salade-cesar': {
      name: 'Caesar Salade',
      description: 'Kropsla, gegrilde kip, Parmezaanse schilfers, tomaten, kwarteleitjes, croutons en Caesardressing.',
    },
    'salade-nicoise': {
      name: 'Salade Niçoise',
      description: 'Sla, maïs, kerstomaatjes, tonijn, ui, zwarte olijven, eieren, penne en vinaigrette.',
    },
    'salade-portofino': {
      name: 'Portofino Salade',
      description: 'Rucola, avocado, gegrilde garnalen, kerstomaatjes en geurige vinaigrette.',
    },
    'salade-burrata': {
      name: 'Burrata Salade',
      description: 'Romige burrata, rucola, kerstomaatjes, perzik, druiven, sinaasappelpartjes en balsamico.',
      tag: 'Favoriet',
    },
    // Pâtes
    'pates-monarq-crevettes': {
      name: 'Monarq Garnalen',
      description: 'Penne met gebakken garnalen en onze huisgemaakte pikante signaturesaus.',
      tag: 'Signature Gerecht 🌶️',
    },
    'pates-monarq-poulet': {
      name: 'Monarq Kip',
      description: 'Penne met kipfiletreepjes en onze huisgemaakte pikante signaturesaus.',
      tag: 'Signature 🌶️',
    },
    'pates-alfredo': {
      name: 'Alfredo',
      description: 'Penne, champignons, kip en fluweelzachte roomsaus.',
    },
    'pates-bolognaise': {
      name: 'Bolognaise',
      description: 'Spaghetti met traag gegaarde kruidige bolognaisesaus.',
    },
    'pates-fruits-de-mer': {
      name: 'Zeevruchten',
      description: 'Linguine met verse zeevruchten en saus naar keuze.',
    },
    'pates-saumon': {
      name: 'Zalm & Spinazie',
      description: 'Tagliatelle, gerookte zalm, verse spinazie en rosésaus.',
    },
    'pates-pesto': {
      name: 'Kip Pesto',
      description: 'Penne, champignons, kip, roomsaus en basilicumpesto.',
    },
    'pates-carbonara': {
      name: 'Carbonara',
      description: 'Room, gerijpte Parmezaanse kaas en gerookte kalkoen.',
    },
    'pates-arrabbiata': {
      name: 'Arrabbiata',
      description: 'Penne met traag gegaarde tomatensaus en pikante pepers.',
    },
    'tagliatelle-alfredo': {
      name: 'Tagliatelle Alfredo',
      description: 'Tagliatelle, kipfiletreepjes in roomsaus, champignons en Parmezaanse kaas.',
    },
    'tagliatelle-salmone': {
      name: 'Tagliatelle Salmone',
      description: 'Tagliatelle, gerookte zalm, spinazie en verfijnde roomsaus.',
    },
    'pates-cardinale': {
      name: 'Cardinale',
      description: 'Linguine, garnalen, champignons en witte roomsaus.',
    },
    'lasagnes': {
      name: 'Huisgemaakte Lasagne',
      description: 'Lasagne met bolognaisesaus, bechamel en gesmolten mozzarella.',
    },
    'crazy-pasta': {
      name: 'Crazy Pasta',
      description: 'Fusilli, garnalen, mozzarella en rosésaus.',
    },
    // Risottos
    'risotto-fruits-de-mer': {
      name: 'Zeevruchtenrisotto',
      description: 'Risotto, schaaldierenmarmelade, verse zeevruchten en Parmezaanse kaas.',
    },
    'risotto-milanais': {
      name: 'Risotto Milanese',
      description: 'Romige risotto met kip en pure saffraansaus.',
    },
    'risotto-saumon': {
      name: 'Zalmrisotto',
      description: 'Risotto met geroosterde zalmfilet, spinazie en groene pesto.',
      tag: 'Aanbeveling van de Chef',
    },
    'risotto-alfredo': {
      name: 'Risotto Alfredo',
      description: 'Risotto met kip, roomsaus en Parmezaanse kaas.',
    },
    // Pizzas
    'pizza-margherita': {
      name: 'Margherita',
      description: 'Tomatensaus, verse mozzarella en basilicum.',
    },
    'pizza-carnivore': {
      name: 'Carnivore',
      description: 'Tomatensaus, mozzarella, pepperoni, kalkoenham, kip, rundergehakt en barbecuesaus.',
    },
    'pizza-fruits-de-mer': {
      name: 'Zeevruchten',
      description: 'Tomatensaus, mozzarella, zeevruchten en knoflook.',
    },
    'pizza-royale': {
      name: 'Royale',
      description: 'Mozzarella, pepperoni, champignons, groene paprika, rode ui, olijven en rundergehakt.',
    },
    'pizza-roasted-potatoes': {
      name: 'Roasted Potatoes',
      description: 'Crème fraîche, mozzarella, aardappelen, kip, knoflook en rozemarijn.',
    },
    'pizza-mexicaine': {
      name: 'Mexicana',
      description: 'Tomatensaus, mozzarella, pepperoni, rode ui, olijven, pepers en knoflook.',
    },
    'pizza-cheesy': {
      name: 'Cheesy',
      description: 'Tomatensaus, mozzarella, feta en geitenkaas.',
    },
    'pizza-tasty-chicken': {
      name: 'Tasty Chicken',
      description: 'Tomatensaus, mozzarella, kip, rode ui en groene paprika.',
    },
    'pizza-vegetarienne': {
      name: 'Vegetarisch',
      description: 'Tomatensaus, mozzarella, champignons, rode ui, groene paprika, olijven en kerstomaatjes.',
    },
    'pizza-pepperoni': {
      name: 'Pepperoni',
      description: 'Tomatensaus, mozzarella en gesneden pepperoni.',
    },
    'pizza-hawai': {
      name: 'Hawaï',
      description: 'Tomatensaus, mozzarella, kalkoenham en ananas.',
    },
    'pizza-poulet-barbecue': {
      name: 'Kip Barbecue',
      description: 'Barbecuesaus, mozzarella, kip, groene paprika en rode ui.',
    },
    'pizza-shrimp': {
      name: 'Shrimp',
      description: 'Tomatensaus, mozzarella, rode ui, kerstomaatjes, olijven, champignons, paprika, knoflook en garnalen.',
    },
    'pizza-viande-hachee': {
      name: 'Gekruid Gehakt',
      description: 'Tomatensaus, mozzarella en gekruid rundergehakt.',
    },
    'pizza-feta': {
      name: 'Feta',
      description: 'Tomatensaus, mozzarella, gekarameliseerde uien, feta en kip.',
    },
    'pizza-thon': {
      name: 'Tonijn',
      description: 'Tomatensaus, mozzarella en tonijn.',
    },
    'pizza-saumon': {
      name: 'Zalm',
      description: 'Tomatensaus, mozzarella, kerstomaatjes, rode ui, zalm en knoflook.',
    },
    'pizza-burrata': {
      name: 'Burrata',
      description: 'Tomatensaus, mozzarella, hele romige burrata, kerstomaatjes en basilicum.',
      tag: 'Prestige',
    },
    'pizza-poulet-satay': {
      name: 'Kip Saté',
      description: 'Satésaus, mozzarella, kip, groene paprika en rode ui.',
    },
    // Burgers
    'burger-classique': {
      name: 'De Klassieke Burger',
      description: 'Rundersteak, cheddar, fijngesneden ijsbergsla, gekarameliseerde uien, tomaat en saus van de chef.',
    },
    'burger-fume': {
      name: 'De Gerookte Truffelburger',
      description: 'Rundvlees, Emmentaler, rucola, gebakken champignons, tomaat, huisgemaakte truffelmayonaise en saus van de chef.',
      tag: 'Truffelsmaak',
    },
    'burger-poulet': {
      name: 'De Kipburger',
      description: 'Kip, cheddar, gekarameliseerde uien met paprika, ijsbergsla, truffelsaus en saus van de chef.',
    },
    'burger-bacon': {
      name: 'De Burger met Runderbacon',
      description: 'Rundvlees, cheddar, gekarameliseerde uien met paprika, ijsbergsla, rode ui, runderbacon, tomaat, augurk en barbecuesaus.',
      tag: 'Gourmet Max',
    },
    // Viandes & Ribs
    'filet-black-angus': {
      name: 'Black Angus Ossenhaas',
      description: 'Edel stuk vlees tot in de perfectie gegrild, geserveerd met bijgerecht naar keuze.',
      tag: 'Signature Vlees',
    },
    'tagliata-boeuf': {
      name: 'Tagliata van Ossenhaas met Truffelolie',
      description: 'Fijn gesneden ossenhaas, rucola, gerijpte Parmezaanse kaas en edele truffelolie.',
    },
    'emince-volaille': {
      name: 'Gesneden Gevogeltesuprême',
      description: 'Gebakken seizoensgroenten en geurige jusreductie.',
    },
    'ribs-epice': {
      name: 'Ribs — Pikant & Barbecue',
      description: 'Traag gegaarde runderribben, gekarameliseerd met pikante barbecuesaus.',
    },
    'ribs-miel': {
      name: 'Ribs — Honing & Barbecue',
      description: 'Boterzachte runderribben geglaceerd met goudgele honing en barbecue.',
    },
    // Plats Marocains
    'couscous-poulet': {
      name: 'Couscous met Kip en Groenten',
      description: 'Gestoomde fijne griesmeel, malse kip en zeven groenten.',
      tag: 'Beschikbaar op Vrijdag',
    },
    'couscous-viande': {
      name: 'Couscous met Rundvlees en Groenten',
      description: 'Fijne griesmeel, smeltend mals rundvlees en geurige bouillon.',
      tag: 'Beschikbaar op Vrijdag',
    },
    'tajine-viande-pruneaux': {
      name: 'Tajine van Rundvlees met Pruimen',
      description: 'Traag gestoofd rundvlees met zachte specerijen, gekarameliseerde pruimen en gouden amandelen.',
      tag: 'Koninklijke Klassieker',
    },
    'tajine-poulet-daghmira': {
      name: 'Tajine van Kip Daghmira met Olijven & Frietjes',
      description: 'Gekonfijte scharrelkip, romige uiensaus en ingemaakte citroen.',
    },
    'tajine-kefta': {
      name: 'Tajine van Kefta met Eieren',
      description: 'Gehaktballetjes met verse kruiden, tomatensaus en spiegeleieren.',
    },
  },
};

export function getLocalizedMenuChapters(lang: Language): MenuChapter[] {
  if (lang === 'fr') return menuChapters;
  const chMap = chapterTranslations[lang];
  const itemMap = itemTranslations[lang];

  return menuChapters.map((ch) => {
    const chTrans = chMap[ch.id];
    return {
      ...ch,
      title: catalogueTranslation(ch.title, lang) ?? chTrans?.title ?? ch.title,
      subtitle: chTrans?.subtitle ?? ch.subtitle,
      timeSlot: chTrans?.timeSlot ?? ch.timeSlot,
      categories: ch.categories.map((cat) => {
        return {
          ...cat,
          name: catalogueTranslation(cat.name, lang) ?? cat.name,
          description: catalogueTranslation(cat.description, lang) ?? cat.description,
          items: cat.items.map((item): MenuItem => {
            const itTrans = itemMap[item.id];
            return {
              ...item,
              name: catalogueTranslation(item.name, lang) ?? itTrans?.name ?? item.name,
              description: item.description ? catalogueDescription(item.id, lang) ?? catalogueTranslation(item.description, lang) ?? itTrans?.description ?? item.description : undefined,
              tag: item.tag ? itTrans?.tag ?? item.tag : undefined,
            };
          }),
        };
      }),
    };
  });
}

export function getLocalizedSignatureHighlights(lang: Language) {
  if (lang === 'fr') return signatureHighlights;
  const chapters = getLocalizedMenuChapters(lang);
  return signatureHighlights.map((item) => {
    const category = chapters.flatMap((chapter) => chapter.categories).find(({ id }) => id === item.menuCategory)!;
    const dish = category.items.find(({ id }) => id === item.itemId)!;
    return { ...item, name: dish.name, category: category.name, description: dish.description ?? '' };
  });
}
