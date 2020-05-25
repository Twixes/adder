import * as express from 'express'
import { Expression } from '../models/expression'

export const router: express.Router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    const expressions: Expression[] = []
    let sum: Expression
    try {
        for (const expressionRaw of req.body.expressionsRaw || []) {
            expressions.push(new Expression(expressionRaw))
        }
        sum = Expression.sum(...expressions)
    } catch (err) {
        return res.status(400).json({
            error: 'expressionsRaw malformed'
        })
    }
    try {
        return res.json({
            expressionRaw: sum.toPowerCoefficientPairs(),
            expressionString: sum.toString()
        })
    } catch (err) {
        return res.status(500).json({
            error: 'server error'
        })
    }
})
