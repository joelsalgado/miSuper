import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  db: SQLiteObject;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.createBd();
    });
  }

  createBd() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
        .then((db: SQLiteObject) => {
          this.db = db;
          const sql = 'CREATE TABLE IF NOT EXISTS tiendas(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, completed INTEGER)';
          db.executeSql(sql, []).then(() => alert('Executed SQL'))
              .catch(e => alert(e));
        })
        .catch(e => alert(e));
  }

  getAll() {
    const sql = 'SELECT * FROM tiendas';
    return this.db.executeSql(sql, [])
        .then(response => {
          const tiendas = [];
          for (let index = 0; index < response.rows.length; index++) {
            tiendas.push( response.rows.item(index) );
          }
          return Promise.resolve( tiendas );
        })
        .catch(error => Promise.reject(error));
  }

  create(tienda: any) {
    const sql = 'INSERT INTO tiendas(nombre, completed) VALUES(?,?)';
    return this.db.executeSql(sql, [tienda.title, tienda.completed]);
  }

  update(tienda: any) {
    const sql = 'UPDATE tiendas SET nombre=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [tienda.nombre, tienda.completed, tienda.id]);
  }

  delete(tienda: any) {
    const sql = 'DELETE FROM tiendas WHERE id=?';
    return this.db.executeSql(sql, [tienda.id]);
  }





}
