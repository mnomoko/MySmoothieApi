import SmoothieDBService from '../../common/database/smoothie.db.service';

class SmoothiesService {
  async all() {
    return new Promise((resolve, reject) => {
      SmoothieDBService.all().then(res => resolve(res)).catch(err => reject(err));
    });
  }

  async byId(id) {
    return new Promise((resolve, reject) => {
      SmoothieDBService.byId(id).then(res => resolve(res)).catch(err => reject(err));
    });
  }

  async create(smoothie) {
    return new Promise((resolve, reject) => SmoothieDBService.create(smoothie).then(res => resolve(res)).catch(err => reject(err)));
  }
}

export default new SmoothiesService();
