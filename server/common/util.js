const DB_LINK = './server/common/database/sqlite/datas.db';

const JUS = [
  { id: 1, name: 'Jus d\'orange', gout: 'acide' },
  { id: 2, name: 'Jus de citron', gout: 'acide' },
  { id: 3, name: 'Jus d\'ananas', gout: 'acide' },
  { id: 4, name: 'Jus de pomme', gout: 'sucre' },
];
const GOUTS = [
  { id: 1, name: 'acide' },
  { id: 2, name: 'amer' },
  { id: 3, name: 'sale' },
  { id: 4, name: 'sucre' },
];
const SMOOTHIES = [
  { id: 1, name: 'Banane Mangue et jus d\'Ananas', jus: 'orange', description: 'Ce smoothie à la fois sucré et acide est parfait pour les amoureux de la mangue et des bananes' },
  { id: 2, name: 'Smoothie Concombre et Kiwi', jus: 'coco', description: 'Servez le smoothie bien frais donc laissez-le au frais le temps de le servir et ajoutez une rondelle de concombre sur le rebord du verre' },
];
const TYPES = [
  { id: 1, name: 'fruit' },
  { id: 2, name: 'legume' },
];
const FRUITS = [
  { id: 1, name: 'Abricot', type: 'fruit', preparation: 'Dénoyautez et coupez l\'abricot en morceaux' },
  { id: 2, name: 'Ananas', type: 'fruit', preparation: 'Epeluchez et coupez l\'ananas en morceaux' },
  { id: 3, name: 'Avocat', type: 'fruit', preparation: 'Epeluchez, dénoyautez et coupez les avocats en morceaux' },
  { id: 4, name: 'Banane', type: 'fruit', preparation: 'Epelez et coupez le banane en morceaux' },
  { id: 5, name: 'Betterave', type: 'legume', preparation: 'Epeluchez et coupez les bétteraves rouges en morceaux' },
  { id: 6, name: 'Carotte', type: 'legume', preparation: 'Epeluchez et coupez la carotte en morceaux' },
  { id: 7, name: 'Citron jaune', type: 'fruit', preparation: 'Epeluchez et coupez le citron en morceaux' },
  { id: 8, name: 'Citron vert', type: 'fruit', preparation: 'Epeluchez et coupez le citron en morceaux' },
  { id: 9, name: 'Concombre', type: 'legume', preparation: 'Epeluchez et coupez le concombre en morceaux' },
  { id: 10, name: 'Coriandre', type: 'legume', preparation: 'Ajoutez 3 à 4 feuilles' },
  { id: 11, name: 'Figue', type: 'fruit', preparation: 'coupez la figue en morceaux' },
  { id: 12, name: 'Fruit de la passion', type: 'fruit', preparation: 'Coupez le fruit en deux puis récupérez sa pulpe à l\'aide d\'une cuillère' },
  { id: 13, name: 'Canneberge', type: 'fruit', preparation: '(optionnel) Coupez les canneberges en deux pour en enlever les pépins' },
  { id: 14, name: 'Cassis', type: 'fruit', preparation: '(optionnel) Coupez les cassis en deux pour en enlever les pépins' },
  { id: 15, name: 'Cerise', type: 'fruit', preparation: '(optionnel) Coupez les cassis en deux pour en enlever les pépins' },
  { id: 16, name: 'Fraise', type: 'fruit', preparation: '(optionnel) Coupez la partie haute de la fraise' },
  { id: 17, name: 'Framboise', type: 'fruit', preparation: '(optionnel) Coupez la partie haute de la framboise' },
  { id: 18, name: 'Groseille', type: 'fruit', preparation: '(optionnel) Coupez les groseilles en deux pour en enlever les pépins' },
  { id: 19, name: 'Mûre', type: 'fruit', preparation: '(optionnel) Mixez les mures et passez les au chinois pour retirer les pépins' },
  { id: 20, name: 'myrtille', type: 'fruit', preparation: '(optionnel) Mixez les myrtilles et passez les au chinois pour retirer les pépins' },
  { id: 21, name: 'Gingembre', type: 'tubercule', preparation: 'Epelez le gingembre et coupez le gingembre en morceau' },
  { id: 22, name: 'Grenade', type: 'fruit', preparation: 'Épluchez, coupez et mixez les grenades en utilisant un tamis (pour enlever les grains de grenade)' },
  { id: 23, name: 'Kaki', type: 'fruit', preparation: 'Pelez et coupez les kakis en morceaux' },
  { id: 24, name: 'Kiwi', type: 'fruit', preparation: 'Pelez et coupez les kiwis en morceaux' },
  { id: 25, name: 'Litchi', type: 'fruit', preparation: 'Pelez et dénoyautez les litchis' },
  { id: 26, name: 'Mangue', type: 'fruit', preparation: 'Pelez et coupez la mangue en morceaux' },
  { id: 27, name: 'Melon', type: 'fruit', preparation: 'Pelez et coupez le melon en morceaux' },
  { id: 28, name: 'Menthe', type: 'fruit', preparation: 'Ajoutez 3 à 4 feuilles de menthes' },
  { id: 29, name: 'Mirabelle', type: 'fruit', preparation: 'Epeluchez et coupez la pomme en morceaux' },
  { id: 30, name: 'Noix de coco', type: 'fruit', preparation: 'Ajoutez 15cl de lait de coco' },
  { id: 31, name: 'Orange', type: 'fruit', preparation: 'Pelez et coupez l\'orange en morceaux' },
  { id: 32, name: 'Orange sanguine', type: 'fruit', preparation: 'Pelez et coupez l\'orange en morceaux' },
  { id: 33, name: 'Pamplemousse', type: 'fruit', preparation: 'Pelez et coupez la pamplemousse en morceaux' },
  { id: 34, name: 'Papaye', type: 'fruit', preparation: 'Pelez, enlever les pépins et coupez la papaye en morceaux' },
  { id: 35, name: 'Pastèque', type: 'fruit', preparation: 'Coupez la pastèque en deux, coupez y des petits morceaux en prenant soin d\'enlever les pépins' },
  { id: 36, name: 'Nectarine', type: 'fruit', preparation: 'Pelez et coupez la nectarine en morceaux' },
  { id: 37, name: 'Pêche blanche', type: 'fruit', preparation: 'Pelez et coupez la pêche en morceaux' },
  { id: 38, name: 'Pêche jaune', type: 'fruit', preparation: 'Pelez et coupez la pêche en morceaux' },
  { id: 39, name: 'Poire', type: 'fruit', preparation: 'Pelez et coupez la poire en morceaux' },
  { id: 40, name: 'Pomme', type: 'fruit', preparation: 'Pelez et coupez la pomme en morceaux' },
  { id: 41, name: 'Raisin', type: 'fruit', preparation: '(optionnel) Coupez les raisins en deux pour en enlever les pépins' },
  { id: 42, name: 'Rhubarbe', type: 'legume', preparation: 'Pelez et coupez la rhubarbe en morceaux' },
  { id: 43, name: 'Rose', type: 'fruit', preparation: 'Ajoutez 3 à 4 feuilles de rose' },
  { id: 44, name: 'Tomate', type: 'fruit', preparation: 'Pelez et coupez la tomate en morceaux' },
];

