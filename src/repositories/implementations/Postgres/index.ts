import {Client} from "pg"

export class PostgresDatabase {
  public client: Client

  constructor() {
    this.client = new Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: parseInt(process.env.PGPORT),
      ssl: {rejectUnauthorized: false}
    })
  }

  async migrate(): Promise<void> {

    await this.createTableUser();
    await this.createTableGroup();
    await this.createTablePayment();
    await this.createTableUserGroup();
    await this.createTableAuthorizationToken();

  }
  async createTableUser(): Promise<void> {
    await this.client.query(`CREATE TABLE IF NOT EXISTS "user" (
      id SERIAL PRIMARY KEY,
      username VARCHAR (100) NOT NULL UNIQUE,
      password VARCHAR (100) NOT NULL,
      name VARCHAR (300) NOT NULL)`)
  }
  async createTableGroup(): Promise<void> {
    await this.client.query(`CREATE TABLE IF NOT EXISTS "group_plan"(
      id SERIAL PRIMARY KEY,
      description VARCHAR(1000),
      total_ammount INT,
      due_date DATE,
      name VARCHAR(300) NOT NULL)`)
  }
  async createTablePayment(): Promise<void> {
    await this.client.query(`CREATE TABLE IF NOT EXISTS "payment"(
      id SERIAL PRIMARY KEY,
      ammount INT NOT NULL,
      attachment VARCHAR (1000),
      date DATE,
      user_id SERIAL NOT NULL,
      group_plan_id SERIAL NOT NULL,
      description VARCHAR(10000),
      FOREIGN KEY (user_id) REFERENCES "user" (id),
      FOREIGN KEY (group_plan_id) REFERENCES "group_plan" (id))`)
  }
  async createTableUserGroup(): Promise<void> {
    await this.client.query(`CREATE TABLE IF NOT EXISTS "user_group_plan"(
      id SERIAL PRIMARY KEY,
      user_id SERIAL NOT NULL,
      group_plan_id SERIAL NOT NULL,
      role VARCHAR(100) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES "user" (id),
      FOREIGN KEY (group_plan_id) REFERENCES "group_plan" (id))`)
  }
  async createTableAuthorizationToken(): Promise<void> {
    await this.client.query(`CREATE TABLE IF NOT EXISTS "authorization_token"(
      id SERIAL PRIMARY KEY,
      user_id SERIAL NOT NULL,
      token VARCHAR(5000) NOT NULL UNIQUE,
      valid BOOLEAN DEFAULT TRUE NOT NULL,
      FOREIGN KEY (user_id) REFERENCES "user" (id))`)
  }

  async populate(): Promise<void> {
    await this.populateTableUser()
    await this.populateTableGroup()
    await this.populateTablePaymet()
    await this.populateTableUserGroup()
  }
  async populateTableUser() {
    const text = `INSERT INTO "user"( username, password, name) VALUES ($1, $2, $3), ($4, $5, $6)`
    const values = [
      "jim@example.com",
      "$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO",
      "Jim Halpert",
      "michael@example.com",
      "$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO",
      "Michael Scott"
    ]
    await this.client.query(text, values)
  }
  async populateTableGroup() {
    const text = `INSERT INTO "group_plan"( name, description, total_ammount, due_date) VALUES ($1, $2, $3, $4)`
    const values = ["Directv", "Directv + HBO Max", 900, new Date("2022-05-26T14:10:53.311Z")]
    await this.client.query(text, values)
  }
  async populateTablePaymet() {
    const text = `INSERT INTO "payment"( ammount, attachment, date, user_id, group_plan_id, description) VALUES ($1, $2, $3, $4, $5, $6)`
    const values = [450, null, new Date("2022-05-26T14:10:53.311Z"), 1, 1, "OK"]
    await this.client.query(text, values)
  }
  async populateTableUserGroup() {
    const text = `INSERT INTO "user_group_plan"( user_id, group_plan_id, role) VALUES ($1, $2, $3), ($4, $5, $6)`
    const values = [
      1, 1, "urn:familymanager:role:member",
      2, 1, "urn:familymanager:role:admin"
    ]
    await this.client.query(text, values)
  }
}

