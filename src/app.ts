import * as express from 'express'
import * as morgan from 'morgan'
import { router } from './router'

export const app: express.Application = express()

app.use(morgan('dev'))
app.use(express.json())
app.use('/', router)
