import * as readlineSync from 'readline-sync'
import { Expression, ExpressionRaw } from './models/expression'

const options: string[] = ['SUM', 'CALCULATE']
let optionIndex = -1
while (true) {
    optionIndex = readlineSync.keyInSelect(['SUM', 'CALCULATE'], 'What do you want to do?')
    if (options[optionIndex] === 'SUM') {
        const expressionsRawInput: string = readlineSync.question(
            'Provide array of raw expressions (e.g. [[[2, 2], [0, 3]], [[3, 3], [2, 1]]]): '
        )
        try {
            const expressionsRaw: ExpressionRaw[] = JSON.parse(expressionsRawInput)
            if (!Array.isArray(expressionsRaw)) throw TypeError('expressionsRawInput is not an array')
            const sum: Expression = Expression.sum(...expressionsRaw.map(
                expressionRawCandidate => new Expression(expressionRawCandidate)
            ))
            console.log(sum.toPowerCoefficientPairs())
            console.log(sum.toString())
        } catch (err) {
            console.log(err.toString())
            continue
        }
    } else if (options[optionIndex] === 'CALCULATE') {
        const expressionRawInput: string = readlineSync.question(
            'Provide raw expression (e.g. [[2, 3], [0, 3], [3, 3]]): '
        )
        let expression: Expression
        try {
            const expressionRaw: ExpressionRaw = JSON.parse(expressionRawInput)
            if (!Array.isArray(expressionRaw)) throw TypeError('expressionRawInput is not an array')
            expression = new Expression(expressionRaw)
        } catch (err) {
            console.log(err.toString())
            continue
        }
        const variableValue: number = readlineSync.questionFloat('Provide variable x value (e.g. 4): ')
        try {
            const result: number = expression.calculateFor(variableValue)
            console.log(result)
        } catch (err) {
            console.log(err.toString())
            continue
        }
    } else {
        break
    }
}
