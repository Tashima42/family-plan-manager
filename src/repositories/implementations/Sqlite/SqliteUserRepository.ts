import {IUserRepository} from "../../IUserRepository";
import {User} from "../../../entities/User";
import {SqliteDatabase} from "./index";

export class SqliteUserRepository implements IUserRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}

  async create(user: User): Promise<User> {
    const db = await this.sqliteDatabase.connect()
    const created = await db.run(`INSERT INTO user (username, name, password) VALUES (?, ?, ?);`,
      user.getUsername(),
      user.getName(),
      user.getPassword())

    user.setId(created.lastID)
    return user
  }
  async findByUsername(username: string): Promise<User> {
    const db = await this.sqliteDatabase.connect()
    const userFound = await db.get(`SELECT * FROM user WHERE username = ?;`,
      username)
    if (!userFound) throw {code: "RS-IS-SE-UR-001", message: "User not found"}
    const user = new User(
      userFound.username,
      userFound.name,
      userFound.password,
      userFound.id,
    )
    return user
  }
  async findById(id: number): Promise<User> {
    const db = await this.sqliteDatabase.connect()
    const userFound = await db.get(`SELECT * FROM user WHERE id = ?;`,
      id)
    if (!userFound) throw {code: "RS-IS-SE-UR-002", message: "User not found"}
    const user = new User(
      userFound.username,
      userFound.name,
      userFound.password,
      userFound.id,
    )
    return user
  }

}
