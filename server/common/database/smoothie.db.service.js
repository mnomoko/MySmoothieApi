import l from '../../common/logger';
import Smoothie from '../../api/model/smoothie';

const sqlite3 = require('sqlite3').verbose();

class SmoothieDBService {
  all() {
    const tab = [];

    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database('./server/common/database/datas.db');
      db.all('SELECT * FROM smoothie', (err, rows) => {
        if (err) return reject('error retrieving data', err);
        rows.forEach(row => {
          const smooth = new Smoothie(row.id, row.name, row.jus, row.description);
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
      db.get('SELECT * FROM smoothie WHERE id = ?', [id], (err, row) => {
        if (err) return reject('error retrieving data', err);
        if (row) {
          smooth = new Smoothie(row.id, row.name, row.jus, row.description);
          console.log(JSON.stringify(smooth));
        }
        db.close();
        return resolve(smooth);
      });
    });
  }

  create(smoothie) {
    l.info(`${this.constructor.name}.create(${JSON.stringify(smoothie)})`);
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database('./server/common/database/datas.db');
      const stmt = db.prepare('INSERT INTO smoothie VALUES (?, ?)');
      stmt.run(null, smoothie.name, smoothie.jus, smoothie.description);
      stmt.finalize();
      db.close();
    });
  }
}

export default new SmoothieDBService();
