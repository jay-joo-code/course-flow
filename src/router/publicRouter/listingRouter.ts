import express from 'express'
import Listing from '../../models/Listing'

const listingRouter = express.Router()

listingRouter.get('/user', async (req, res) => {
  try {
    const docs = await Listing.find({ userId: req.user._id })
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

listingRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Listing.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

// TODO: get listings for public view
listingRouter.get('/', async (req, res) => {
  try {
    const docs = await Listing.find({ userId: req.user._id })
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default listingRouter
