import express from 'express'
import privateRouter from './privateRouter'
import publicRouter from './publicRouter'

const router = express.Router()

router.get('/ping', async (req, res) => {
  res.send('pong')
})

router.use('/public', publicRouter)
router.use('/private', privateRouter)

export default router