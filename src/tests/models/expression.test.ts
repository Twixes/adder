import * as assert from 'assert'
import { Expression } from '../../models/expression'

describe('Expression', () => {
    describe('#constructor()', () => {
        it('should work without input by constructing an empty, falsy instance', () => {
            const expression: Expression = new Expression()
            assert.equal(expression, false)
            assert.deepStrictEqual(expression.coefficientToPower, new Map())
        })
        it('should work with Map<number, number> input', () => {
            const map: Map<number, number> = new Map([[9, 6], [3, 0]])
            const expression: Expression = new Expression(map)
            assert.deepStrictEqual(expression.coefficientToPower, map)
        })
        it('should work with Array<number> input', () => {
            const array: [number, number][] = [[10000000, -10000000], [0, 0]]
            const expression: Expression = new Expression(array)
            assert.deepStrictEqual(expression.coefficientToPower, new Map(array))
        })
    })
    describe('#toString()', () => {
        it('should handle all positive powers and coefficients in descending order of powers', () => {
            const expression: Expression = new Expression([[1,1], [666, 3], [2, 3]])
            assert.strictEqual(expression.toString(), '3*x^666 + 3*x^2 + x')
        })
        it('should handle a zero power', () => {
            const expression: Expression = new Expression([[2, 2137], [0, 1337]])
            assert.strictEqual(expression.toString(), '2137*x^2 + 1337')
        })
        it('should handle a negative power', () => {
            const expression: Expression = new Expression([[7, 9], [-5, 32]])
            assert.strictEqual(expression.toString(), '9*x^7 + 32*x^(-5)')
        })
        it('should ignore a zero coefficient', () => {
            const expression: Expression = new Expression([[7, 9], [42, 0]])
            assert.strictEqual(expression.toString(), '9*x^7')
        })
        it('should handle a negative coefficient', () => {
            const expression: Expression = new Expression([[7, 9], [5, -32]])
            assert.strictEqual(expression.toString(), '9*x^7 - 32*x^5')
        })
    })
    describe('#calculateFor()', () => {
        it('should return the correct result assuming x', () => {
            const expression: Expression = new Expression([[2, 2137], [-0, -1337], [-4, -4]])
            assert.strictEqual(expression.calculateFor(997), 2137 * 997**2 - 1337 - 4 * 997**(-4))
        })
    })
    describe('#sum()', () => {
        it('should return the sum of given expressions', () => {
            const expression1: Expression = new Expression([[2, 2], [0, 3]])
            const expression2: Expression = new Expression([[2, 1], [3, 3]])
            const expression3: Expression = new Expression()
            const expressionSum: Expression = Expression.sum(expression1, expression2, expression3)
            assert.strictEqual(expressionSum.toString(), '3*x^3 + 3*x^2 + 3')
        })
    })
})
