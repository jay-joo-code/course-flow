import express from 'express'
import Plan from '../../models/Plan'
import Requirement from '../../models/Requirement'
import Template from '../../models/Template'

const planRouter = express.Router()

// generate plan by major, return plan short id psid
planRouter.post('/major', async (req, res) => {
  try {
    const { majorId, userId } = req.body
    const template = await Template.findOne({ majorId })

    const promises = template.semesters.map((semester) => semester.map((requirementId) => new Promise((resolve, reject) => {
      (async () => {
        try {
          const requirement = await Requirement.findById(requirementId)
          const dupRequirement = await new Requirement(requirement).save()
          resolve(dupRequirement._id)
        } catch (error) {
          reject(error)
        }
      })()
    })))

    const dupSemesters = await Promise.all(promises.map((innerPromiseArray) => {
      return Promise.all(innerPromiseArray)
    }))

    const plan = await new Plan({
      majorId,
      userId,
      semesters: dupSemesters,
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
