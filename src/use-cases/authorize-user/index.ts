import {SqliteDatabase} from "../../repositories/implementations/Sqlite";
import {SqliteAuthorizationTokenRepository} from "../../repositories/implementations/Sqlite/SqliteAuthorizationTokenRepository";
import {AuthorizeUserUseCase} from "./authorize-user-use-case";
import {AuthorizeUserMiddleware} from "./authorize-user-middleware";

const sqliteDatabase = new SqliteDatabase()

const authorizationCodeRepository = new SqliteAuthorizationTokenRepository(sqliteDatabase)

const authorizeUserUseCase = new AuthorizeUserUseCase(authorizationCodeRepository)

const authorizeUserMiddleware = new AuthorizeUserMiddleware(authorizeUserUseCase)

//authorizeUserUseCase.execute("8c450a4130af60fcfdec51e9ad38380656ae877e").then(a => console.log(a))

export {authorizeUserMiddleware}
