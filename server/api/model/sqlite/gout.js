
const GOUTS = {
  ACIDE: 'acide',
  AMER: 'amer',
  SALE: 'sale',
  SUCRE: 'sucre',
};

class Gout {
  getByCode(code) {
    switch (code) {
      case 'acide': return GOUTS.ACIDE;
      case 'amer': return GOUTS.AMER;
      case 'sale': return GOUTS.SALE;
      case 'sucre':
      default:
        return GOUTS.SUCRE;
    }
  }
}

export { Gout, GOUTS };
