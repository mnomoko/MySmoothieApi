import l from '../../logger';
import Smoothie from '../../../api/model/sqlite/smoothie';
import { DB_LINK } from '../../util';
import { Jus } from '../../../api/model/sqlite/jus';
import FruitDBService from './fruit.db.service';
import SmoothieFruitDBService from './smoothie-fruit.db.service';

const sqlite3 = require('sqlite3').verbose();

class SmoothieDBService {
  async all() {
    const db = new sqlite3.Database(DB_LINK);

    const smoothieDBFactory = new SmoothieDBFactory();

    return new Promise(async (resolve, reject) => {
      await db.all('SELECT * FROM smoothie', async (err, rows) => {
        if (err) reject('error retrieving data', err);
        const smoothies = await smoothieDBFactory.getSmoothies(rows);
        db.close();
        resolve(smoothies);
      });
    });
  }

  async byId(id) {
    const db = new sqlite3.Database(DB_LINK);

    const smoothieDBFactory = new SmoothieDBFactory();

    return new Promise(async (resolve, reject) => {
      await db.get('SELECT * FROM smoothie WHERE id = ?', [id], async (err, row) => {
        if (err) reject('error retrieving data', err);
        const fruit = await smoothieDBFactory.getSmoothie(row);
        db.close();
        resolve(fruit);
      });
    });
  }

  async create(smoothie) {
    l.info(`${this.constructor.name}.create(${JSON.stringify(smoothie)})`);
    return new Promise(async (resolve, reject) => {
      const db = new sqlite3.Database(DB_LINK);
      await db.run('INSERT INTO smoothie VALUES (?, ?, ?, ?)', [null, smoothie.name, smoothie.jus, smoothie.description], err => {
        if (err) reject(err);
        else resolve(true);
        db.close();
      });
    });
  }
}

class SmoothieDBFactory {
  async getFruitForSmoothie(idSmoothie) {
    const smoothieWithFruits = await SmoothieFruitDBService.byIdSmoothie(idSmoothie);
    return Promise.resolve(smoothieWithFruits ? smoothieWithFruits.map(r => r.idFruit) : undefined);
  }

  async getSmoothie(row) {
    const idFruitForSelectedSmoothie = await this.getFruitForSmoothie(row.id);
    const fruits = await FruitDBService.byIds(idFruitForSelectedSmoothie);
    const jus = new Jus().getByCode(row.jus);
    const smoothie = new Smoothie(row.id, row.name, fruits, jus, row.description);
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
