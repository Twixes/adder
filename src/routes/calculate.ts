import * as express from 'express'
import { Expression } from '../models/expression'

export const router: express.Router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    const expression: Expression = new Expression(req.body.expressionRaw)
    const variableValue: number = req.body.variableValue
    res.json({
        result: expression.calculateFor(variableValue)
    })
})
