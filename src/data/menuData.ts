import { MenuChapter, MenuItem } from '../types';

export const menuChapters: MenuChapter[] = [
  {
    id: 'le-matin',
    title: 'LE MATIN',
    subtitle: 'Petits Déjeuners & Grands Brunchs Signatures',
    timeSlot: '08h00 — 14h00',
    categories: [
      {
        id: 'petits-dejeuners',
        name: 'PETITS DÉJEUNERS',
        chapterId: 'le-matin',
        items: [
          {
            id: 'a-la-hate',
            name: 'À la hâte',
            description: 'Pain grillé, 3 mini-viennoiseries, beurre, confiture, olives, mini-jus d\'orange, boisson chaude.',
            price: 49,
            category: 'petits-dejeuners',
            chapter: 'le-matin',
          },
          {
            id: 'tangerois',
            name: 'Tangérois',
            description: 'Œufs au plat, pain complet, jambon de dinde, jben arabe, fromage rouge, huile d\'olive, olives, mini-jus d\'orange, boisson chaude.',
            price: 49,
            tag: 'Spécialité Locale',
            category: 'petits-dejeuners',
            chapter: 'le-matin',
          },
          {
            id: 'hollandaise',
            name: 'Hollandaise',
            description: '2 œufs au plat, toast grillé, dinde fumée, fromage edam, mesclun de salade, olives, sauce hollandaise, mini-jus d\'orange, boisson chaude.',
            price: 55,
            category: 'petits-dejeuners',
            chapter: 'le-matin',
          },
          {
            id: 'espagnol',
            name: 'Espagnol',
            description: 'Pain grillé, fromage manchego, purée de tomate fraîche, huile d\'olive, tapenade, mini-jus d\'orange, boisson chaude.',
            price: 55,
            category: 'petits-dejeuners',
            chapter: 'le-matin',
          },
        ]
      },
      {
        id: 'brunches',
        name: 'LES BRUNCHS COMPLETS',
        chapterId: 'le-matin',
        description: 'Chaque brunch est servi avec une boisson chaude au choix, un jus d\'orange frais, un pancake et un yaourt maison.',
        items: [
          {
            id: 'bagel-au-saumon',
            name: 'Bagel au saumon',
            description: 'Bagel, fromage frais, mousse d\'avocat, saumon fumé et roquette. Servi avec une boisson chaude au choix, un jus d\'orange, un pancake et un yaourt maison.',
            price: 89,
            image: '/images/highlight-dimanche.jpg',
            category: 'brunches',
            chapter: 'le-matin',
          },
          {
            id: 'premiere-heure',
            name: 'Première heure',
            description: 'Croissant garni d\'œufs brouillés, d\'avocat, de bacon de bœuf croustillant ou de saumon fumé, de fromage edam et de roquette. Servi avec boisson chaude, jus d\'orange, pancake et yaourt maison.',
            price: 89,
            category: 'brunches',
            chapter: 'le-matin',
          },
          {
            id: 'le-brunch-equilibre',
            name: 'Le brunch équilibré',
            description: 'Pain complet grillé, blancs d\'œufs brouillés, avocat, bol de granola et mesclun de salade. Servi avec une boisson chaude au choix et un mini-jus d\'orange.',
            price: 89,
            isVegetarian: true,
            category: 'brunches',
            chapter: 'le-matin',
          },
          {
            id: 'un-dimanche-a-paris',
            name: 'Un dimanche à Paris',
            description: 'Brioche façon pain perdu, bacon de bœuf fumé, œufs brouillés et poêlée de champignons parfumée à la truffe. Servie avec boisson chaude, jus d\'orange, duo de mini-pancakes et yaourt maison.',
            price: 89,
            tag: 'Favori des Clients',
            image: '/images/favourite-dimanche.jpg',
            category: 'brunches',
            chapter: 'le-matin',
          },
          {
            id: 'moroccan-touch',
            name: 'Moroccan Touch',
            description: 'Corbeille de pistolets, amlou, olives, trio gourmand de msemen, baghrir et harcha, et œufs au plat ou khlii. Servie avec boisson chaude, jus d\'orange et yaourt maison.',
            price: 89,
            tag: 'Incontournable',
            category: 'brunches',
            chapter: 'le-matin',
          },
          {
            id: 'mqila-a-la-chakchouka',
            name: 'M\'qila à la chakchouka',
            description: 'Corbeille de pistolets, beurre, confiture, olives rouges et œufs à la tomate et aux poivrons. Servie avec boisson chaude, jus d\'orange, duo de mini-viennoiseries et yaourt maison.',
            price: 89,
            category: 'brunches',
            chapter: 'le-matin',
          },
          {
            id: 'london-morning',
            name: 'London Morning',
            description: 'Saucisses, œufs, champignons sautés, galette de pommes de terre et méli-mélo de salade. Servi avec boisson chaude, jus d\'orange, duo de mini-viennoiseries et yaourt maison.',
            price: 89,
            category: 'brunches',
            chapter: 'le-matin',
          },
          {
            id: 'facon-manhattan',
            name: 'Façon Manhattan',
            description: 'Brioche, sauce tzatziki, mousse d\'avocat, bacon de bœuf ou saumon fumé, œufs pochés, sauce hollandaise et ciboulette. Servi avec boisson chaude, jus d\'orange, mini-pancake et yaourt maison.',
            price: 89,
            category: 'brunches',
            chapter: 'le-matin',
          },
          {
            id: 'le-monarq',
            name: 'Le Monarq (Prestige)',
            description: 'Brioche aux crevettes, avocat, mangue, sauce piquante et oignons, accompagnée d\'une omelette, d\'une galette de pommes de terre, de fromage emmental, d\'un yaourt maison et de pain perdu. Boisson chaude au choix et jus d\'orange.',
            price: 99,
            tag: 'Signature Prestige',
            image: '/images/highlight-monarq.jpg',
            category: 'brunches',
            chapter: 'le-matin',
          },
        ]
      }
    ]
  },
  {
    id: 'carte-du-matin',
    title: 'À LA CARTE DU MATIN',
    subtitle: 'Tartines, Croques Croustillants & Omelettes',
    timeSlot: '08h00 — 14h00',
    categories: [
      {
        id: 'tartines',
        name: 'TARTINES GOURMANDES',
        chapterId: 'carte-du-matin',
        items: [
          {
            id: 'tartine-orientale',
            name: 'Tartine orientale',
            description: 'Tartine aux céréales, sauce tzatziki, houmous, concombre, falafels et roquette.',
            price: 59,
            isVegetarian: true,
            category: 'tartines',
            chapter: 'carte-du-matin',
          },
          {
            id: 'tartine-au-saumon',
            name: 'Tartine au saumon',
            description: 'Tartine aux céréales, mousse d\'avocat, œufs pochés, tranche d\'avocat, fromage blanc et saumon fumé.',
            price: 59,
            category: 'tartines',
            chapter: 'carte-du-matin',
          },
          {
            id: 'tartine-stracciatella',
            name: 'Tartine à la stracciatella',
            description: 'Tartine aux céréales, fromage blanc, bacon de bœuf, pêche caramélisée, stracciatella, basilic, roquette et sauce balsamique.',
            price: 59,
            category: 'tartines',
            chapter: 'carte-du-matin',
          },
          {
            id: 'tartine-cesar-poulet',
            name: 'Tartine César au poulet',
            description: 'Tartine aux céréales, sauce César, poulet grillé, tomates cerises, copeaux de parmesan et roquette.',
            price: 69,
            category: 'tartines',
            chapter: 'carte-du-matin',
          },
        ]
      },
      {
        id: 'croques',
        name: 'CROQUES MONARQ',
        chapterId: 'carte-du-matin',
        items: [
          {
            id: 'croque-madame',
            name: 'Croque-madame',
            description: 'Croque-madame garni d\'un œuf au plat, accompagné d\'une galette de pommes de terre dorée.',
            price: 59,
            category: 'croques',
            chapter: 'carte-du-matin',
          },
          {
            id: 'croque-monsieur',
            name: 'Croque-monsieur',
            description: 'Croque-monsieur enrobé d\'une omelette, accompagné d\'une galette de pommes de terre dorée.',
            price: 59,
            category: 'croques',
            chapter: 'carte-du-matin',
          },
        ]
      },
      {
        id: 'omelettes',
        name: 'OMELETTES POÊLÉES',
        chapterId: 'carte-du-matin',
        items: [
          { id: 'omelette-nature', name: 'Omelette nature', price: 25, category: 'omelettes', chapter: 'carte-du-matin' },
          { id: 'omelette-champignons', name: 'Omelette aux champignons et fines herbes', price: 40, category: 'omelettes', chapter: 'carte-du-matin' },
          { id: 'omelette-fromage', name: 'Omelette au fromage', price: 32, category: 'omelettes', chapter: 'carte-du-matin' },
          { id: 'omelette-charcuterie', name: 'Omelette à la charcuterie et au fromage', price: 39, category: 'omelettes', chapter: 'carte-du-matin' },
          { id: 'omelette-saumon', name: 'Omelette au saumon et aux épinards', price: 45, category: 'omelettes', chapter: 'carte-du-matin' },
        ]
      },
      {
        id: 'a-la-carte-pain',
        name: 'DOUCEURS TRADITIONNELLES',
        chapterId: 'carte-du-matin',
        items: [
          { id: 'pain-grille', name: 'Pain grillé au choix', price: 7, category: 'a-la-carte-pain', chapter: 'carte-du-matin' },
          { id: 'trio-marocain', name: 'Harcha / Msemen / Baghrir', price: 10, category: 'a-la-carte-pain', chapter: 'carte-du-matin' },
          { id: 'viennoiserie', name: 'Viennoiserie au choix', price: 10, category: 'a-la-carte-pain', chapter: 'carte-du-matin' },
          { id: 'baghrir-amlou', name: 'Baghrir à l\'amlou berbère', price: 28, category: 'a-la-carte-pain', chapter: 'carte-du-matin' },
        ]
      }
    ]
  },
  {
    id: 'la-cuisine',
    title: 'LA CUISINE',
    subtitle: 'Entrées Délicates, Salades Fraîches, Pâtes Artisanales & Risottos',
    timeSlot: '12h00 — 00h00',
    categories: [
      {
        id: 'entrees-froides-chaudes',
        name: 'ENTRÉES FROIDES & CHAUDES',
        chapterId: 'la-cuisine',
        items: [
          { id: 'carpaccio-boeuf', name: 'Carpaccio de bœuf', description: 'Fines tranches de bœuf mariné, huile d\'olive et parmesan.', price: 89, category: 'entrees-froides-chaudes', chapter: 'la-cuisine' },
          { id: 'carpaccio-burrata', name: 'Carpaccio de bœuf et burrata', description: 'Carpaccio de bœuf avec cœur de burrata crémeuse.', price: 110, category: 'entrees-froides-chaudes', chapter: 'la-cuisine' },
          { id: 'aiguillettes-poulet', name: 'Aiguillettes de poulet panées', description: 'Filets de poulet panés, accompagnés d\'une sauce au choix.', price: 45, category: 'entrees-froides-chaudes', chapter: 'la-cuisine' },
          { id: 'gambas-tempura', name: 'Gambas en tempura', description: 'Crevettes en tempura croustillante, sauce aigre-douce pimentée.', price: 55, category: 'entrees-froides-chaudes', chapter: 'la-cuisine' },
          { id: 'briouates-marocaines', name: 'Assortiment de briouates marocaines', description: 'Assortiment croustillant traditionnel.', price: 55, category: 'entrees-froides-chaudes', chapter: 'la-cuisine' },
          { id: 'croquettes-crevettes', name: 'Croquettes de crevettes faites maison', description: 'Recette artisanale de notre chef.', price: 89, category: 'entrees-froides-chaudes', chapter: 'la-cuisine' },
          { id: 'trio-tacos', name: 'Trio de tacos gourmets', price: 89, category: 'entrees-froides-chaudes', chapter: 'la-cuisine' },
          { id: 'trio-burgers', name: 'Trio de burgers gourmets', description: 'Trois viandes d\'exception en bouchées.', price: 110, category: 'entrees-froides-chaudes', chapter: 'la-cuisine' },
        ]
      },
      {
        id: 'salades',
        name: 'SALADES FRAÎCHES & RAFFINÉES',
        chapterId: 'la-cuisine',
        items: [
          { id: 'salade-cesar', name: 'Salade César', description: 'Laitue, poulet grillé, copeaux de parmesan, tomates, œufs de caille, croûtons et sauce César.', price: 85, category: 'salades', chapter: 'la-cuisine' },
          { id: 'salade-nicoise', name: 'Salade Niçoise', description: 'Laitue, maïs, tomates cerises, thon, oignon, olives noires, œufs, penne et vinaigrette.', price: 75, category: 'salades', chapter: 'la-cuisine' },
          { id: 'salade-portofino', name: 'Salade Portofino', description: 'Roquette, avocat, crevettes grillées, tomates cerises et vinaigrette parfumée.', price: 85, category: 'salades', chapter: 'la-cuisine' },
          { id: 'salade-burrata', name: 'Salade Burrata', description: 'Burrata crémeuse, roquette, tomates cerises, pêche, raisin, segments d\'orange et sauce balsamique.', price: 95, tag: 'Coup de Cœur', isVegetarian: true, category: 'salades', chapter: 'la-cuisine' },
        ]
      },
      {
        id: 'pates',
        name: 'PÂTES ARTISANALES',
        chapterId: 'la-cuisine',
        items: [
          { id: 'pates-monarq-crevettes', name: 'Monarq crevettes', description: 'Penne aux crevettes sautées, sauce piquante maison signature.', price: 98, isSpicy: true, tag: 'Plat Signature 🌶️', image: '/images/highlight-crevettes.jpg', category: 'pates', chapter: 'la-cuisine' },
          { id: 'pates-monarq-poulet', name: 'Monarq poulet', description: 'Penne au poulet émincé, sauce piquante maison signature.', price: 92, isSpicy: true, tag: 'Signature 🌶️', category: 'pates', chapter: 'la-cuisine' },
          { id: 'pates-alfredo', name: 'Alfredo', description: 'Penne, champignons, poulet et sauce blanche onctueuse.', price: 79, category: 'pates', chapter: 'la-cuisine' },
          { id: 'pates-bolognaise', name: 'Bolognaise', description: 'Spaghettis à la sauce bolognaise mijotée aux aromates.', price: 79, category: 'pates', chapter: 'la-cuisine' },
          { id: 'pates-fruits-de-mer', name: 'Fruits de mer', description: 'Linguine, fruits de mer frais et sauce blanche au choix.', price: 98, category: 'pates', chapter: 'la-cuisine' },
          { id: 'pates-saumon', name: 'Saumon & Épinards', description: 'Tagliatelles, saumon fumé, épinards frais et sauce rosée.', price: 98, category: 'pates', chapter: 'la-cuisine' },
          { id: 'pates-pesto', name: 'Pesto Poulet', description: 'Penne, champignons, poulet, sauce blanche et pesto au basilic.', price: 89, category: 'pates', chapter: 'la-cuisine' },
          { id: 'pates-carbonara', name: 'Carbonara', description: 'Crème, parmesan affiné, dinde fumée.', price: 75, category: 'pates', chapter: 'la-cuisine' },
          { id: 'pates-arrabbiata', name: 'Arrabbiata', description: 'Penne, sauce tomate mijotée et sauce piquante.', price: 69, isSpicy: true, category: 'pates', chapter: 'la-cuisine' },
          { id: 'tagliatelle-alfredo', name: 'Tagliatelle alfredo', description: 'Tagliatelle, émincé de poulet à la crème, champignons, fromage parmesan.', price: 98, category: 'pates', chapter: 'la-cuisine' },
          { id: 'tagliatelle-salmone', name: 'Tagliatelle salmone', description: 'Tagliatelle, saumon fumé, épinards, sauce délicate à la crème.', price: 98, category: 'pates', chapter: 'la-cuisine' },
          { id: 'pates-cardinale', name: 'Cardinale', description: 'Linguine, crevettes, champignons et sauce blanche.', price: 95, category: 'pates', chapter: 'la-cuisine' },
          { id: 'lasagnes', name: 'Lasagnes maison', description: 'Lasagnes, sauce bolognaise, béchamel et mozzarella fondante.', price: 79, category: 'pates', chapter: 'la-cuisine' },
          { id: 'crazy-pasta', name: 'Crazy Pasta', description: 'Fusilli, crevettes, mozzarella et sauce rosée.', price: 89, category: 'pates', chapter: 'la-cuisine' },
        ]
      },
      {
        id: 'risottos',
        name: 'RISOTTOS ONCTUEUX',
        chapterId: 'la-cuisine',
        items: [
          { id: 'risotto-fruits-de-mer', name: 'Risotto Fruits de mer', description: 'Risotto, marmelade de crustacés, fruits de mer et parmesan.', price: 110, category: 'risottos', chapter: 'la-cuisine' },
          { id: 'risotto-milanais', name: 'Risotto Milanais', description: 'Risotto crémeux, poulet et sauce au safran pur.', price: 110, category: 'risottos', chapter: 'la-cuisine' },
          { id: 'risotto-saumon', name: 'Risotto au Saumon', description: 'Risotto, pavé de saumon rôti, épinards et pesto vert.', price: 135, tag: 'Recommandation Chef', category: 'risottos', chapter: 'la-cuisine' },
          { id: 'risotto-alfredo', name: 'Risotto Alfredo', description: 'Risotto au poulet, sauce à la crème, fromage parmesan.', price: 99, category: 'risottos', chapter: 'la-cuisine' },
        ]
      }
    ]
  },
  {
    id: 'pizzas-grillades',
    title: 'PIZZAS & GRILLADES',
    subtitle: 'Pizzas Artisanales, Burgers Gourmets, Viandes Nobles & Plats Marocains',
    timeSlot: '12h00 — 00h00',
    categories: [
      {
        id: 'pizzas',
        name: 'PIZZAS AU FEU DE BOIS',
        chapterId: 'pizzas-grillades',
        items: [
          { id: 'pizza-margherita', name: 'Margherita', description: 'Sauce tomate, mozzarella fraîche, basilic.', price: 75, isVegetarian: true, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-carnivore', name: 'Carnivore', description: 'Sauce tomate, mozzarella, pepperoni, jambon de dinde, poulet, viande hachée et sauce barbecue.', price: 95, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-fruits-de-mer', name: 'Fruits de mer', description: 'Sauce tomate, mozzarella, fruits de mer et ail.', price: 95, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-royale', name: 'Royale', description: 'Mozzarella, pepperoni, champignons, poivron vert, oignon rouge, olives et viande hachée.', price: 95, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-roasted-potatoes', name: 'Roasted Potatoes', description: 'Crème fraîche, mozzarella, pommes de terre, poulet, ail et romarin.', price: 95, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-mexicaine', name: 'Mexicaine', description: 'Sauce tomate, mozzarella, pepperoni, oignons rouges, olives, piments et ail.', price: 85, isSpicy: true, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-cheesy', name: 'Cheesy', description: 'Sauce tomate, mozzarella, feta et fromage de chèvre.', price: 95, isVegetarian: true, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-tasty-chicken', name: 'Tasty Chicken', description: 'Sauce tomate, mozzarella, poulet, oignons rouges et poivron vert.', price: 85, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-vegetarienne', name: 'Végétarienne', description: 'Sauce tomate, mozzarella, champignons, oignons rouges, poivron vert, olives et tomates cerises.', price: 85, isVegetarian: true, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-pepperoni', name: 'Pepperoni', description: 'Sauce tomate, mozzarella, pepperoni tranché.', price: 89, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-hawai', name: 'Hawaï', description: 'Sauce tomate, mozzarella, jambon de dinde et ananas.', price: 85, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-poulet-barbecue', name: 'Poulet barbecue', description: 'Sauce barbecue, mozzarella, poulet, poivron vert et oignons rouges.', price: 89, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-shrimp', name: 'Shrimp', description: 'Sauce tomate, mozzarella, oignons rouges, tomates cerises, olives, champignons, paprika, ail et crevettes.', price: 95, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-viande-hachee', name: 'Viande hachée', description: 'Sauce tomate, mozzarella, viande hachée assaisonnée.', price: 89, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-feta', name: 'Feta', description: 'Sauce tomate, mozzarella, oignons caramélisés, feta et poulet.', price: 95, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-thon', name: 'Thon', description: 'Sauce tomate, mozzarella, thon.', price: 89, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-saumon', name: 'Saumon', description: 'Sauce tomate, mozzarella, tomates cerises, oignons rouges, saumon et ail.', price: 95, category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-burrata', name: 'Burrata', description: 'Sauce tomate, mozzarella, burrata entière crémeuse, tomates cerises et basilic.', price: 125, tag: 'Prestige', category: 'pizzas', chapter: 'pizzas-grillades' },
          { id: 'pizza-poulet-satay', name: 'Poulet satay', description: 'Sauce satay, mozzarella, poulet, poivron vert et oignons rouges.', price: 89, category: 'pizzas', chapter: 'pizzas-grillades' },
        ]
      },
      {
        id: 'burgers',
        name: 'BURGERS GOURMETS',
        chapterId: 'pizzas-grillades',
        items: [
          { id: 'burger-classique', name: 'Le burger classique', description: 'Steak de bœuf, cheddar, salade iceberg ciselée, oignons caramélisés, rondelles de tomate et sauce du chef.', price: 95, category: 'burgers', chapter: 'pizzas-grillades' },
          { id: 'burger-fume', name: 'Le burger fumé', description: 'Bœuf, emmental, roquette, champignons sautés, rondelles de tomate et mayonnaise maison à la truffe et sauce du chef.', price: 95, tag: 'Saveur Truffe', category: 'burgers', chapter: 'pizzas-grillades' },
          { id: 'burger-poulet', name: 'Le burger au poulet', description: 'Poulet, cheddar, oignons caramélisés au paprika, salade iceberg ciselée, oignons et sauce à la truffe et sauce du chef.', price: 69, category: 'burgers', chapter: 'pizzas-grillades' },
          { id: 'burger-bacon', name: 'Le burger au bacon de bœuf', description: 'Bœuf, cheddar, oignons caramélisés au paprika, salade iceberg ciselée, oignons rouges, bacon de bœuf, rondelles de tomate, cornichons et sauce barbecue.', price: 119, tag: 'Gourmet Max', category: 'burgers', chapter: 'pizzas-grillades' },
        ]
      },
      {
        id: 'viandes-ribs',
        name: "VIANDES D'EXCEPTION & RIBS",
        chapterId: 'pizzas-grillades',
        items: [
          { id: 'filet-black-angus', name: 'Filet pur Black Angus', description: 'Pièce noble grillée à la perfection, servie avec accompagnement au choix.', price: 219, tag: 'Signature Viande', image: '/images/highlight-angus.jpg', category: 'viandes-ribs', chapter: 'pizzas-grillades' },
          { id: 'tagliata-boeuf', name: 'Tagliata de filet de bœuf à l\'huile de truffe', description: 'Tranché fin, roquette, parmesan affiné et huile de truffe noble.', price: 229, category: 'viandes-ribs', chapter: 'pizzas-grillades' },
          { id: 'emince-volaille', name: 'Émincé de suprême de volaille', description: 'Légumes de saison sautés et réduction parfumée.', price: 139, category: 'viandes-ribs', chapter: 'pizzas-grillades' },
          { id: 'ribs-epice', name: 'Ribs — Épicé et barbecue', description: 'Travers de bœuf confits, caramélisés sauce barbecue relevée.', price: 259, isSpicy: true, category: 'viandes-ribs', chapter: 'pizzas-grillades' },
          { id: 'ribs-miel', name: 'Ribs — Miel et barbecue', description: 'Travers de bœuf tendres et fondants au miel d\'or.', price: 259, category: 'viandes-ribs', chapter: 'pizzas-grillades' },
        ]
      },
      {
        id: 'plats-marocains',
        name: 'PLATS TRADITIONNELS DU ROYAUME',
        chapterId: 'pizzas-grillades',
        description: 'Nos recettes authentiques marocaines préparées chaque jour avec passion.',
        items: [
          { id: 'couscous-poulet', name: 'Couscous poulet aux légumes', description: 'Semoule fine cuite à la vapeur, poulet tendre et sept légumes.', price: 69, isFridaySpecial: true, tag: 'Disponible le Vendredi', category: 'plats-marocains', chapter: 'pizzas-grillades' },
          { id: 'couscous-viande', name: 'Couscous viande aux légumes', description: 'Semoule fine, viande de bœuf fondante et bouillon parfumé.', price: 89, isFridaySpecial: true, tag: 'Disponible le Vendredi', category: 'plats-marocains', chapter: 'pizzas-grillades' },
          { id: 'tajine-viande-pruneaux', name: 'Tajine de viande aux pruneaux', description: 'Bœuf mijoté aux épices douces, pruneaux caramélisés et amandes dorées.', price: 89, tag: 'Classique Royal', category: 'plats-marocains', chapter: 'pizzas-grillades' },
          { id: 'tajine-poulet-daghmira', name: 'Tajine de poulet daghmira, aux olives & frites', description: 'Poulet fermier confit, sauce onctueuse aux oignons et citron confit.', price: 75, category: 'plats-marocains', chapter: 'pizzas-grillades' },
          { id: 'tajine-kefta', name: 'Tajine de kefta aux œufs', description: 'Boulettes de kefta aux herbes fraîches, coulis de tomate et œufs au plat.', price: 69, category: 'plats-marocains', chapter: 'pizzas-grillades' },
        ]
      }
    ]
  }
];

export const signatureHighlights = [
  {
    name: 'Le Monarq',
    category: 'BRUNCHS',
    description: "Brioche aux crevettes, avocat, mangue, sauce piquante et oignons, accompagnée d'une omelette, d'une galette de pommes de terre, de fromage emmental, d'un yaourt maison et de pain perdu. Servie avec une boisson chaude au choix et un jus d'orange.",
    price: '99 DH',
    image: '/images/monarq-eggs-benedict-pour.png',
    tag: 'Signature Brunch',
  },
  {
    name: 'Monarq poulet',
    category: 'PÂTES',
    description: 'Penne aux crevettes, sauce piquante maison.',
    price: '92 DH',
    image: '/images/monarq-gourmet-salad.jpg',
    tag: 'Spécialité 🌶️',
  },
  {
    name: 'Burrata',
    category: 'PIZZAS',
    description: 'Sauce tomate, mozzarella, burrata, tomates cerises et basilic.',
    price: '125 DH',
    image: '/images/monarq-carpaccio-cocktails.jpg',
    tag: 'Prestige',
  },
];
