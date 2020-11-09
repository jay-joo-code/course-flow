import express from 'express'
import taskRouter from './taskRouter'
import authRouter from './authRouter'

const router = express.Router()

router.get('/ping', async (req, res) => {
  res.send('pong')
})

router.use('/task', taskRouter)
router.use('/auth', authRouter)

export default router