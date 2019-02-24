import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import l from './logger';
import { FRUIT_GOUT, SMOOTHIES, FRUITS, SMOOTHIE_FRUIT, DB_LINK } from './util';

const sqlite3 = require('sqlite3').verbose();

const app = new Express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
  }

  router(routes) {
    swaggerify(app, routes);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);
    http.createServer(app).listen(port, welcome(port));
    return app;
  }

  openDB() {
    const sqlSmoothie = 'CREATE TABLE IF NOT EXISTS smoothie (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, jus TEXT, description TEXT);';
    const sqlFruit = 'CREATE TABLE IF NOT EXISTS fruit (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, preparation TEXT);';

    const sqlSmoothieFruit = 'CREATE TABLE IF NOT EXISTS smoothie_fruit (id INTEGER PRIMARY KEY AUTOINCREMENT, id_smoothie INTEGER, id_fruit INTEGER, FOREIGN KEY(id_smoothie) REFERENCES smoothie(id), FOREIGN KEY(id_fruit) REFERENCES fruit(id));';
    const sqlFruitGout = 'CREATE TABLE IF NOT EXISTS fruit_gout (id INTEGER PRIMARY KEY AUTOINCREMENT, id_fruit INTEGER, gout TEXT, FOREIGN KEY(id_fruit) REFERENCES fruit(id));';

    const db = new sqlite3.Database(`${DB_LINK}`, (err => {
      if (err) {
        console.log('Error opening database:', err, err.stack);
      }
      console.log('Database was opened successfully');
      return this;
    }));

    this.createTable(db, sqlFruit);
    this.createTable(db, sqlSmoothie);
    this.createTable(db, sqlSmoothieFruit);
    this.createTable(db, sqlFruitGout);

    this.insertDatas(db);

    db.close(err => {
      if (err) {
        console.log('Error closing databae:', err, err.stack);
        return this;
      }
      console.log('Database was closed successfully');
      return this;
    });

    return this;
  }

  createTable(db, sql) {
    db.serialize(() => {
      db.run(sql, [], err => {
        if (err) {
          console.log('Error executing statement:', err, err.stack);
        }
        return this;
      });
    });
  }

  insertDatas(db) {
    this.insertDatasInTable(db, FRUITS, 'fruit');
    this.insertDatasInTable(db, SMOOTHIES, 'smoothie');
    this.insertDatasInTable(db, SMOOTHIE_FRUIT, 'smoothie_fruit');
    this.insertDatasInTable(db, FRUIT_GOUT, 'fruit_gout');
  }

  insertDatasInTable(db, array, tablename) {
    array.forEach(el => {
      const cols = Object.keys(el).join(', ');
      const placeholders = Object.keys(el).fill('?').join(', ');
      db.run(`INSERT INTO ${tablename} (${cols}) VALUES (${placeholders})`, Object.values(el), err => this.checkErrorInsert(tablename, el.id, err));
    });
  }

  checkErrorInsert(tablename, id, err) {
    if (err) {
      console.log(`${tablename}: (${id}) ${err}`);
    } else {
      console.log(`${tablename}: (${id}) success`);
    }
    return this;
  }
}
