import {IUserRepository} from "../../IUserRepository";
import {User} from "../../../entities/User";
import {PostgresDatabase} from "./index";

export class PostgresUserRepository implements IUserRepository {
  constructor(private postgresDatabase: PostgresDatabase) {}

  async create(user: User): Promise<User> {
    const {rows: [created]} = await this.postgresDatabase.client.query(`INSERT INTO "user" (username, name, password) VALUES ($1, $2, $3) RETURNING id;`,
      [
        user.getUsername(),
        user.getName(),
        user.getPassword()
      ])
    user.setId(created.id)
    return user
  }
  async findByUsername(username: string): Promise<User> {
    const {rows: [userFound]} = await this.postgresDatabase.client.query(`SELECT * FROM "user" WHERE "username" = $1 LIMIT 1;`, [username])
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
    const {rows: [userFound]} = await this.postgresDatabase.client.query(`SELECT * FROM user WHERE id = $1 LIMIT 1;`, [id])
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
