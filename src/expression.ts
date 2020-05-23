type PowerCoefficientPair = [number, number]

export class Expression {
    coefficientToPower: Map<number, number> = new Map()

    constructor(input?: PowerCoefficientPair[] | Map<number, number>) {
        if (input) {
            if (Array.isArray(input)) this.coefficientToPower = new Map(input)
            else this.coefficientToPower = input
        }
    }

    toString(): string {
        const powerCoefficientPairs: PowerCoefficientPair[] = Array.from(this.coefficientToPower.entries()).sort(
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

    calculateFor(inputValue: number): number {
        let y = 0
        for (const [power, coefficient] of this.coefficientToPower.entries()) if (coefficient) {
            y += coefficient * inputValue**power
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
