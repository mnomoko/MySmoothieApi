import { GOUTS } from './gout';

const JUS = {
  ORANGE: { code: 'orange', name: "Jus d'orange", gout: GOUTS.ACIDE },
  CITRON: { code: 'citron', name: 'Jus de citron', gout: GOUTS.ACIDE },
  ANANAS: { code: 'ananas', name: "Jus d'ananas", gout: GOUTS.ACIDE },
  POMME: { code: 'pomme', name: 'Jus de pomme', gout: GOUTS.SUCRE },
};

class Jus {
  getByCode(code) {
    switch (code) {
      case 'orange': return JUS.ORANGE;
      case 'citron': return JUS.CITRON;
      case 'ananas': return JUS.ANANAS;
      case 'pomme':
      default:
        return JUS.POMME;
    }
  }
}

export { Jus, JUS };
