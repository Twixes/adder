import * as express from 'express'

const router: express.Router = express.Router()

router.get('/', function(_: express.Request, res: express.Response) {
    res.json({})
})

export = router
