export type MenuItem = { name: string; nameKey?: string; price?: string };
export type MenuCategory = { title: string; titleKey?: string; items: MenuItem[]; image?: string };

export const HOT_STARTERS: MenuCategory = {
  title: 'Hot Starters',
  titleKey: 'menu.section.hotStarters.title',
  image: '/menu-hot.svg',
  items: [
    { name: 'Fish soup', nameKey: 'menu.item.hotStarters.fishSoup', price: '45dh' },
    { name: 'Zucchini soup', nameKey: 'menu.item.hotStarters.zucchiniSoup', price: '30dh' },
    { name: 'Vegetable soup', nameKey: 'menu.item.hotStarters.vegetableSoup', price: '25dh' },
    { name: 'Octopus with potatoes', nameKey: 'menu.item.hotStarters.octopusPotatoes', price: '35dh' },
    { name: 'Shrimp', nameKey: 'menu.item.hotStarters.shrimp', price: '45dh' },
    { name: 'Shrimp in tomato/white sauce', nameKey: 'menu.item.hotStarters.shrimpTomatoOrWhite', price: '45dh' },
  ],
};

export const COLD_STARTERS: MenuCategory = {
  title: 'Cold Starters',
  titleKey: 'menu.section.coldStarters.title',
  image: '/menu-cold.svg',
  items: [
    { name: 'Octopus salad', nameKey: 'menu.item.coldStarters.octopusSalad', price: '40dh' },
    { name: 'Avocado & shrimp salad', nameKey: 'menu.item.coldStarters.avocadoShrimpSalad', price: '40dh' },
    { name: 'Avocado salad', nameKey: 'menu.item.coldStarters.avocadoSalad', price: '30dh' },
    { name: 'Tuna salad', nameKey: 'menu.item.coldStarters.tunaSalad', price: '30dh' },
    { name: 'Moroccan salad', nameKey: 'menu.item.coldStarters.moroccanSalad', price: '20dh' },
    { name: 'Mixed salad', nameKey: 'menu.item.coldStarters.mixedSalad', price: '20dh' },
  ],
};

export const TAJINES: MenuCategory = {
  title: 'Tagines',
  titleKey: 'menu.section.tagines.title',
  image: '/menu-tagine.svg',
  items: [
    { name: 'Kefta tagine', nameKey: 'menu.item.tagines.keftaTagine', price: '80dh' },
    { name: 'Octopus tagine', nameKey: 'menu.item.tagines.octopusTagine', price: '95dh' },
    { name: 'Calamari tagine', nameKey: 'menu.item.tagines.squidTagine', price: '140dh' },
    { name: 'Royal tagine', nameKey: 'menu.item.tagines.royalTagine', price: '110dh' },
    { name: 'Chicken tagine', nameKey: 'menu.item.tagines.chickenTagine', price: '95dh' },
    { name: 'Fish tagine', nameKey: 'menu.item.tagines.fishTagine', price: '80dh' },
    { name: 'Vegetable tagine', nameKey: 'menu.item.tagines.vegetableTagine', price: '90dh' },
    { name: 'Cuttlefish tagine', nameKey: 'menu.item.tagines.cuttlefishTagine', price: '85dh' },
    { name: 'Beef tagine', nameKey: 'menu.item.tagines.beefTagine', price: '110dh' },
    { name: 'Mixed octopus tagine', nameKey: 'menu.item.tagines.mixedOctopusTagine', price: '100dh' },
  ],
};

export const BROCHETTES: MenuCategory = {
  title: 'Skewers',
  titleKey: 'menu.section.skewers.title',
  items: [
    { name: 'Octopus skewers', nameKey: 'menu.item.skewers.octopusSkewers', price: '90dh' },
    { name: 'Beef skewers', nameKey: 'menu.item.skewers.beefSkewers', price: '70dh' },
    { name: 'Turkey skewers', nameKey: 'menu.item.skewers.turkeySkewers', price: '90dh' },
    { name: 'Kefta skewers', nameKey: 'menu.item.skewers.keftaSkewers', price: '70dh' },
    { name: 'Fish skewers', nameKey: 'menu.item.skewers.fishSkewers', price: '90dh' },
  ],
};

