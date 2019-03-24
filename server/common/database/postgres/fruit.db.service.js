import Fruit from '../../../api/model/fruit';
import FruitGoutDbService from './fruit-gout.db.service';

class FruitDBService {
  async all(pool) {
    const fruitDBFactory = new FruitDBFactory(pool);

    return new Promise(async (resolve, reject) => {
      // const client = await pool.connect();
      await pool.query('SELECT * FROM fruit', async (err, result) => {
        // await client.release();
        if (err) reject('error retrieving data', err);
        const fruits = await fruitDBFactory.getFruits(result.rows);
        resolve(fruits);
      });
    });
  }

  async byId(pool, id) {
    const fruitDBFactory = new FruitDBFactory(pool);

    return new Promise(async (resolve, reject) => {
      // const client = await pool.connect();
      await pool.query(`SELECT * FROM fruit WHERE id = ${id}`, [], async (err, result) => {
        // await client.release();
        if (err) reject('error retrieving data', err);
        console.log(JSON.stringify(result));
        const row = result.rows[0];
        const fruit = await fruitDBFactory.getFruit(row);
        resolve(fruit);
      });
    });
  }

  async byIds(pool, ids) {
    const fruitDBFactory = new FruitDBFactory(pool);

    return new Promise(async (resolve, reject) => {
      // const client = await pool.connect();
      await pool.query(`SELECT * FROM fruit WHERE id in (${ids.join(',')})`, [], async (err, result) => {
        // await client.release();
        if (err) reject('error retrieving data', err);
        const fruit = await fruitDBFactory.getFruits(result.rows);
        resolve(fruit);
      });
    });
  }

  async create(pool, fruit) {
    return new Promise(async (resolve, reject) => {
      // const client = await pool.connect();
      await pool.query('INSERT INTO fruit VALUES ($1, $2, $3, $4)', [null, fruit.name, fruit.type, fruit.preparation], async err => {
        // await client.release();
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

class FruitDBFactory {
  constructor(pool) {
    this.pool = pool;
  }

  async getGoutForFruit(idFruit) {
    const fruitWihtGouts = await FruitGoutDbService.byIdFruit(this.pool, idFruit);
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