const SMOOTHIE_FRUIT = [
  { id: 1, id_smoothie: 1, id_fruit: 2 },
  { id: 2, id_smoothie: 1, id_fruit: 26 },
  { id: 3, id_smoothie: 2, id_fruit: 9 },
  { id: 4, id_smoothie: 2, id_fruit: 24 },
  { id: 5, id_smoothie: 2, id_fruit: 40 },
];
const FRUIT_GOUT = [
  { id: 1, id_fruit: 1, gout: 'sucre' },
  { id: 2, id_fruit: 2, gout: 'sucre' },
  { id: 3, id_fruit: 2, gout: 'acide' },
  { id: 4, id_fruit: 3, gout: 'sale' },
  { id: 5, id_fruit: 3, gout: 'amer' },
  { id: 6, id_fruit: 4, gout: 'sucre' },
  { id: 7, id_fruit: 5, gout: 'sale' },
  { id: 8, id_fruit: 6, gout: 'sale' },
  { id: 9, id_fruit: 7, gout: 'sucre' },
  { id: 10, id_fruit: 7, gout: 'acide' },
  { id: 11, id_fruit: 8, gout: 'sucre' },
  { id: 12, id_fruit: 8, gout: 'acide' },
  { id: 13, id_fruit: 9, gout: 'amer' },
  { id: 14, id_fruit: 10, gout: 'sale' },
  { id: 15, id_fruit: 11, gout: 'sucre' },
  { id: 16, id_fruit: 12, gout: 'sucre' },
  { id: 17, id_fruit: 13, gout: 'sucre' },
  { id: 18, id_fruit: 14, gout: 'sucre' },
  { id: 19, id_fruit: 15, gout: 'sucre' },
  { id: 20, id_fruit: 16, gout: 'sucre' },
  { id: 21, id_fruit: 17, gout: 'sucre' },
  { id: 22, id_fruit: 18, gout: 'sucre' },
  { id: 23, id_fruit: 19, gout: 'sucre' },
  { id: 24, id_fruit: 20, gout: 'sucre' },
  { id: 25, id_fruit: 21, gout: 'sucre' },
  { id: 26, id_fruit: 21, gout: 'acide' },
  { id: 27, id_fruit: 22, gout: 'sucre' },
  { id: 28, id_fruit: 22, gout: 'sucre' },
  { id: 29, id_fruit: 23, gout: 'sucre' },
  { id: 30, id_fruit: 24, gout: 'sucre' },
  { id: 31, id_fruit: 24, gout: 'acide' },
  { id: 32, id_fruit: 25, gout: 'sucre' },
  { id: 33, id_fruit: 26, gout: 'sucre' },
  { id: 34, id_fruit: 27, gout: 'sucre' },
  { id: 35, id_fruit: 28, gout: 'sucre' },
  { id: 36, id_fruit: 29, gout: 'sucre' },
  { id: 37, id_fruit: 30, gout: 'sucre' },
  { id: 38, id_fruit: 31, gout: 'sucre' },
  { id: 39, id_fruit: 31, gout: 'acide' },
  { id: 41, id_fruit: 32, gout: 'sucre' },
  { id: 42, id_fruit: 32, gout: 'acide' },
  { id: 43, id_fruit: 33, gout: 'sucre' },
  { id: 44, id_fruit: 33, gout: 'acide' },
  { id: 45, id_fruit: 34, gout: 'sucre' },
  { id: 46, id_fruit: 35, gout: 'sucre' },
  { id: 47, id_fruit: 36, gout: 'sucre' },
  { id: 48, id_fruit: 37, gout: 'sucre' },
  { id: 59, id_fruit: 38, gout: 'sucre' },
  { id: 50, id_fruit: 39, gout: 'sucre' },
  { id: 51, id_fruit: 40, gout: 'sucre' },
  { id: 52, id_fruit: 41, gout: 'sucre' },
  { id: 53, id_fruit: 42, gout: 'sucre' },
  { id: 54, id_fruit: 43, gout: 'sucre' },
  { id: 55, id_fruit: 44, gout: 'sucre' },
  { id: 56, id_fruit: 44, gout: 'acide' },
  { id: 57, id_fruit: 44, gout: 'amer' },
];

export { JUS, GOUTS, FRUITS, SMOOTHIES, TYPES, SMOOTHIE_FRUIT, FRUIT_GOUT, DB_LINK };
