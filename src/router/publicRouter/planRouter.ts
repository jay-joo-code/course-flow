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
          const requirement = (await Requirement.findById(requirementId)).toObject()
          delete requirement._id
          const dupRequirement = await new Requirement(requirement).save()
          if (requirement._id === '60310e4679be6c1f5075dc8f') {
            console.log(requirement._id, dupRequirement._id)
          }
          resolve(dupRequirement._id)
        } catch (error) {
          console.log('error', error)
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

planRouter.post('/:psid/add-requirement', async (req, res) => {
  try {
    // create requirement and add to target semester
    const { psid } = req.params
    const { semesterNumber, requirementData } = req.body

    const newRequirement = await new Requirement(requirementData).save()
    const plan = await Plan.findOne({ shortId: psid })
    plan.semesters[semesterNumber]?.push(newRequirement._id)
    await plan.save()

    res.send(plan)
  } catch (e) {
    res.status(500).send(e)
  }
})

planRouter.post('/:psid/add-semester', async (req, res) => {
  try {
    // adds semester (empty array) after req.body.semesterNumber
    const { psid } = req.params
    const { semesterNumber } = req.body

    const plan = await Plan.findOne({ shortId: psid })

    plan.semesters.splice(semesterNumber + 1, 0, [])
    await plan.save()

    res.send(plan)
  } catch (e) {
    res.status(500).send(e)
  }
})

planRouter.post('/:psid/delete-semester', async (req, res) => {
  try {
    const { psid } = req.params
    const { semesterNumber } = req.body

    const plan = await Plan.findOne({ shortId: psid })

    // delete requirements
    const promises = plan.semesters[semesterNumber]?.map((requirementId) => new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          await Requirement.findByIdAndDelete(requirementId)
          resolve()
        } catch (error) {
          reject(error)
        }
      })()
    }))
    await Promise.all(promises)

    // delete semester
    plan.semesters.splice(semesterNumber, 1)
    await plan.save()

    res.send(plan)
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
