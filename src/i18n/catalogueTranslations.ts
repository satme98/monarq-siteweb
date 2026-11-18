import { Language } from './types';

const rows = `
BOISSONS|Drinks|المشروبات|Dranken
DOUCEURS|Sweets|الحلويات|Zoetigheden
PETITS DÉJEUNERS|Breakfasts|وجبات الفطور|Ontbijt
BRUNCHS|Brunches|برانش|Brunches
TARTINES|Open sandwiches|تارتين|Belegde toasts
CROQUES|Toasted sandwiches|كروك|Tosti’s
OMELETTES|Omelettes|عجة البيض|Omeletten
À LA CARTE|À la carte|حسب الطلب|À la carte
ACCOMPAGNEMENTS & SUPPLÉMENTS|Sides & extras|مرافقات وإضافات|Bijgerechten en extra’s
ENTRÉES FROIDES|Cold starters|مقبلات باردة|Koude voorgerechten
ENTRÉES CHAUDES|Hot starters|مقبلات ساخنة|Warme voorgerechten
SALADES|Salads|سلطات|Salades
SUPPLÉMENTS SALÉS|Savoury extras|إضافات مالحة|Hartige extra’s
PÂTES|Pasta|معكرونة|Pasta
RISOTTOS|Risottos|ريزوتو|Risotto’s
PIZZAS|Pizzas|بيتزا|Pizza’s
SUPPLÉMENTS PIZZAS|Pizza toppings|إضافات البيتزا|Pizzatoppings
BURGERS|Burgers|برغر|Burgers
VIANDES|Meat|لحوم|Vlees
RIBS|Ribs|أضلاع|Ribs
PLATS MAROCAINS|Moroccan dishes|أطباق مغربية|Marokkaanse gerechten
CAFÉS|Coffee|قهوة|Koffie
THÉS|Tea|شاي|Thee
EAUX|Water|مياه|Water
JUS FRAIS — BASE AU CHOIX|Fresh juices — choose a base|عصائر طازجة — اختر الأساس|Verse sappen — kies een basis
BOISSONS FRAÎCHES|Cold drinks|مشروبات باردة|Koude dranken
MOJITOS|Mojitos|موهيتو|Mojito’s
MOCKTAILS|Mocktails|كوكتيلات بدون كحول|Mocktails
DETOX|Detox|ديتوكس|Detox
ICE COFFEE|Iced coffee|قهوة مثلجة|IJskoffie
ICE TEA|Iced tea|شاي مثلج|IJsthee
DESSERTS|Desserts|تحليات|Desserts
CRÊPES|Crêpes|كريب|Crêpes
GAUFRES LIÉGEOISES|Liège waffles|وافل لييج|Luikse wafels
GLACES|Ice cream|مثلجات|IJs
SUPPLÉMENTS SUCRÉS|Sweet extras|إضافات حلوة|Zoete extra’s
Fromage La Vache qui rit|Laughing Cow cheese|جبن البقرة الضاحكة|La Vache qui rit-kaas
Olives|Olives|زيتون|Olijven
Confiture|Jam|مربى|Jam
Fromage edam|Edam cheese|جبن إيدام|Edammer kaas
Fromage à tartiner|Spreadable cheese|جبن قابل للدهن|Smeerkaas
Amlou|Amlou|أملو|Amlou
Fromage manchego|Manchego cheese|جبن مانشيغو|Manchegokaas
Jben arabi|Moroccan fresh cheese|جبن عربي|Marokkaanse verse kaas
Miel|Honey|عسل|Honing
Nutella|Nutella|نوتيلا|Nutella
Beurre|Butter|زبدة|Boter
Dinde fumée|Smoked turkey|ديك رومي مدخن|Gerookte kalkoen
Saumon fumé|Smoked salmon|سلمون مدخن|Gerookte zalm
Avocat|Avocado|أفوكادو|Avocado
Burrata|Burrata|بوراتا|Burrata
Gambas|Prawns|روبيان كبير|Gamba’s
Poulet|Chicken|دجاج|Kip
Viande hachée|Minced meat|لحم مفروم|Gehakt
Bolognaise|Bolognese|بولونيز|Bolognese
Parmesan|Parmesan|بارميزان|Parmezaan
Sauce au choix|Choice of sauce|صلصة حسب الاختيار|Saus naar keuze
Champignons|Mushrooms|فطر|Champignons
Mozzarella|Mozzarella|موزاريلا|Mozzarella
Fromage de chèvre|Goat cheese|جبن الماعز|Geitenkaas
Pepperoni|Pepperoni|بيبروني|Pepperoni
Thon|Tuna|تونة|Tonijn
Ananas|Pineapple|أناناس|Ananas
Gouda|Gouda|غودا|Gouda
Lotus|Lotus|لوتس|Lotus
Chantilly|Whipped cream|كريمة مخفوقة|Slagroom
Americano / Allongé|Americano / Long coffee|أمريكانو / قهوة طويلة|Americano / Lange koffie
Double Espresso|Double espresso|إسبريسو مزدوج|Dubbele espresso
Chocolat chaud|Hot chocolate|شوكولاتة ساخنة|Warme chocolademelk
Verveine au lait|Verbena with milk|لويزة بالحليب|Verbena met melk
Thé marocain|Moroccan tea|شاي مغربي|Marokkaanse thee
Thé noir|Black tea|شاي أسود|Zwarte thee
Verveine nature|Plain verbena|لويزة|Verbena
Mangue|Mango|مانجو|Mango
Pomme|Apple|تفاح|Appel
Fraise|Strawberry|فراولة|Aardbei
Orange|Orange|برتقال|Sinaasappel
Soda|Soft drink|مشروب غازي|Frisdrank
Passion|Passion fruit|فاكهة العاطفة|Passievrucht
Virgin|Virgin|بدون كحول|Virgin
Fruits rouges|Red berries|ثمار حمراء|Rode vruchten
Citronnade|Lemonade|ليمونادة|Citroenlimonade
Ice Latte vanille & caramel|Iced vanilla & caramel latte|لاتيه مثلج بالفانيليا والكراميل|IJslatte met vanille en karamel
Peach|Peach|خوخ|Perzik
Citron|Lemon|ليمون|Citroen
Cheesecake (citron, oreo, lotus)|Cheesecake (lemon, Oreo, Lotus)|تشيز كيك (ليمون، أوريو، لوتس)|Cheesecake (citroen, Oreo, Lotus)
Saint-Sébastien|San Sebastián cheesecake|تشيز كيك سان سيباستيان|San Sebastián-cheesecake
Tiramisu aux spéculoos Lotus|Lotus speculoos tiramisu|تيراميسو ببسكويت لوتس|Tiramisu met Lotus-speculoos
Tiramisu italien|Italian tiramisu|تيراميسو إيطالي|Italiaanse tiramisu
Tiramisu à la pistache|Pistachio tiramisu|تيراميسو بالفستق|Pistachetiramisu
Crêpe nature ou sucre|Plain or sugar crêpe|كريب سادة أو بالسكر|Crêpe naturel of met suiker
Crêpe amlou avec croquant d’amandes|Amlou crêpe with almond crunch|كريب أملو باللوز المقرمش|Crêpe met amlou en krokante amandelen
Crêpe Lotus|Lotus crêpe|كريب لوتس|Lotuscrêpe
Crêpe Nutella|Nutella crêpe|كريب نوتيلا|Nutellacrêpe
Crêpe Nutella banane|Nutella and banana crêpe|كريب نوتيلا وموز|Crêpe met Nutella en banaan
Crêpe à la pistache|Pistachio crêpe|كريب بالفستق|Pistachecrêpe
Pain perdu gourmand|French toast|خبز فرنسي محمص|Wentelteefje
Crêpe Nutella-pistache|Nutella and pistachio crêpe|كريب نوتيلا وفستق|Crêpe met Nutella en pistache
Crêpe de saison|Seasonal crêpe|كريب موسمي|Seizoenscrêpe
Gaufre nature ou sucre|Plain or sugar waffle|وافل سادة أو بالسكر|Wafel naturel of met suiker
Gaufre Lotus|Lotus waffle|وافل لوتس|Lotuswafel
Gaufre Nutella|Nutella waffle|وافل نوتيلا|Nutellawafel
Gaufre à la pistache|Pistachio waffle|وافل بالفستق|Pistachewafel
Gaufre Nutella-pistache|Nutella and pistachio waffle|وافل نوتيلا وفستق|Wafel met Nutella en pistache
1 boule de glace|1 scoop of ice cream|كرة آيس كريم واحدة|1 bol ijs
2 boules de glace|2 scoops of ice cream|كرتا آيس كريم|2 bollen ijs
3 boules de glace|3 scoops of ice cream|3 كرات آيس كريم|3 bollen ijs
Crème brûlée|Crème brûlée|كريم بروليه|Crème brûlée
Saumon|Salmon|سلمون|Zalm
Pesto|Pesto|بيستو|Pesto
Lasagnes|Lasagne|لازانيا|Lasagne
Pain grillé|Toast|خبز محمص|Geroosterd brood
Viennoiserie|Breakfast pastry|معجنات الفطور|Ontbijtgebak
Le Monarq|Le Monarq|لو مونارك|Le Monarq
Trio de tacos|Taco trio|ثلاث قطع تاكو|Tacotrio
Épicé et barbecue|Spicy and barbecue|حار وباربكيو|Pittig en barbecue
Miel et barbecue|Honey and barbecue|عسل وباربكيو|Honing en barbecue
Parfums disponibles Vanille française - Pistache pure - Noisette - Caramel - Kinder Bueno - Ferrero Rocher - Chocolat - Nougat italien - Yaourt amarena - Fruits des bois - Fraise - Citron - Fruit de la passion - Ananas - Mangue - Tiramisu - Oreo - Café - Banane - Coco - Nougat - Chewing-gum|Available flavours: French vanilla, pure pistachio, hazelnut, caramel, Kinder Bueno, Ferrero Rocher, chocolate, Italian nougat, amarena yogurt, forest berries, strawberry, lemon, passion fruit, pineapple, mango, tiramisu, Oreo, coffee, banana, coconut, nougat, bubblegum|النكهات المتوفرة: فانيليا فرنسية، فستق خالص، بندق، كراميل، كيندر بوينو، فيريرو روشيه، شوكولاتة، نوغا إيطالية، زبادي أمارينا، ثمار الغابة، فراولة، ليمون، فاكهة العاطفة، أناناس، مانجو، تيراميسو، أوريو، قهوة، موز، جوز الهند، نوغا، علكة|Beschikbare smaken: Franse vanille, pure pistache, hazelnoot, karamel, Kinder Bueno, Ferrero Rocher, chocolade, Italiaanse nougat, amarena-yoghurt, bosvruchten, aardbei, citroen, passievrucht, ananas, mango, tiramisu, Oreo, koffie, banaan, kokos, nougat, kauwgom
Parfum au choix|Choice of flavour|نكهة حسب الاختيار|Smaak naar keuze
Parfums au choix|Choice of flavours|نكهات حسب الاختيار|Smaken naar keuze
Sauce à la pistache, éclats d’amandes, glace à la vanille et chantilly.|Pistachio sauce, almond pieces, vanilla ice cream and whipped cream.|صلصة الفستق وقطع اللوز وآيس كريم الفانيليا والكريمة المخفوقة.|Pistachesaus, amandelstukjes, vanille-ijs en slagroom.
Nutella, sauce à la pistache, glace à la vanille et chantilly.|Nutella, pistachio sauce, vanilla ice cream and whipped cream.|نوتيلا وصلصة الفستق وآيس كريم الفانيليا والكريمة المخفوقة.|Nutella, pistachesaus, vanille-ijs en slagroom.
Banane et boule de glace à la vanille.|Banana and a scoop of vanilla ice cream.|موز وكرة آيس كريم بالفانيليا.|Banaan en een bol vanille-ijs.
Fruits de saison et une boule de glace au choix.|Seasonal fruit and a scoop of ice cream of your choice.|فواكه موسمية وكرة آيس كريم حسب الاختيار.|Seizoensfruit en een bol ijs naar keuze.
Ananas, lait de coco et jus d’ananas.|Pineapple, coconut milk and pineapple juice.|أناناس وحليب جوز الهند وعصير الأناناس.|Ananas, kokosmelk en ananassap.
Grenadine, ananas et citron.|Grenadine, pineapple and lemon.|غرينادين وأناناس وليمون.|Grenadine, ananas en citroen.
Passion, jus d’orange et eau gazeuse.|Passion fruit, orange juice and sparkling water.|فاكهة العاطفة وعصير البرتقال وماء غازي.|Passievrucht, sinaasappelsap en bruiswater.
Jus de citron et menthe.|Lemon juice and mint.|عصير ليمون ونعناع.|Citroensap en munt.
Gingembre, épinards, concombre et citron.|Ginger, spinach, cucumber and lemon.|زنجبيل وسبانخ وخيار وليمون.|Gember, spinazie, komkommer en citroen.
Disponible le vendredi|Available on Fridays|متوفر يوم الجمعة|Verkrijgbaar op vrijdag
Légumes de saison|Seasonal vegetables|خضروات موسمية|Seizoensgroenten
Trois viandes d’exception|Three select meats|ثلاثة أنواع مميزة من اللحوم|Drie geselecteerde vleessoorten
Margherita|Margherita|مارغريتا|Margherita
Sauce tomate, mozzarella|Tomato sauce, mozzarella|صلصة الطماطم وموزاريلا|Tomatensaus, mozzarella
Sauce tomate, mozzarella, pepperoni|Tomato sauce, mozzarella, pepperoni|صلصة الطماطم وموزاريلا وبيبروني|Tomatensaus, mozzarella, pepperoni
Sauce tomate, mozzarella, viande hachée|Tomato sauce, mozzarella, minced meat|صلصة الطماطم وموزاريلا ولحم مفروم|Tomatensaus, mozzarella, gehakt
Sauce tomate, mozzarella, thon|Tomato sauce, mozzarella, tuna|صلصة الطماطم وموزاريلا وتونة|Tomatensaus, mozzarella, tonijn
Sauce tomate, mozzarella, burrata, tomates cerises et basilic.|Tomato sauce, mozzarella, burrata, cherry tomatoes and basil.|صلصة الطماطم وموزاريلا وبوراتا وطماطم كرزية وريحان.|Tomatensaus, mozzarella, burrata, cherrytomaten en basilicum.
Cortado|Cortado|كورتادو|Cortado
Latte|Latte|لاتيه|Latte
Flat White|Flat White|فلات وايت|Flat White
Espresso|Espresso|إسبريسو|Espresso
Cappuccino|Cappuccino|كابتشينو|Cappuccino
Oulmès — 25 cl|Oulmès — 25 cl|أولماس — 25 سل|Oulmès — 25 cl
Oulmès — 75 cl|Oulmès — 75 cl|أولماس — 75 سل|Oulmès — 75 cl
Sidi Ali — 50 cl|Sidi Ali — 50 cl|سيدي علي — 50 سل|Sidi Ali — 50 cl
Sidi Ali — 75 cl|Sidi Ali — 75 cl|سيدي علي — 75 سل|Sidi Ali — 75 cl
Oulmès mojito|Oulmès Mojito|أولماس موهيتو|Oulmès Mojito
Oulmès tropical|Oulmès Tropical|أولماس تروبيكال|Oulmès Tropical
Red Bull|Red Bull|ريد بول|Red Bull
Energy|Energy|إنرجي|Energy
Piña Colada|Piña Colada|بينيا كولادا|Piña Colada
Bora Bora|Bora Bora|بورا بورا|Bora Bora
The Spritz|The Spritz|ذا سبريتز|The Spritz
Green House|Green House|غرين هاوس|Green House
Ice Spanish Latte|Iced Spanish Latte|سبانيش لاتيه مثلج|Ice Spanish Latte
Tonic Shot|Tonic Shot|تونيك شوت|Tonic Shot
Panna cotta|Panna cotta|بانا كوتا|Panna cotta
César|Caesar|سيزر|Caesar
Niçoise|Niçoise|نيسواز|Niçoise
Portofino|Portofino|بورتوفينو|Portofino
Milanais|Milanese|ميلانيز|Milanese
Baghrir à l’amlou|Baghrir with amlou|بغرير بأملو|Baghrir met amlou
`.trim();

