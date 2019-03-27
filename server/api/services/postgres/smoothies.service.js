import SmoothieDBService from '../../../common/database/postgres/smoothie.db.service';
import pool from './queries';
import l from '../../../common/logger';

class SmoothiesService {
  async all() {
    return new Promise((resolve, reject) => {
      SmoothieDBService.all(pool).then(res => resolve(res)).catch(err => reject(err)).finally(() => pool.release());
    });
  }

  async byId(id) {
    return new Promise((resolve, reject) => {
      SmoothieDBService.byId(pool, id).then(res => resolve(res)).catch(err => reject(err)).finally(() => pool.release());
    });
  }

  async create(smoothie) {
    l.info(`smoothie.service: create(${JSON.stringify(smoothie)})`);
    return new Promise((resolve, reject) => SmoothieDBService.create(pool, smoothie).then(res => resolve(res)).catch(err => reject(err)).finally(() => pool.release()));
  }
}

export default new SmoothiesService();
