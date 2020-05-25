import * as express from 'express'
import { Expression } from '../models/expression'

export const router: express.Router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    let expression: Expression
    let result: number
    try {
        expression = new Expression(req.body.expressionRaw)
    } catch (err) {
        return res.status(400).json({
            error: 'expressionRaw malformed'
        })
    }
    try {
        result = expression.calculateFor(req.body.variableValue)
    } catch (err) {
        return res.status(400).json({
            error: 'variableValue malformed'
        })
    }
    try {
        return res.json({
            result: result
        })
    } catch (err) {
        return res.status(500).json({
            error: 'server error'
        })
    }
})
