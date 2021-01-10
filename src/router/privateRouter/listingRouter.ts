import express from 'express'
import Listing from '../../models/Listing'

const listingRouter = express.Router()

listingRouter.post('/', async (req, res) => {
  try {
    const doc = await new Listing({ ...req.body, userId: req.user._id }).save()
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

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

listingRouter.put('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.send(listing)
  } catch (e) {
    res.status(500).send(e)
  }
})

listingRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Listing.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default listingRouter
