import l from '../../common/logger';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./server/common/database/datas.db');

class SmoothiesService {
  all() {

  }

  byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return db.byId(id);
  }

  create(smoothie) {
    return db.insert();
  }
}