const translations = new Map(rows.split('\n').map((row) => {
  const [fr, en, ar, nl] = row.split('|');
  return [fr, { en, ar, nl }] as const;
}));

export function catalogueTranslation(text: string | undefined, lang: Exclude<Language, 'fr'>) {
  return text ? translations.get(text)?.[lang] : undefined;
}

const descriptionRows = `
premiere-heure|Croissant filled with scrambled eggs, avocado, crispy beef bacon or smoked salmon, Edam and rocket. Served with a hot drink of your choice, orange juice, a pancake and homemade yogurt.|كرواسون محشو بالبيض المخفوق والأفوكادو ولحم بقري مقدد مقرمش أو سلمون مدخن وجبن إيدام وجرجير. يقدم مع مشروب ساخن حسب الاختيار وعصير برتقال وبان كيك وزبادي منزلي.|Croissant met roerei, avocado, knapperige runderbacon of gerookte zalm, edam en rucola. Geserveerd met een warme drank naar keuze, sinaasappelsap, een pancake en huisgemaakte yoghurt.
un-dimanche-a-paris|Brioche French toast, smoked beef bacon, scrambled eggs and pan-fried truffle-scented mushrooms. Served with a hot drink of your choice, orange juice, two mini pancakes and homemade yogurt.|بريوش على طريقة الخبز الفرنسي المحمص ولحم بقري مقدد مدخن وبيض مخفوق وفطر مقلي بنكهة الكمأة. يقدم مع مشروب ساخن حسب الاختيار وعصير برتقال وقطعتين من البان كيك الصغير وزبادي منزلي.|Briochewentelteefje, gerookte runderbacon, roerei en gebakken champignons met truffel. Geserveerd met een warme drank naar keuze, sinaasappelsap, twee minipancakes en huisgemaakte yoghurt.
moroccan-touch|Basket of bread rolls, amlou, olives, msemen, baghrir, harcha and fried eggs with khlii. Served with a hot drink of your choice, orange juice and homemade yogurt.|سلة خبز صغير وأملو وزيتون ومسمن وبغرير وحرشة وبيض مقلي بالخليع. يقدم مع مشروب ساخن حسب الاختيار وعصير برتقال وزبادي منزلي.|Broodmandje, amlou, olijven, msemen, baghrir, harcha en spiegeleieren met khlii. Geserveerd met een warme drank naar keuze, sinaasappelsap en huisgemaakte yoghurt.
mqila-a-la-chakchouka|Basket of bread rolls, butter, jam, red olives and eggs with tomato and peppers. Served with a hot drink of your choice, orange juice, two mini pastries and homemade yogurt.|سلة خبز صغير وزبدة ومربى وزيتون أحمر وبيض بالطماطم والفلفل. تقدم مع مشروب ساخن حسب الاختيار وعصير برتقال وقطعتين من المعجنات الصغيرة وزبادي منزلي.|Broodmandje, boter, jam, rode olijven en eieren met tomaat en paprika. Geserveerd met een warme drank naar keuze, sinaasappelsap, twee kleine ontbijtgebakjes en huisgemaakte yoghurt.
london-morning|Sausages, eggs, sautéed mushrooms, a potato cake and mixed salad. Served with a hot drink of your choice, orange juice, two mini pastries and homemade yogurt.|نقانق وبيض وفطر مشوح وقرص بطاطس وسلطة مشكلة. يقدم مع مشروب ساخن حسب الاختيار وعصير برتقال وقطعتين من المعجنات الصغيرة وزبادي منزلي.|Worstjes, eieren, gebakken champignons, een aardappelkoekje en gemengde salade. Geserveerd met een warme drank naar keuze, sinaasappelsap, twee kleine ontbijtgebakjes en huisgemaakte yoghurt.
facon-manhattan|Brioche, tzatziki, avocado mousse, beef bacon or smoked salmon, poached eggs, hollandaise and chives. Served with a hot drink of your choice, orange juice, a mini pancake and homemade yogurt.|بريوش وتزاتزيكي وموس الأفوكادو ولحم بقري مقدد أو سلمون مدخن وبيض مسلوق دون قشر وصلصة هولنديز وثوم معمر. يقدم مع مشروب ساخن حسب الاختيار وعصير برتقال وبان كيك صغير وزبادي منزلي.|Brioche, tzatziki, avocadomousse, runderbacon of gerookte zalm, gepocheerde eieren, hollandaisesaus en bieslook. Geserveerd met een warme drank naar keuze, sinaasappelsap, een minipancake en huisgemaakte yoghurt.
le-monarq|Brioche with prawns, avocado, mango, hot sauce and onions, served with an omelette, a potato cake, Emmental, homemade yogurt and French toast. Served with a hot drink of your choice and orange juice.|بريوش بالروبيان والأفوكادو والمانجو والصلصة الحارة والبصل، مع عجة وقرص بطاطس وجبن إمنتال وزبادي منزلي وخبز فرنسي محمص. يقدم مع مشروب ساخن حسب الاختيار وعصير برتقال.|Brioche met garnalen, avocado, mango, pittige saus en ui, met een omelet, aardappelkoekje, emmentaler, huisgemaakte yoghurt en wentelteefje. Geserveerd met een warme drank naar keuze en sinaasappelsap.
croque-madame|Croque-madame topped with a fried egg, served with a potato cake.|كروك مدام مع بيضة مقلية وقرص بطاطس.|Croque-madame met een spiegelei en een aardappelkoekje.
croque-monsieur|Croque-monsieur wrapped in an omelette, served with a potato cake.|كروك مسيو ملفوف بعجة ويقدم مع قرص بطاطس.|Croque-monsieur omhuld met omelet en geserveerd met een aardappelkoekje.
gambas-tempura|Prawn tempura with spicy sweet-and-sour sauce.|تمبورا الروبيان مع صلصة حلوة وحامضة حارة.|Garnalentempura met pittige zoetzure saus.
salade-portofino|Rocket, avocado, grilled prawns, cherry tomatoes and vinaigrette.|جرجير وأفوكادو وروبيان مشوي وطماطم كرزية وتتبيلة خل.|Rucola, avocado, gegrilde garnalen, cherrytomaten en vinaigrette.
salade-burrata|Burrata, rocket, cherry tomatoes, peach, grapes, orange segments and balsamic sauce.|بوراتا وجرجير وطماطم كرزية وخوخ وعنب وفصوص برتقال وصلصة بلسمك.|Burrata, rucola, cherrytomaten, perzik, druiven, sinaasappelpartjes en balsamicosaus.
pates-alfredo|Penne, mushrooms, chicken and white sauce (choice of sauce).|بيني وفطر ودجاج وصلصة بيضاء (الصلصة حسب الاختيار).|Penne, champignons, kip en witte saus (saus naar keuze).
pates-bolognaise|Spaghetti with Bolognese sauce.|سباغيتي بصلصة البولونيز.|Spaghetti met bolognesesaus.
pates-fruits-de-mer|Linguine, seafood and white sauce (choice of sauce).|لينغويني ومأكولات بحرية وصلصة بيضاء (الصلصة حسب الاختيار).|Linguine, zeevruchten en witte saus (saus naar keuze).
pates-saumon|Tagliatelle, smoked salmon, spinach and pink sauce.|تالياتيلي وسلمون مدخن وسبانخ وصلصة وردية.|Tagliatelle, gerookte zalm, spinazie en roze saus.
pates-monarq-crevettes|Penne with prawns and homemade hot sauce.|بيني بالروبيان والصلصة الحارة المنزلية.|Penne met garnalen en huisgemaakte pittige saus.
pates-monarq-poulet|Chicken penne with homemade hot sauce.|بيني بالدجاج والصلصة الحارة المنزلية.|Penne met kip en huisgemaakte pittige saus.
pates-pesto|Penne, mushrooms, chicken, white sauce and pesto.|بيني وفطر ودجاج وصلصة بيضاء وبيستو.|Penne, champignons, kip, witte saus en pesto.
pates-carbonara|Cream, Parmesan, smoked turkey|كريمة وبارميزان وديك رومي مدخن|Room, parmezaan, gerookte kalkoen
pates-arrabbiata|Penne, tomato sauce and hot sauce.|بيني وصلصة طماطم وصلصة حارة.|Penne, tomatensaus en pittige saus.
tagliatelle-alfredo|Tagliatelle, sliced chicken in cream sauce, mushrooms and Parmesan|تالياتيلي وشرائح دجاج بالكريمة وفطر وبارميزان|Tagliatelle, kipreepjes in roomsaus, champignons en parmezaan
tagliatelle-salmone|Tagliatelle, smoked salmon, spinach and cream sauce|تالياتيلي وسلمون مدخن وسبانخ وصلصة كريمة|Tagliatelle, gerookte zalm, spinazie en roomsaus
lasagnes|Lasagne, Bolognese sauce, béchamel and mozzarella.|لازانيا وصلصة بولونيز وبشاميل وموزاريلا.|Lasagne, bolognesesaus, bechamel en mozzarella.
risotto-fruits-de-mer|Risotto, marmalade, seafood and Parmesan.|ريزوتو ومربى ومأكولات بحرية وبارميزان.|Risotto, marmelade, zeevruchten en parmezaan.
risotto-milanais|Risotto, chicken and saffron sauce|ريزوتو ودجاج وصلصة زعفران|Risotto, kip en saffraansaus
risotto-saumon|Risotto, salmon fillet, spinach and pesto.|ريزوتو وقطعة سلمون وسبانخ وبيستو.|Risotto, zalmfilet, spinazie en pesto.
burger-poulet|Chicken, cheddar, paprika-caramelised onions, rocket, tomato slices, pickles, truffle sauce and chef’s sauce.|دجاج وشيدر وبصل مكرمل بالبابريكا وجرجير وشرائح طماطم ومخلل وصلصة الكمأة وصلصة الشيف.|Kip, cheddar, met paprika gekaramelliseerde uien, rucola, plakjes tomaat, augurken, truffelsaus en chefsaus.
`.trim();

const descriptions = new Map(descriptionRows.split('\n').map((row) => {
  const [id, en, ar, nl] = row.split('|');
  return [id, { en, ar, nl }] as const;
}));

export function catalogueDescription(id: string, lang: Exclude<Language, 'fr'>) {
  return descriptions.get(id)?.[lang];
}
