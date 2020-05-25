import * as express from 'express'
import { Expression } from '../models/expression'

export const router: express.Router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    const expressions: Expression[] = []
    for (const expressionRaw of req.body.expressionsRaw || []) {
        expressions.push(new Expression(expressionRaw))
    }
    const sum: Expression = Expression.sum(...expressions)
    res.json({
        expressionRaw: sum.toPowerCoefficientPairs(),
        string: sum.toString()
    })
})
