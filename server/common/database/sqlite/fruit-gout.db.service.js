import l from '../../logger';
import { DB_LINK } from '../../util';
import FruitGout from '../../../api/model/sqlite/fruit-gout';

const sqlite3 = require('sqlite3').verbose();

class FruitGoutDbService {
  all() {
    l.info(`${this.constructor.name}.all()`);
    const tab = [];

    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(DB_LINK);
      db.all('SELECT * FROM fruit_gout', (err, rows) => {
        if (err) return reject(err);
        rows.forEach(row => {
          tab.push(new FruitGout(row.id, row.id_fruit, row.gout));
        });
        db.close();
        return resolve(tab);
      });
    });
  }

  byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);

    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(DB_LINK);
      db.each(`SELECT * FROM fruit_gout where id = ${id}`, (err, row) => {
        if (err) return reject(err);
        db.close();
        return resolve(new FruitGout(row.id, row.id_fruit, row.gout));
      });
    });
  }

  async byIdFruit(id) {
    // l.info(`${this.constructor.name}.byIdFruit(${id})`);
    const tab = [];

    return new Promise(async (resolve, reject) => {
      const db = new sqlite3.Database(DB_LINK);
      await db.all(`SELECT * FROM fruit_gout WHERE id_fruit = ${id}`, (err, rows) => {
        if (err) return reject(err);
        rows.forEach(row => {
          tab.push(new FruitGout(row.id, row.id_fruit, row.gout));
        });
        db.close();
        return resolve(tab);
      });
    });
  }

  create(fruitGout) {
    l.info(`${this.constructor.name}.create(${JSON.stringify(fruitGout)})`);

    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(DB_LINK);
      db.run('INSERT INTO fruit_gout VALUES (?, ?, ?)', [null, fruitGout.id_fruit, fruitGout.gout], err => {
        if (err) reject(err);
        else resolve(true);
        db.close();
      });
    });
  }
}

export default new FruitGoutDbService();
