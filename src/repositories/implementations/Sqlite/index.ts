import sqlite3 from "sqlite3"
import {open} from "../../../../node_modules/sqlite/build/index"
import path from "path"

const databaseName = process.env.DATABASE_NAME || 'database.dev.db'
const databasePath = path.join(__dirname, `../../../../${databaseName}`)

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
    await createTableUser(db);
    await createTableGroup(db);
    await createTablePayment(db);
    await createTableUserGroup(db);
    await createTableAuthorizationToken(db);

    async function createTableUser(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS 'user'(
      id 'INTEGER' PRIMARY KEY,
      username 'TEXT' NOT NULL UNIQUE,
      password 'TEXT' NOT NULL,
      name 'TEXT' NOT NULL)`)
    }
    async function createTableGroup(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS 'group_plan'(
      id 'INTEGER' PRIMARY KEY,
      description 'TEXT',
      total_ammount 'INTEGER',
      due_date 'TEXT',
      name 'TEXT' NOT NULL)`)
    }
    async function createTablePayment(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS 'payment'(
      id 'INTEGER' PRIMARY KEY,
      ammount 'INTEGER' NOT NULL,
      attachment 'TEXT',
      date 'TEXT',
      user_id 'INTEGER' NOT NULL,
      group_plan_id 'INTEGER' NOT NULL,
      description 'TEXT',
      FOREIGN KEY (user_id) REFERENCES 'user' (id),
      FOREIGN KEY (group_plan_id) REFERENCES 'group_plan' (id))`)
    }
    async function createTableUserGroup(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS 'user_group_plan'(
      id 'INTEGER' PRIMARY KEY,
      user_id 'INTEGER' NOT NULL,
      group_plan_id 'INTEGER' NOT NULL,
      role 'TEXT' NOT NULL,
      FOREIGN KEY (user_id) REFERENCES 'user' (id),
      FOREIGN KEY (group_plan_id) REFERENCES 'group_plan' (id))`)
    }
    async function createTableAuthorizationToken(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS 'authorization_token'(
      id 'INTEGER' PRIMARY KEY,
      user_id 'INTEGER' NOT NULL,
      token 'TEXT' NOT NULL UNIQUE,
      valid 'BOOLEAN' DEFAULT "TRUE" NOT NULL,
      FOREIGN KEY (user_id) REFERENCES 'user' (id))`)
    }
  }

  async populate(db: any): Promise<void> {
    await populateTableUser(db)
    await populateTableGroup(db)
    await populateTablePaymet(db)
    await populateTableUserGroup(db)

    async function populateTableUser(db: any) {
      await db.run(`INSERT INTO 'user'(
        username, password, name
      ) VALUES (?, ?, ?), (?, ?, ?)`,
        'jim@example.com',
        '$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO',
        'Jim Halpert',
        'michael@example.com',
        '$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO',
        'Michael Scott')
    }
    async function populateTableGroup(db: any) {
      await db.run(`INSERT INTO 'group_plan'(
        name, description, total_ammount, due_date
      ) VALUES (?, ?, ?, ?)`,
        'Directv', 'Directv + HBO Max', 900, '2022-05-26T14:10:53.311Z')
    }
    async function populateTablePaymet(db: any) {
      await db.run(`INSERT INTO 'payment'(
        ammount, attachment, date, user_id, group_plan_id, description
      ) VALUES (?, ?, ?, ?, ?, ?) `,
        450, null, '2022-05-26T14:10:53.311Z', 1, 1, 'OK')
    }
    async function populateTableUserGroup(db: any) {
      await db.run(`INSERT INTO 'user_group_plan'(
        user_id, group_plan_id, role
      ) VALUES (?, ?, ?), (?, ?, ?)`,
        1, 1, 'urn:familymanager:role:member',
        2, 1, 'urn:familymanager:role:admin')
    }
  }
}

