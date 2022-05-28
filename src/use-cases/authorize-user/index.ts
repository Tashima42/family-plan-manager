import { AuthorizeUserUseCase } from "./authorize-user-use-case";
import { AuthorizeUserMiddleware } from "./authorize-user-middleware";
import { postgresDatabase } from "../../index"
import { PostgresAuthorizationTokenRepository } from "../../repositories/implementations/Postgres/PostgresAuthorizationTokenRepository"

const authorizationCodeRepository = new PostgresAuthorizationTokenRepository(postgresDatabase);

const authorizeUserUseCase = new AuthorizeUserUseCase(authorizationCodeRepository)

const authorizeUserMiddleware = new AuthorizeUserMiddleware(authorizeUserUseCase)

export {authorizeUserMiddleware}
