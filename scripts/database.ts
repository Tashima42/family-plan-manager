import {SqliteDatabase} from "../src/repositories/implementations/Sqlite/index"
import {PostgresDatabase} from "../src/repositories/implementations/Postgres/index"

run()

async function run() {
  const args: Array<string> = process.argv
  console.log(args)

  if (!process.env.PGUSER) {
    const sqliteDatabase = new SqliteDatabase()
    const db = await sqliteDatabase.connect()
    for (const arg of args) {
      if (arg === '--migrate') await sqliteDatabase.migrate(db)
      if (arg === '--populate') await sqliteDatabase.populate(db)
    }
  } else {
    const postgresDatabase = new PostgresDatabase()
    await postgresDatabase.client.connect()
    for (const arg of args) {
      if (arg === '--migrate') await postgresDatabase.migrate()
      if (arg === '--populate') await postgresDatabase.populate()
    }
    await postgresDatabase.client.end()
  }
}


