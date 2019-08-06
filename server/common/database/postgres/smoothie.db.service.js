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
        const row = result.rows[0];
        const fruit = await smoothieDBFactory.getSmoothie(row);
        resolve(fruit);
      });
    });
  }

  create(pool, smoothie) {
    const smoothieDBFactory = new SmoothieDBFactory(pool);

    return new Promise((resolve, reject) => {
      const fruits = smoothie.fruits;
      const jus = new Jus().getByCode(smoothie.jus);
      pool.query('INSERT INTO smoothie (name, jus, description) VALUES ($1, $2, $3) RETURNING *', [smoothie.name, jus.code, smoothie.description], (err, result) => {
        if (err) reject(err);
        else {
          const smoothieObject = Object.assign({}, smoothie);
          smoothieObject.id = result.rows[0].id;
          smoothieDBFactory.createSmoothie(smoothieObject.id, fruits)
            .then(() => {
              // resolve(JSON.stringify(smoothieObject));
              resolve(smoothieObject);
            })
            .catch(error => reject(error));
        }
      });
    });
  }

  update(pool, id, smoothie) {
    const smoothieDBFactory = new SmoothieDBFactory(pool);

    return new Promise((resolve, reject) => {
      const fruits = smoothie.fruits;
      const jus = new Jus().getByCode(smoothie.jus);
      pool.query('UPDATE smoothie SET name = $1, jus = $2, description = $3 WHERE id = $4', [smoothie.name, jus.code, smoothie.description, smoothie.id], (err, result) => {
        if (err) reject(err);
        else {
          const smoothieObject = Object.assign({}, smoothie);
          smoothieDBFactory.deleteSmoothieFruits(id)
            .then(() => {
              smoothieDBFactory.createSmoothie(id, fruits)
                .then(() => {
                  resolve(smoothieObject);
                });
            });
        }
      });
    });
  }

  delete(pool, id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM smoothie WHERE id = $1', [id], err => {
        if (err) reject(err);
        else resolve(true);
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

  createSmoothie(id, fruits) {
    return new Promise((resolve, reject) => {
      SmoothieFruitDBService.create(this.pool, id, fruits.map(fruit => fruit.id)).then(res => {
        resolve(res);
      }).catch(err => reject(err));
    });
  }

  updateSmoothie(id, fruits) {
    return new Promise((resolve, reject) => {
      SmoothieFruitDBService.update(this.pool, id, fruits.map(fruit => fruit.id)).then(res => {
        resolve(res);
      }).catch(err => reject(err));
    });
  }

  deleteSmoothieFruits(id) {
    return new Promise((resolve, reject) => {
      SmoothieFruitDBService.delete(this.pool, id).then(res => {
        resolve(res);
      }).catch(err => reject(err));
    });
  }
}

export default new SmoothieDBService();
