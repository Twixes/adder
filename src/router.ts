import * as express from 'express'
import { Expression } from './expression'

export const router: express.Router = express.Router()

router.get('/sum/', (req: express.Request, res: express.Response) => {
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

router.get('/calculate/', (req: express.Request, res: express.Response) => {
    const expression: Expression = new Expression(req.body.expressionRaw)
    const inputValue: number = req.body.inputValue
    res.json({
        result: expression.calculateFor(inputValue)
    })
})
