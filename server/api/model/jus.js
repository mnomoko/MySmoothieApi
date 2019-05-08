import { GOUTS } from './gout';

const JUS = {
  ORANGE: { id: 1, name: 'Jus d\'orange', gout: GOUTS.ACIDE },
  CITRON: { id: 2, name: 'Jus de citron', gout: GOUTS.ACIDE },
  ANANAS: { id: 3, name: 'Jus d\'ananas', gout: GOUTS.ACIDE },
  POMME: { id: 4, name: 'Jus de pomme', gout: GOUTS.SUCRE },
  LAIT_COCO: { id: 5, name: 'Lait de coco', gout: GOUTS.SUCRE },
};

class Jus {
  getByCode(code) {
    switch (code) {
      case 'orange': return JUS.ORANGE;
      case 'citron': return JUS.CITRON;
      case 'ananas': return JUS.ANANAS;
      case 'coco': return JUS.LAIT_COCO;
      case 'pomme':
      default:
        return JUS.POMME;
    }
  }
}

export { Jus, JUS };
