import * as express from 'express'
import { Expression } from './expression'

export const router: express.Router = express.Router()

router.get('/sum/', (req: express.Request, res: express.Response) => {
    console.log(req.body)
    const expressions: Expression[] = []
    for (const rawExpression of req.body.rawExpressions || []) {
        expressions.push(new Expression(rawExpression))
    }
    const sum: Expression = Expression.sum(...expressions)
    res.json({
        powerCoefficientPairs: Array.from(sum.coefficientToPower.entries()),
        string: sum.toString()
    })
})

router.get('/calculate/', (req: express.Request, res: express.Response) => {
    console.log(req.body)
    const expression: Expression = new Expression(req.body.rawExpression)
    const inputValue: number = req.body.inputValue
    res.json({
        result: expression.calculateFor(inputValue)
    })
})
