import express from 'express'
import Plan from '../../models/Plan'
import Template from '../../models/Template'

const planRouter = express.Router()

// generate plan by major, return plan short id psid
planRouter.post('/major', async (req, res) => {
  try {
    const { majorId, userId } = req.body
    const template = await Template.findOne({ majorId })

    // TODO: duplicate template.semesters

    const plan = await new Plan({
      majorId,
      userId,
      semesters: template.semesters,
    }).save()
    res.send(plan.shortId)
  } catch (e) {
    res.status(500).send(e)
  }
})

planRouter.get('/:psid', async (req, res) => {
  try {
    const doc = await Plan.findOne({ shortId: req.params.psid })
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

planRouter.put('/:psid', async (req, res) => {
  try {
    const doc = await Plan.findOneAndUpdate({ shortId: req.params.psid }, req.body, { new: true })
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

planRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Plan.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default planRouter
