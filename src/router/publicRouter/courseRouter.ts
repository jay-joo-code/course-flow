import express from 'express'
import substringQuery from './../../util/substringQuery'
import Course from '../../models/Course'

const courseRouter = express.Router()

courseRouter.get('/query', async (req, res) => {
  try {
    const { query }: { query?: string } = req.query
    const [subject, catalogNbr] = query.trim().split(' ')
    const subjectFilter = subject ? { 'data.subject': subject.toUpperCase() } : {}
    const catalogNbrFilter = catalogNbr ? { 'data.catalogNbr': catalogNbr } : {}
    const filter = substringQuery({
      ...subjectFilter,
      ...catalogNbrFilter,
    }, ['data.subject', 'data.catalogNbr'])
    const docs = await Course.find(filter).limit(10)
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

courseRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Course.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

courseRouter.put('/:id', async (req, res) => {
  try {
    const note = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(note)
  } catch (e) {
    res.status(500).send(e)
  }
})

courseRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Course.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default courseRouter
