import {User} from "../../../entities/User";
import {AuthorizationToken} from "../../../entities/AuthorizationToken";
import {IAuthorizationTokenRepository} from "../../IAuthorizationTokenRepository";
import {PostgresDatabase} from "./index";

export class PostgresAuthorizationTokenRepository implements IAuthorizationTokenRepository {
  constructor(private postgresDatabase: PostgresDatabase) {}

  async create(authorizationToken: AuthorizationToken): Promise<AuthorizationToken> {
    const {rows: [created]} = await this.postgresDatabase.client.query(`INSERT INTO "authorization_token" (user_id, token) VALUES ($1, $2) RETURNING id`,
      [
        authorizationToken.getUserId(),
        authorizationToken.getToken()
      ]
    )
    authorizationToken.setId(created.id)
    return authorizationToken
  }
  async getByToken(token: string): Promise<AuthorizationToken> {
    const text = 'SELECT at.id AS authorization_token_id, at.token AS token, at.valid AS valid, u.id AS user_id, u.username AS user_username, u.password AS user_password, u.name AS user_name FROM  "authorization_token" at  JOIN "user" u ON at.user_id = u.id WHERE token = $1;;'
    const {rows: [authorizationTokenFound]} = await this.postgresDatabase.client.query(text, [token])
    console.log({authorizationTokenFound})

    if (!authorizationTokenFound) throw {code: "RS-IS-SE-AT-001", message: "Authorization token not found"}
    const user = new User(
      authorizationTokenFound.user_username,
      authorizationTokenFound.user_name,
      authorizationTokenFound.user_password,
      authorizationTokenFound.user_id
    )
    const authorizationToken = new AuthorizationToken(
      authorizationTokenFound.token,
      user,
      authorizationTokenFound.valid,
      authorizationTokenFound.id,
    )
    return authorizationToken
  }
  async disable(code: string): Promise<Boolean> {
    const updated = await this.postgresDatabase.client.query(`UPDATE "authorization_token" SET "active" = $1 WHERE "code" = $2`,
      [0, code]
    )
    if (updated.rowCount !== 1) throw {code: "RS-IS-SE-AT-002", message: "Failed to disable authorization code"}
    return true
  }
}
