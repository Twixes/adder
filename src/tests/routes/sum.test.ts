import * as request from 'supertest'
import { app } from '../../app'

describe('GET /sum', function() {
    it('returns the sum of expressions', (done) => {
      request(app)
        .get('/sum')
        .send({
            expressionsRaw: [[[2, 2], [0, 3]], [[2, 1], [3, 3]]]
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
            expressionRaw: [[3, 3], [2, 3], [0, 3]],
            expressionString: '3*x^3 + 3*x^2 + 3'
        }, done)
    })
    it('returns emptiness if no expression was provided', (done) => {
      request(app)
        .get('/sum')
        .send({
            expressionsRaw: []
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
            expressionRaw: [],
            expressionString: ''
        }, done)
    })
    it('returns equivalent expression if only one was provided', (done) => {
      request(app)
        .get('/sum')
        .send({
            expressionsRaw: [[[6, 7], [8, 10]]]
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
            expressionRaw: [[8, 10], [6, 7]],
            expressionString: '10*x^8 + 7*x^6'
        }, done)
    })
    it('returns 400 if the expressionsRaw field is malformed', (done) => {
      request(app)
        .get('/sum')
        .send({
            expressionsRaw: [[999]]
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, {
            error: 'expressionsRaw malformed'
        }, done)
    })
})
