import l from '../logger';
import Gout from '../../api/model/gout';

const sqlite3 = require('sqlite3').verbose();

class GoutDBService {
  all() {
    l.info(`${this.constructor.name}.all()`);
    const tab = [];

    const db = new sqlite3.Database('./server/common/database/datas.db');
    db.all('SELECT * FROM gout', (err, rows) => {
      if (err) return console.log(err);
      rows.forEach(row => {
        tab.push(new Gout(row.id, row.name));
      });
      db.close();
      return tab;
    });
  }

  byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    const db = new sqlite3.Database('./server/common/database/datas.db');
    db.each(`SELECT * FROM gout where id = ${id}`, (err, row) => {
      if (err) return console.log(err);
      db.close();
      return new Gout(row.id, row.name);
    });
  }

  create(gout) {
    l.info(`${this.constructor.name}.create(${JSON.stringify(gout)})`);
    const db = new sqlite3.Database('./server/common/database/datas.db');
    const stmt = db.prepare('INSERT INTO gout VALUES (?, ?)');
    stmt.run(null, gout.name);
    stmt.finalize();
    db.close();
  }
}

export default GoutDBService;
