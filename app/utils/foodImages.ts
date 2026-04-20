const BASE = 'https://img.spoonacular.com/ingredients_250x250';

const imageMap: Record<string, string> = {
  // Légumes
  carotte: `${BASE}/carrots.jpg`,
  tomate: `${BASE}/tomato.jpg`,
  courgette: `${BASE}/zucchini.jpg`,
  poivron: `${BASE}/bell-pepper-orange.jpg`,
  brocoli: `${BASE}/broccoli.jpg`,
  'chou-fleur': `${BASE}/cauliflower.jpg`,
  epinards: `${BASE}/spinach.jpg`,
  salade: `${BASE}/mixed-greens-702.jpg`,
  oignon: `${BASE}/brown-onion.jpg`,
  ail: `${BASE}/garlic.jpg`,
  // Fruits
  pomme: `${BASE}/apple.jpg`,
  banane: `${BASE}/bananas.jpg`,
  poire: `${BASE}/pear.jpg`,
  fraise: `${BASE}/strawberries.jpg`,
  raisin: `${BASE}/red-grapes.jpg`,
  kiwi: `${BASE}/kiwi.jpg`,
  orange: `${BASE}/orange.jpg`,
  citron: `${BASE}/lemon.jpg`,
  ananas: `${BASE}/pineapple.jpg`,
  melon: `${BASE}/cantaloupe.jpg`,
  // Poissons
  saumon: `${BASE}/salmon.jpg`,
  cabillaud: `${BASE}/cod-fillet.jpg`,
  thon: `${BASE}/tuna-steak.jpg`,
  maquereau: `${BASE}/mackerel.jpg`,
  sardines: `${BASE}/sardines.jpg`,
  truite: `${BASE}/trout.jpg`,
  colin: `${BASE}/cod-fillet.jpg`,
  bar: `${BASE}/sea-bass.jpg`,
  dorade: `${BASE}/sea-bass.jpg`,
  'lieu-noir': `${BASE}/cod-fillet.jpg`,
  // Viandes rouges
  'steak-hache': `${BASE}/fresh-ground-beef.jpg`,
  'cote-de-porc': `${BASE}/pork-chops.jpg`,
  'roti-de-porc': `${BASE}/pork-tenderloin.jpg`,
  saucisse: `${BASE}/sausage.jpg`,
  'jambon-cru': `${BASE}/ham-whole.jpg`,
  'boudin-noir': `${BASE}/sausage.jpg`,
  'foie-de-veau': `${BASE}/liver.jpg`,
  entrecote: `${BASE}/ribeye-steak.jpg`,
  'cote-de-buf': `${BASE}/ribeye-steak.jpg`,
  'gigot-dagneau': `${BASE}/lamb-leg.jpg`,
  // Produits laitiers
  lait: `${BASE}/milk.jpg`,
  beurre: `${BASE}/butter-sliced.jpg`,
  'fromage-blanc': `${BASE}/cottage-cheese.jpg`,
  'fromage-rape': `${BASE}/shredded-cheese-background.jpg`,
  'yaourt-nature': `${BASE}/plain-yogurt.jpg`,
  'creme-fraiche': `${BASE}/sour-cream.jpg`,
  'lait-concentre': `${BASE}/evaporated-milk.jpg`,
  'lait-fermente': `${BASE}/buttermilk.jpg`,
  'fromage-de-chevre': `${BASE}/goat-cheese.jpg`,
  'lait-damande': `${BASE}/almond-milk.jpg`,
  // Céréales
  riz: `${BASE}/uncooked-white-rice.jpg`,
  pates: `${BASE}/penne.jpg`,
  semoule: `${BASE}/semolina.jpg`,
  couscous: `${BASE}/couscous-702.jpg`,
  boulgour: `${BASE}/bulgur-702.jpg`,
  millet: `${BASE}/millet.jpg`,
  orge: `${BASE}/pearl-barley.jpg`,
  'flocons-davoine': `${BASE}/rolled-oats.jpg`,
  polenta: `${BASE}/cornmeal.jpg`,
  quinoa: `${BASE}/uncooked-quinoa.jpg`,
  // Pains
  pain: `${BASE}/bread-loaf.jpg`,
  baguette: `${BASE}/baguette.jpg`,
  'pain-complet': `${BASE}/whole-wheat-bread.jpg`,
  'pain-de-mie': `${BASE}/white-bread.jpg`,
  'pain-pita': `${BASE}/pita-bread.jpg`,
  'pain-burger': `${BASE}/hamburger-bun.jpg`,
  'pain-aux-cereales': `${BASE}/whole-wheat-bread.jpg`,
  brioche: `${BASE}/brioche.jpg`,
  croissant: `${BASE}/croissants.jpg`,
  'pain-au-lait': `${BASE}/brioche.jpg`,
  // Épicerie
  sucre: `${BASE}/sugar-in-702.jpg`,
  sel: `${BASE}/salt.jpg`,
  poivre: `${BASE}/pepper.jpg`,
  farine: `${BASE}/flour.jpg`,
  'huile-dolive': `${BASE}/olive-oil.jpg`,
  'huile-de-tournesol': `${BASE}/vegetable-oil.jpg`,
  moutarde: `${BASE}/dijon-mustard.jpg`,
  vinaigre: `${BASE}/red-wine-vinegar.jpg`,
  chocolat: `${BASE}/dark-chocolate-702.jpg`,
  confiture: `${BASE}/strawberry-jam.jpg`,
  // Boissons
  'eau-minerale': `${BASE}/water.jpg`,
  'eau-gazeuse': `${BASE}/water.jpg`,
  'jus-dorange': `${BASE}/orange-juice.jpg`,
  soda: `${BASE}/cola.jpg`,
  limonade: `${BASE}/lemonade.jpg`,
  'the-noir': `${BASE}/tea-bags.jpg`,
  'the-vert': `${BASE}/green-tea-702.jpg`,
  'cafe-moulu': `${BASE}/ground-coffee.jpg`,
  'sirop-de-menthe': `${BASE}/mint-702.jpg`,
  'boisson-energetique': `${BASE}/cola.jpg`,
  // Volailles
  'poulet-entier': `${BASE}/whole-chicken.jpg`,
  'blanc-de-poulet': `${BASE}/chicken-breasts.jpg`,
  'cuisse-de-poulet': `${BASE}/chicken-thighs.jpg`,
  'aile-de-poulet': `${BASE}/chicken-wings.jpg`,
  'pilons-de-poulet': `${BASE}/chicken-drumsticks.jpg`,
  'filet-de-dinde': `${BASE}/turkey-breast.jpg`,
  'escalope-de-dinde': `${BASE}/turkey-breast.jpg`,
  'cuisse-de-dinde': `${BASE}/turkey-leg.jpg`,
  'aiguillettes-de-dinde': `${BASE}/turkey-breast.jpg`,
  'roti-de-dinde': `${BASE}/turkey-breast.jpg`,
  'filet-de-veau': `${BASE}/veal.jpg`,
  'escalope-de-veau': `${BASE}/veal.jpg`,
  'cote-de-veau': `${BASE}/veal.jpg`,
  'roti-de-veau': `${BASE}/veal.jpg`,
  'blanquette-de-veau': `${BASE}/veal.jpg`,
  'saute-de-veau': `${BASE}/veal.jpg`,
  'filet-de-lapin': `${BASE}/rabbit-meat.jpg`,
  'cuisse-de-lapin': `${BASE}/rabbit-meat.jpg`,
  'lapin-entier': `${BASE}/rabbit-meat.jpg`,
  'eminces-de-poulet': `${BASE}/chicken-breasts.jpg`,
  'eminces-de-dinde': `${BASE}/turkey-breast.jpg`,
  'poulet-fermier': `${BASE}/whole-chicken.jpg`,
  'poulet-roti': `${BASE}/whole-chicken.jpg`,
  'poulet-marine': `${BASE}/chicken-breasts.jpg`,
  'dinde-fermiere': `${BASE}/turkey-breast.jpg`,
  'veau-hache': `${BASE}/fresh-ground-beef.jpg`,
  'brochettes-de-poulet': `${BASE}/chicken-breasts.jpg`,
  'brochettes-de-dinde': `${BASE}/turkey-breast.jpg`,
  'saucisse-de-volaille': `${BASE}/sausage.jpg`,
  'boudin-blanc': `${BASE}/sausage.jpg`,
  'nuggets-de-poulet': `${BASE}/chicken-breasts.jpg`,
  'tenders-de-poulet': `${BASE}/chicken-breasts.jpg`,
  'poulet-thai': `${BASE}/chicken-breasts.jpg`,
  'dinde-emincee': `${BASE}/turkey-breast.jpg`,
  'veau-grillade': `${BASE}/veal.jpg`,
  'poulet-sans-peau': `${BASE}/chicken-breasts.jpg`,
  'dinde-sans-peau': `${BASE}/turkey-breast.jpg`,
  'poulet-bio': `${BASE}/whole-chicken.jpg`,
  'dinde-bio': `${BASE}/turkey-breast.jpg`,
};

/**
 * Returns an image URL for a food name by matching against known slugs.
 * Falls back to null if no match found.
 */
export function getFoodImage(name: string): string | null {
  // Try direct slug match
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  if (imageMap[slug]) return imageMap[slug];

  // Try partial match on keys
  for (const [key, url] of Object.entries(imageMap)) {
    if (slug.startsWith(key) || key.startsWith(slug)) return url;
  }

  return null;
}
