import * as express from "express"
import * as logger from "morgan"
import * as indexRouter from './routes/index'

const app: express.Application = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', indexRouter)

export = app
