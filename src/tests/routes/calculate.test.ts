import * as request from 'supertest'
import { app } from '../../app'

describe('GET /calculate', function() {
    it('returns the calculated value', (done) => {
      request(app)
        .get('/calculate')
        .send({
            expressionRaw: [[3, 3], [2, 3], [0, 3]],
            variableValue: 2
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
            result: 39
        }, done)
    })
    it('returns 400 if the expressionRaw field is malformed', (done) => {
      request(app)
        .get('/calculate')
        .send({
            expressionRaw: [[999]],
            variableValue: 9
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, {
            error: 'expressionRaw malformed'
        }, done)
    })
    it('returns 400 if the variableValue field is malformed', (done) => {
      request(app)
        .get('/calculate')
        .send({
            expressionRaw: [[3, 3], [2, 3], [0, 3]],
            variableValue: 'xyz'
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, {
            error: 'variableValue malformed'
        }, done)
    })
})
