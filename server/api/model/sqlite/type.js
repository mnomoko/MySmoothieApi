
const TYPES = {
  FRUIT: 'fruit',
  LEGUME: 'legume',
};

class Type {
  getByCode(code) {
    switch (code) {
      case 'legume': return TYPES.LEGUME;
      case 'fruit':
      default:
        return TYPES.FRUIT;
    }
  }
}

export { Type, TYPES };