export const MAINS: MenuCategory = {
  title: 'Main Dishes',
  titleKey: 'menu.section.mains.title',
  items: [
    { name: 'Beef', nameKey: 'menu.item.mains.beef', price: '120dh' },
    { name: 'Calamari', nameKey: 'menu.item.mains.calamari', price: '125dh' },
    { name: 'Octopus', nameKey: 'menu.item.mains.octopus', price: '110dh' },
    { name: 'Royal', nameKey: 'menu.item.mains.royalMixed', price: '140dh' },
    { name: 'Paella', nameKey: 'menu.item.mains.riceSeafood', price: '90dh' },
    { name: 'Fish', nameKey: 'menu.item.mains.fish', price: '110dh' },
    { name: 'Chicken', nameKey: 'menu.item.mains.chicken', price: '120dh' },
    { name: 'Cuttlefish', nameKey: 'menu.item.mains.cuttlefish', price: '90dh' },
    { name: 'Mixed', nameKey: 'menu.item.mains.mixed', price: '150dh' },
  ],
};

export const PASTA: MenuCategory = {
  title: 'Pasta',
  titleKey: 'menu.section.pasta.title',
  items: [
    { name: 'Royal pasta', nameKey: 'menu.item.pasta.pastaRoyalMixed', price: '80dh' },
    { name: 'Shrimp pasta', nameKey: 'menu.item.pasta.pastaShrimp', price: '85dh' },
    { name: 'Octopus pasta', nameKey: 'menu.item.pasta.pastaOctopus', price: '95dh' },
    { name: 'Cuttlefish pasta', nameKey: 'menu.item.pasta.pastaCuttlefish', price: '85dh' },
    { name: 'Seafood pasta', nameKey: 'menu.item.pasta.pastaSeafood', price: '100dh' },
    { name: 'Vegetable pasta', nameKey: 'menu.item.pasta.pastaVegetables', price: '85dh' },
    { name: 'Calamari pasta', nameKey: 'menu.item.pasta.pastaCalamari', price: '100dh' },
    { name: 'Lasagna bolognese', nameKey: 'menu.item.pasta.lasagnaBolognese', price: '75dh' },
    { name: 'Spaghetti Napolitana', nameKey: 'menu.item.pasta.spaghettiNapolitana', price: '—' },
  ],
};

export const DESSERTS: MenuCategory = {
  title: 'Desserts',
  titleKey: 'menu.section.desserts.title',
  items: [
    { name: 'Panna cotta', nameKey: 'menu.item.desserts.pannaCotta', price: '20dh' },
    { name: 'Frozen nougat', nameKey: 'menu.item.desserts.nougatIceCream', price: '20dh' },
    { name: 'Chocolate mousse', nameKey: 'menu.item.desserts.chocolateMousse', price: '20dh' },
    { name: 'Crème caramel', nameKey: 'menu.item.desserts.cremeCaramel', price: '20dh' },
    { name: 'Tiramisu', nameKey: 'menu.item.desserts.tiramisu', price: '25dh' },
    { name: 'Crêpe', nameKey: 'menu.item.desserts.crepe', price: '25dh' },
  ],
};

export const DRINKS: MenuCategory = {
  title: 'Drinks & Fresh Juices',
  titleKey: 'menu.section.drinks.title',
  items: [
    { name: 'Orange juice', nameKey: 'menu.item.drinks.orangeJuice', price: '20dh' },
    { name: 'Avocado juice', nameKey: 'menu.item.drinks.avocadoJuice', price: '25dh' },
    { name: 'Fruit blend', nameKey: 'menu.item.drinks.fruitBlend', price: '30dh' },
    { name: 'Banana juice', nameKey: 'menu.item.drinks.bananaJuice', price: '20dh' },
    { name: 'Apple juice', nameKey: 'menu.item.drinks.appleJuice', price: '20dh' },
    { name: 'Dried fruits juice', nameKey: 'menu.item.drinks.driedFruitJuice', price: '20dh' },
  ],
};

export const SPECIALS = {
  title: 'Special Dishes on Request',
  note: 'Couscous • Baked fish • Baked chicken • Moroccan rfissa',
};

export const MENU_SECTIONS: MenuCategory[] = [
  HOT_STARTERS,
  COLD_STARTERS,
  TAJINES,
  BROCHETTES,
  MAINS,
  PASTA,
  DESSERTS,
  DRINKS,
];