export type PowerToCoefficientMap = Map<number, number>
export type PowerCoefficientPair = [number, number]
export type ExpressionRaw = PowerCoefficientPair[]

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
