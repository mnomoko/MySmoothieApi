import Fruit from '../../../api/model/sqlite/fruit';
import { DB_LINK } from '../../util';
import FruitGoutDbService from './fruit-gout.db.service';

const sqlite3 = require('sqlite3').verbose();

class FruitDBService {
  async all() {
    const db = new sqlite3.Database(DB_LINK);

    const fruitDBFactory = new FruitDBFactory();

    return new Promise(async (resolve, reject) => {
      await db.all('SELECT * FROM fruit', async (err, rows) => {
        if (err) reject('error retrieving data', err);
        const fruits = await fruitDBFactory.getFruits(rows);
        db.close();
        resolve(fruits);
      });
    });
  }

  async byId(id) {
    const db = new sqlite3.Database(DB_LINK);

    const fruitDBFactory = new FruitDBFactory();

    return new Promise(async (resolve, reject) => {
      await db.get('SELECT * FROM fruit WHERE id = ?', [id], async (err, row) => {
        if (err) reject('error retrieving data', err);
        const fruit = await fruitDBFactory.getFruit(row);
        db.close();
        resolve(fruit);
      });
    });
  }

  async create(fruit) {
    const db = new sqlite3.Database(DB_LINK);

    return new Promise(async (resolve, reject) => {
      await db.run('INSERT INTO fruit VALUES (?, ?, ?, ?)', [null, fruit.name, fruit.type, fruit.preparation], err => {
        if (err) reject(err);
        else resolve(true);
        db.close();
      });
    });
  }
}

class FruitDBFactory {
  async getGoutForFruit(idFruit) {
    const fruitWihtGouts = await FruitGoutDbService.byIdFruit(idFruit);
    return Promise.resolve(fruitWihtGouts ? fruitWihtGouts.map(r => r.gout) : undefined);
  }

  async getFruit(row) {
    const gouts = await this.getGoutForFruit(row.id);
    const fruit = new Fruit(row.id, row.name, row.type, gouts, row.preparation);
    return Promise.resolve(fruit);
  }

  async getFruits(rows) {
    const tab = [];

    const retrieveData = async array => {
      await Promise.all(array.map(async row => {
        const fruit = await this.getFruit(row);
        tab.push(fruit);
      }));
      return Promise.resolve(tab);
    };

    const datas = await retrieveData(rows);
    return Promise.resolve(datas);
  }
}

export default new FruitDBService();
