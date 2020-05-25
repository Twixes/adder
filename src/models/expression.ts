import * as readlineSync from 'readline-sync'

type PowerToCoefficientMap = Map<number, number>
type PowerCoefficientPair = [number, number]
type ExpressionRaw = PowerCoefficientPair[]

export class Expression {
    coefficientToPower: PowerToCoefficientMap = new Map()

    private static checkPairs(pairs: PowerCoefficientPair[]): PowerCoefficientPair[] {
        return pairs.filter(
            ([power, coefficient]) => {
                if (typeof power !== 'number') throw TypeError('power is not number')
                if (typeof coefficient !== 'number') throw TypeError('coefficient is not number')
                return coefficient
            }
        )
    }

    constructor(input?: ExpressionRaw | PowerToCoefficientMap) {
        if (input) {
            if (Array.isArray(input)) this.coefficientToPower = new Map(Expression.checkPairs(input))
            else this.coefficientToPower = new Map(Expression.checkPairs(Array.from(input.entries())))
        }
    }

    toPowerCoefficientPairs(sort = true): PowerCoefficientPair[] {
        const pairs: PowerCoefficientPair[] = Expression.checkPairs(Array.from(this.coefficientToPower.entries()))
        if (sort) return pairs.sort(
            (a: PowerCoefficientPair, b: PowerCoefficientPair) => b[0] - a[0]
        )
        return pairs
    }

    toString(): string {
        const powerCoefficientPairs: ExpressionRaw = this.toPowerCoefficientPairs()
        let stringSoFar = ''
        for (const [power, coefficient] of powerCoefficientPairs) {
            if (coefficient === 0) continue
            if (stringSoFar) stringSoFar += coefficient > 0 ? ' + ' : ' - '
            stringSoFar += [
                coefficient !== 1 ? `${Math.abs(coefficient)}` : '',
                coefficient !== 1 && power !== 0 ? '*' : '',
                power !== 0 ? 'x' : '',
                power !== 1 && power !== 0 ? (power < 0 ? `^(${power})` : `^${power}`) : ''
            ].join('')
        }
        return stringSoFar
    }

    calculateFor(variableValue: number): number {
        if (typeof variableValue !== 'number') throw TypeError('variableValue is not a number')
        let y = 0
        for (const [power, coefficient] of this.toPowerCoefficientPairs(false)) {
            y += coefficient * variableValue**power
        }
        return y
    }

     // shame there's no operator redefinition in JS, anyway: opted for a functional approach here instead of in-place
    static sum(...summands: Expression[]): Expression {
        const sum: Expression = new Expression()
        for (const summand of summands) {
            for (const [power, coefficient] of summand.toPowerCoefficientPairs(false)) {
                sum.coefficientToPower.set(power, (sum.coefficientToPower.get(power) || 0) + coefficient)
            }
        }
        return sum
    }
}

function commandLineLoop(): void {
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
}

if (require.main === module) commandLineLoop()
