import l from '../../logger';
import FruitGout from '../../../api/model/fruit-gout';

class FruitGoutDbService {
  all(pool) {
    const tab = [];

    return new Promise(async (resolve, reject) => {
      // const client = await pool.connect();
      await pool.query('SELECT * FROM fruit_gout', async (err, result) => {
        // // await client.release();
        if (err) return reject(err);
        result.rows.forEach(row => {
          tab.push(new FruitGout(row.id, row.id_fruit, row.gout));
        });
        return resolve(tab);
      });
    });
  }

  byId(pool, id) {
    return new Promise(async (resolve, reject) => {
      // const client = await pool.connect();
      await pool.query(`SELECT * FROM fruit_gout where id = ${id}`, async (err, result) => {
        // // await client.release();
        if (err) return reject(err);
        const row = result.rows[0];
        return resolve(new FruitGout(row.id, row.id_fruit, row.gout));
      });
    });
  }

  byIdFruit(pool, id) {
    // l.info(`${this.constructor.name}.byIdFruit(${id})`);
    const tab = [];

    return new Promise((resolve, reject) => {
      // const client = await pool.connect();
      pool.query(`SELECT * FROM fruit_gout WHERE id_fruit = ${id}`, (err, result) => {
        // // await client.release();
        if (err) return reject(err);
        result.rows.forEach(row => {
          tab.push(new FruitGout(row.id, row.id_fruit, row.gout));
        });
        return resolve(tab);
      });
    });
  }

  create(pool, fruitGout) {
    return new Promise((resolve, reject) => {
      // const client = await pool.connect();
      pool.query('INSERT INTO fruit_gout (id_fruit, gout) VALUES ($1, $2)', [fruitGout.id_fruit, fruitGout.gout], async (err, res) => {
        // // await client.release();
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

export default new FruitGoutDbService();
