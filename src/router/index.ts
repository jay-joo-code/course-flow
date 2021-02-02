import express from 'express'
import privateRouter from './privateRouter'
import publicRouter from './publicRouter'

const router = express.Router()

router.use('/public', publicRouter)
router.use('/private', privateRouter)

router.get('/ping', async (req, res) => {
  res.send('pong')
})

const test = async () => {

}

test()

export default router
