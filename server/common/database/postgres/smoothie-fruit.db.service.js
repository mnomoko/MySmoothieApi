import SmoothieFruit from '../../../api/model/smoothie-fruit';

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

  create(pool, fruitGout) {
    return new Promise(async (resolve, reject) => {
      // const client = await pool.connect();
      await pool.query('INSERT INTO smoothie_fruit VALUES ($1, $2, $3)', [null, fruitGout.id_fruit, fruitGout.gout], async err => {
        // // await client.release();
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

export default new SmoothieFruitDBService();
