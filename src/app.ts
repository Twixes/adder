import * as express from 'express'
import * as morgan from 'morgan'
import { router as calculateRouter } from './routes/calculate'
import { router as sumRouter } from './routes/sum'

export const app: express.Application = express()

app.use(morgan('dev'))
app.use(express.json())
app.use('/calculate', calculateRouter)
app.use('/sum', sumRouter)
