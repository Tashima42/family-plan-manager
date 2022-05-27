import express, {Request, NextFunction, Response} from "express"
import cors from "cors"

import {router} from "./routes"

const port = process.env.PORT || 3891

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json({limit: '5mb'}))
app.use(log)
app.use(router)

app.listen(port, () => console.info(`app listening on port ${port}`))

function log(req: Request, res: Response, next: NextFunction): unknown {
  console.log({
    query: req.query,
    body: req.body,
    url: req.url,
    headers: req.headers,
  })
  return next()
}
