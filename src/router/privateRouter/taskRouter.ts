import express from 'express'
import Task from '../../models/Task';
import substringQuery from '../../util/substringQuery';

const taskRouter = express.Router();

taskRouter.post('/', async (req, res) => {
  try {
    const doc = await new Task(req.body).save()
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
});

taskRouter.get('/', async (req, res) => {
  try {
    const docs = await Task.find(substringQuery(req.query, ['name']))
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
});

taskRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Task.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
});

taskRouter.put('/:id', async (req, res) => {
  try {
    const note = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(note)
  } catch (e) {
    res.status(500).send(e)
  }
});

taskRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
});

export default taskRouter