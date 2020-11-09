import express from 'express'
import Task from '../models/Task';
import substringQuery from '../util/substringQuery';

const authRouter = express.Router();

authRouter.post('/', async (req, res) => {
  try {
    const doc = await new Task(req.body).save()
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
});

authRouter.get('/', async (req, res) => {
  try {
    const docs = await Task.find(substringQuery(req.query, ['name']))
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
});

authRouter.get('/current', async (req, res) => {
  try {
    const TEST_USER_DATA = {
     name: 'test user' 
    }
    // res.send(TEST_USER_DATA)
    res.send(null)
  } catch (e) {
    res.status(500).send(e)
  }
});

authRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Task.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
});

authRouter.put('/:id', async (req, res) => {
  try {
    const note = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(note)
  } catch (e) {
    res.status(500).send(e)
  }
});

authRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
});

export default authRouter