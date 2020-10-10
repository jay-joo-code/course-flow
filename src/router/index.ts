import express from 'express'

const router = express.Router()

router.get('/ping', async (req, res) => {
  res.send('pong')
})

router.post('/note', async (req, res) => {
  try {
    console.log('req.body', req.body)
    res.send('OK')
  } catch (e) {
    console.log('e', e)
    res.status(500).send(e)
  }
})

export default router