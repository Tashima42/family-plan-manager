import {AuthenticationToken} from "../entities/authentication-token";
export interface IAuthorizationTokenRepository {
  create(authorizationCode: AuthorizationToken): Promise<AuthorizationToken>,
  disable(authorizationCode: string): Promise<Boolean>,
  getByToken(token: string): Promise<AuthorizationToken>,
}
