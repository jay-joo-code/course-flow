import express from 'express'
import noteRouter from './noteRouter'
import taskRouter from './taskRouter'

const router = express.Router()

router.get('/ping', async (req, res) => {
  res.send('pong')
})

router.use('/note', noteRouter)
router.use('/task', taskRouter)

export default router