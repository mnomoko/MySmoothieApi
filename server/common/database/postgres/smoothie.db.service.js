import l from '../../logger';
import Smoothie from '../../../api/model/smoothie';
import { Jus } from '../../../api/model/jus';
import FruitDBService from './fruit.db.service';
import SmoothieFruitDBService from './smoothie-fruit.db.service';

class SmoothieDBService {
  async all(pool) {
    const smoothieDBFactory = new SmoothieDBFactory(pool);

    return new Promise(async (resolve, reject) => {
      // const client = await pool.connect();
      await pool.query('SELECT * FROM smoothie', async (err, result) => {
        // await client.release();
        if (err) reject('error retrieving data', err);
        const smoothies = await smoothieDBFactory.getSmoothies(result.rows);
        resolve(smoothies);
      });
    });
  }

  async byId(pool, id) {
    const smoothieDBFactory = new SmoothieDBFactory(pool);

    return new Promise(async (resolve, reject) => {
      // const client = await pool.connect();
      await pool.query('SELECT * FROM smoothie WHERE id = $1', [id], async (err, result) => {
        // await client.release();
        if (err) reject('error retrieving data', err);
        console.log(result);
        const row = result.rows[0];
        const fruit = await smoothieDBFactory.getSmoothie(row);
        resolve(fruit);
      });
    });
  }

  async create(pool, smoothie) {
    const smoothieDBFactory = new SmoothieDBFactory(pool);

    l.info(`${this.constructor.name}.create(${JSON.stringify(smoothie)})`);
    return new Promise(async (resolve, reject) => {
      const fruits = smoothie.fruits;
      await pool.query('INSERT INTO smoothie (name, jus, description) VALUES ($1, $2, $3) RETURNING *', [smoothie.name, smoothie.jus, smoothie.description], async (err, result) => {
        if (err) reject(err);
        else {
          const smoothieObject = result.rows[0];
          smoothieDBFactory.getSmoothies(smoothieObject.id, fruits).then(() => {
            resolve(smoothieObject);
          });
        }
      });
    });
  }
}

class SmoothieDBFactory {
  constructor(pool) {
    this.pool = pool;
  }

  async getFruitForSmoothie(idSmoothie) {
    const smoothieWithFruits = await SmoothieFruitDBService.byIdSmoothie(this.pool, idSmoothie);
    return Promise.resolve(smoothieWithFruits ? smoothieWithFruits.map(r => r.idFruit) : undefined);
  }

  async getSmoothie(row) {
    const idFruitForSelectedSmoothie = await this.getFruitForSmoothie(row.id);
    const fruits = await FruitDBService.byIds(this.pool, idFruitForSelectedSmoothie);
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

  async createSmoothie(id, fruits) {
    await SmoothieFruitDBService.create(this.pool, id, fruits.map(fruit => fruit.id));
  }
}

export default new SmoothieDBService();
