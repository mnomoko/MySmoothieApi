import SmoothieFruit from '../../../api/model/smoothie-fruit';
import l from '../../logger';

class SmoothieFruitDBService {
  all(pool) {
    const tab = [];

    return new Promise(async (resolve, reject) => {
      // const client = await pool.connect();
      await pool.query('SELECT * FROM smoothie_fruit', async (err, result) => {
        // await client.release();
        if (err) return reject(err);
        result.rows.forEach(row => {
          tab.push(new SmoothieFruit(row.id, row.id_smoothie, row.id_fruit));
        });
        return resolve(tab);
      });
    });
  }

  byId(pool, id) {
    return new Promise(async (resolve, reject) => {
      // const client = await pool.connect();
      await pool.query(`SELECT * FROM smoothie_fruit where id = ${id}`, async (err, result) => {
        // await client.release();
        if (err) return reject(err);
        const row = result.rows[0];
        return resolve(new SmoothieFruit(row.id, row.id_smoothie, row.id_fruit));
      });
    });
  }

  async byIdSmoothie(pool, id) {
    const tab = [];

    return new Promise(async (resolve, reject) => {
      // const client = await pool.connect();
      await pool.query(`SELECT * FROM smoothie_fruit WHERE id_smoothie = ${id}`, async (err, result) => {
        // // await client.release();
        if (err) return reject(err);
        result.rows.forEach(row => {
          tab.push(new SmoothieFruit(row.id, row.id_smoothie, row.id_fruit));
        });
        return resolve(tab);
      });
    }).catch(err => console.log(err));
  }

  create(pool, idSmoothie, idsFruit) {
    return new Promise((resolve, reject) => {
      const idsSmoothie = idsFruit.map(() => idSmoothie);
      pool.query('INSERT INTO smoothie_fruit (id_smoothie, id_fruit) SELECT id_smoothie, id_fruit FROM UNNEST ($1::int[], $2::int[]) AS t (id_smoothie, id_fruit)',
        [idsSmoothie, idsFruit], err => {
          if (err) reject(err);
          else resolve(true);
        });
    });
  }

  delete(pool, idSmoothie) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM smoothie_fruit WHERE id_smoothie = $1',
        [idSmoothie], err => {
          if (err) reject(err);
          else resolve(true);
        });
    });
  }
}

export default new SmoothieFruitDBService();
