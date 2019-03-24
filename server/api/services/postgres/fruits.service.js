import FruitDBService from '../../../common/database/postgres/fruit.db.service';
import pool from './queries';

class FruitsService {
  async all() {
    return new Promise((resolve, reject) => {
      // FruitDBService.all(pool).then(res => resolve(res)).catch(err => reject(err)).finally(() => pool.release());
      FruitDBService.all(pool).then(res => resolve(res)).catch(err => reject(err));
    });
  }

  async byId(id) {
    return new Promise((resolve, reject) => {
      try {
        // FruitDBService.byId(pool, id).then(res => resolve(res)).catch(err => reject(err)).finally(() => pool.release());
        FruitDBService.byId(pool, id).then(res => resolve(res)).catch(err => reject(err));
      } catch (e) {
        console.log(e);
      }
    });
  }

  async create(fruit) {
    return new Promise((resolve, reject) => FruitDBService.create(pool, fruit).then(res => resolve(res)).catch(err => reject(err)).finally(() => pool.release()));
  }
}

export default new FruitsService();
