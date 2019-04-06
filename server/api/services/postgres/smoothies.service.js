import SmoothieDBService from '../../../common/database/postgres/smoothie.db.service';
import pool from './queries';
import l from '../../../common/logger';

class SmoothiesService {
  async all() {
    return new Promise((resolve, reject) => {
      SmoothieDBService.all(pool).then(res => resolve(res)).catch(err => reject(err));
    });
  }

  async byId(id) {
    return new Promise((resolve, reject) => {
      SmoothieDBService.byId(pool, id).then(res => resolve(res)).catch(err => reject(err));
    });
  }

  create(smoothie) {
    //const smoothie = { name: 'sm', fruits: [{ id: 1, name: 'Abricot', type: 'fruit', gouts: ['sucre'], preparation: "Dénoyautez et coupez l'abricot en morceaux" }, { id: 1, name: 'Abricot', type: 'fruit', gouts: ['sucre'], preparation: "Dénoyautez et coupez l'abricot en morceaux" }], jus: { code: 'orange', name: "Jus d'orange", gout: 'acide' }, description: 'smmm' };
    return new Promise((resolve, reject) => {
      SmoothieDBService.create(pool, smoothie).then(res => {
        resolve(res);
      }).catch(err => reject(err));
    });
  }
}

export default new SmoothiesService();
