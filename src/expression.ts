import * as readlineSync from 'readline-sync'

type PowerToCoefficientMap = Map<number, number>
type PowerCoefficientPair = [number, number]
type ExpressionRaw = PowerCoefficientPair[]

export class Expression {
    coefficientToPower: PowerToCoefficientMap = new Map()

    constructor(input?: ExpressionRaw | PowerToCoefficientMap) {
        if (input) {
            if (Array.isArray(input)) this.coefficientToPower = new Map(input)
            else this.coefficientToPower = input
        }
    }

    toPowerCoefficientPairs(): PowerCoefficientPair[] {
        return Array.from(this.coefficientToPower.entries()).filter(([, coefficient]) => coefficient !== 0)
    }

    toString(): string {
        const powerCoefficientPairs: ExpressionRaw = Array.from(this.coefficientToPower.entries()).sort(
            (a: PowerCoefficientPair, b: PowerCoefficientPair) => b[0] - a[0]
        )
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
        powerCoefficientPairs.filter(([, coefficient]) => coefficient !== 0).map(
            ([power, coefficient]) => [
                coefficient !== 1 ? `${coefficient}` : '',
                coefficient !== 1 && power !== 0 ? '*' : '',
                power !== 0 ? 'x' : '',
                power !== 1 && power !== 0 ? `^${power}` : ''
            ].join('')
        )
        return stringSoFar
    }

    calculateFor(variableValue: number): number {
        let y = 0
        for (const [power, coefficient] of this.coefficientToPower.entries()) if (coefficient) {
            y += coefficient * variableValue**power
        }
        return y
    }

     // shame there's no operator redefinition in JS, anyway: opted for a functional approach here instead of in-place
    static sum(...summands: Expression[]): Expression {
        const sum: Expression = new Expression()
        for (const summand of summands) {
            for (const [power, coefficient] of summand.coefficientToPower.entries()) {
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
                'Provide array of raw expressions: '
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
                'Provide raw expression: '
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
            const variableValue: number = readlineSync.questionFloat('Provide variable x value: ')
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
