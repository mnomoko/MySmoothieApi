import FruitDBService from '../../common/database/sqlite/fruit.db.service';

class FruitsService {
  async all() {
    return new Promise((resolve, reject) => {
      FruitDBService.all().then(res => resolve(res)).catch(err => reject(err));
    });
  }

  async byId(id) {
    return new Promise((resolve, reject) => {
      FruitDBService.byId(id).then(res => resolve(res)).catch(err => reject(err));
    });
  }

  async create(fruit) {
    return new Promise((resolve, reject) => FruitDBService.create(fruit).then(res => resolve(res)).catch(err => reject(err)));
  }
}

export default new FruitsService();
