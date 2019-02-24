import l from '../../logger';
import Smoothie from '../../../api/model/sqlite/smoothie';
import { DB_LINK } from '../../util';
import { Jus } from '../../../api/model/sqlite/jus';
import FruitGoutDbService from './fruit-gout.db.service';
import Fruit from '../../../api/model/sqlite/fruit';

const sqlite3 = require('sqlite3').verbose();

class SmoothieDBService {
  all() {
    const tab = [];

    console.log(DB_LINK);
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(DB_LINK);
      db.all('SELECT * FROM smoothie', (err, rows) => {
        if (err) return reject('error retrieving data', err);
        rows.forEach(row => {
          const jus = Jus.getByCode(row.jus);
          const smooth = new Smoothie(row.id, row.name, jus, row.description);
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
      const db = new sqlite3.Database(DB_LINK);
      db.get('SELECT * FROM smoothie WHERE id = ?', [id], (err, row) => {
        if (err) return reject('error retrieving data', err);
        if (row) {
          const jus = Jus.getByCode(row.jus);
          smooth = new Smoothie(row.id, row.name, jus, row.description);
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
      const db = new sqlite3.Database(DB_LINK);
      db.run('INSERT INTO smoothie VALUES (?, ?, ?, ?)', [null, smoothie.name, smoothie.jus, smoothie.description], err => {
        if (err) reject(err);
        else resolve(true);
        db.close();
      });
    });
  }
}

class SmoothieDBFactory {
  async getFruitForSmoothie(idSmoothie) {
    const smoothieWithFruits = await SmoothieFruitDBService.byIdFruit(idSmoothie);
    return Promise.resolve(smoothieWithFruits ? smoothieWithFruits.map(r => r.id_fruit) : undefined);
  }

  async getSmoothie(row) {
    const gouts = await this.getFruitForSmoothie(row.id);
    const smoothie = new Fruit(row.id, row.name, row.type, gouts, row.preparation);
    return Promise.resolve(smoothie);
  }

  async getSmoothies(rows) {
    const tab = [];

    const retrieveData = async array => {
      await Promise.all(array.map(async row => {
        const smoothie = await this.getSmoothie(row);
        tab.push(smoothie);
      }));
      return Promise.resolve(tab);
    };

    const datas = await retrieveData(rows);
    return Promise.resolve(datas);
  }
}

export default new SmoothieDBService();
