import l from '../../common/logger';
import Fruit from '../../api/model/fruit';

const sqlite3 = require('sqlite3').verbose();

class FruitDBService {
  all() {
    const tab = [];

    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database('./server/common/database/datas.db');
      db.all('SELECT * FROM fruit', (err, rows) => {
        if (err) return reject('error retrieving data', err);
        rows.forEach(row => {
          const smooth = new Fruit(row.id, row.name, row.type, row.preparation);
          tab.push(smooth);
        });
        db.close();
        return resolve(tab);
      });
    });
  }

  byId(id) {
    let smooth = null;
    l.info(`${this.constructor.name}.byId(${id})`);
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database('./server/common/database/datas.db');
      db.get('SELECT * FROM fruit WHERE id = ?', [id], (err, row) => {
        if (err) return reject('error retrieving data', err);
        if (row) {
          smooth = new Fruit(row.id, row.name, row.type, row.preparation);
          console.log(JSON.stringify(smooth));
        }
        db.close();
        return resolve(smooth);
      });
    });
  }

  create(fruit) {
    l.info(`${this.constructor.name}.create(${JSON.stringify(fruit)})`);
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database('./server/common/database/datas.db');
      const stmt = db.prepare('INSERT INTO fruit VALUES (?, ?)');
      stmt.run(null, fruit.name, fruit.type, fruit.preparation);
      stmt.finalize();
      db.close();
    });
  }
}

export default new FruitDBService();
