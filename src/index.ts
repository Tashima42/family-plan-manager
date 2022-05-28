import express, {Request, NextFunction, Response} from "express"
import cors from "cors"
import {PostgresDatabase} from "./repositories/implementations/Postgres"
const postgresDatabase = new PostgresDatabase()
export {postgresDatabase}

import {router} from "./routes"

const port = process.env.PORT || 3891

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json({limit: '5mb'}))
app.use(log)
app.use(router)

let server = null
postgresDatabase.client.connect().then(() => {
  server = app.listen(port, () => console.info(`app listening on port ${port}`))
})

process.on('SIGTERM', () => {
  server.close(() => {
    console.info('Server closed')
    postgresDatabase.client.end(() => {
      console.info("Postgres client closed")
      process.exit(0)
    })
  })

});

function log(req: Request, res: Response, next: NextFunction): unknown {
  console.log({
    query: req.query,
    body: req.body,
    url: req.url,
    headers: req.headers,
  })
  return next()
}

