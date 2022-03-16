import sqlite3 from "sqlite3"
import {open} from "../../../../node_modules/sqlite/build/index"
import path from "path"

const databasePath = path.join(__dirname, '../../../../database.db')

export class SqliteDatabase {
  async connect(): Promise<any> {
    const db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
    db.on('trace', (data: any) => console.log(data))
    return db
  }

  async migrate(db: any): Promise<void> {
    await createTableUser(db)
    await createTableCoin(db)
    await createTableCollection(db)
    await createTableUserCollection(db);
    await createTableCollectionCoin(db)

    async function createTableUser(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS user(
      id 'INTEGER' PRIMARY KEY,
      username 'TEXT' NOT NULL UNIQUE,
      password 'TEXT' NOT NULL,
      name 'TEXT' NOT NULL)`)
    }
    async function createTableCoin(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS coin(
      id 'INTEGER' PRIMARY KEY,
      name 'TEXT' NOT NULL,
      price 'TEXT',
      description 'TEXT')`)
    }
    async function createTableCollection(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS collection(
      id 'INTEGER' PRIMARY KEY,
      name 'TEXT' NOT NULL)`)
    }
    async function createTableUserCollection(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS user_collection(
      id 'INTEGER' PRIMARY KEY,
      user_id 'INTEGER' NOT NULL,
      collection_id 'INTEGER' NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user (id),
      FOREIGN KEY (collection_id) REFERENCES collection (id))`)
    }
    async function createTableCollectionCoin(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS collection_coin(
      id 'INTEGER' PRIMARY KEY,
      collection_id 'INTEGER' NOT NULL,
      coin_id 'INTEGER' NOT NULL,
      FOREIGN KEY (collection_id) REFERENCES collection (id),
      FOREIGN KEY (coin_id) REFERENCES coin (id))`)
    }
  }

  async populate(db: any): Promise<void> {
    await populateTableUser(db)
    await populateTableCoin(db)
    await populateTableCollection(db)
    await populateTableUserCollection(db)
    await populateTableCollectionCoin(db)

    async function populateTableUser(db: any) {
      await db.run(`INSERT INTO user (
        username, password, name
      ) VALUES (?, ?, ?) `,
        'user1@example.com',
        '$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO',
        'User One')
    }
    async function populateTableCoin(db: any) {
      await db.run(`INSERT INTO coin (
        name, price, description
      ) VALUES (?, ?, ?) `,
        'Um Real',
        '1.00',
        'Moeda Brasileira')
    }
    async function populateTableCollection(db: any) {
      await db.run(`INSERT INTO collection (
        name
      ) VALUES (?) `,
        'Moedas Brasileiras')
    }
    async function populateTableUserCollection(db: any) {
      await db.run(`INSERT INTO user_collection (
        user_id, collection_id
      ) VALUES (?, ?) `,
        1, 1)
    } async function populateTableCollectionCoin(db: any) {
      await db.run(`INSERT INTO collection_coin (
        coin_id, collection_id
      ) VALUES (?, ?) `,
        1, 1)
    }
  }
}

