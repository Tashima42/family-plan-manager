import {User} from "../../../entities/User";
import {AuthorizationToken} from "../../../entities/AuthorizationToken";
import {IAuthorizationTokenRepository} from "../../IAuthorizationTokenRepository";
import {SqliteDatabase} from "./index";

export class SqliteAuthorizationTokenRepository implements IAuthorizationTokenRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}

  async create(authorizationToken: AuthorizationToken): Promise<AuthorizationToken> {
    const db = await this.sqliteDatabase.connect()
    const created = await db.run(`INSERT INTO authorization_token 
        (user_id, token) 
        VALUES (?, ?)`,
      authorizationToken.getUserId(),
      authorizationToken.getToken()
    )
    authorizationToken.setId(created.lastId)
    return authorizationToken
  }
  async getByToken(token: string): Promise<AuthorizationToken> {
    const db = await this.sqliteDatabase.connect()
    const authorizationTokenFound = await db.get(`SELECT authorization_token.id, authorization_token.token, authorization_token.valid, 
      user.id AS userId, user.username, user.password, user.name
      FROM authorization_token
      LEFT JOIN user ON authorization_token.user_id = user.id
      ON token = ? AND authorization_token.valid = "TRUE";`,
      token
    )
    if (!authorizationTokenFound) throw {code: "RS-IS-SE-AT-001", message: "Authorization token not found"}
    const user = new User(
      authorizationTokenFound.username,
      authorizationTokenFound.name,
      authorizationTokenFound.password,
      authorizationTokenFound.userId
    )
    const authorizationToken = new AuthorizationToken(
      authorizationTokenFound.token,
      user,
      authorizationTokenFound.valid === 1 ? true : false,
      authorizationTokenFound.id,
    )
    return authorizationToken
  }
  async disable(code: string): Promise<Boolean> {
    const db = await this.sqliteDatabase.connect()
    const updated = await db.run(
      'UPDATE authorization_token SET active = ? WHERE code = ?',
      0,
      code
    )
    if (updated.changes !== 1) throw {code: "RS-IS-SE-AT-002", message: "Failed to disable authorization code"}
    return true
  }
}
