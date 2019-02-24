import { DB_LINK } from '../../util';
import SmoothieFruit from '../../../api/model/sqlite/smoothie-fruit';

const sqlite3 = require('sqlite3').verbose();

class SmoothieFruitDBService {
  all() {
    const tab = [];

    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(DB_LINK);
      db.all('SELECT * FROM smoothie_fruit', (err, rows) => {
        if (err) return reject(err);
        rows.forEach(row => {
          tab.push(new SmoothieFruit(row.id, row.id_smoothie, row.id_fruit));
        });
        db.close();
        return resolve(tab);
      });
    });
  }

  byId(id) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(DB_LINK);
      db.each(`SELECT * FROM smoothie_fruit where id = ${id}`, (err, row) => {
        if (err) return reject(err);
        db.close();
        return resolve(new SmoothieFruit(row.id, row.id_smoothie, row.id_fruit));
      });
    });
  }

  async byIdSmoothie(id) {
    const tab = [];

    return new Promise(async (resolve, reject) => {
      const db = new sqlite3.Database(DB_LINK);
      await db.all(`SELECT * FROM smoothie_fruit WHERE id_smoothie = ${id}`, (err, rows) => {
        if (err) return reject(err);
        rows.forEach(row => {
          tab.push(new SmoothieFruit(row.id, row.id_smoothie, row.id_fruit));
        });
        db.close();
        return resolve(tab);
      });
    });
  }

  create(fruitGout) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(DB_LINK);
      db.run('INSERT INTO smoothie_fruit VALUES (?, ?, ?)', [null, fruitGout.id_fruit, fruitGout.gout], err => {
        if (err) reject(err);
        else resolve(true);
        db.close();
      });
    });
  }
}

export default new SmoothieFruitDBService();
