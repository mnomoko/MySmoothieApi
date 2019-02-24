import { DB_LINK } from './../../util';

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(DB_LINK);

db.serialize(() => {
  db.run('CREATE TABLE lorem (info TEXT)');
  const stmt = db.prepare('INSERT INTO lorem VALUES (?)');

  for (let i = 0; i < 10; i + 1) {
    stmt.run(`Ipsum ${i}`);
  }

  stmt.finalize();

  db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(`${row.id}: ${row.info}`);
  });
});

db.close();
