import express from 'express'
import taskRouter from './taskRouter'

const router = express.Router()

router.get('/ping', async (req, res) => {
  res.send('pong')
})

router.use('/task', taskRouter)

export default router