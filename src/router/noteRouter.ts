import express from 'express'
import Note from '../models/Note';

const noteRouter = express.Router();

noteRouter.post('/', async (req, res) => {
  try {
    const newNote = await new Note(req.body).save()
    console.log('newNote', newNote)
    res.send(newNote)
  } catch (e) {
    res.status(500).send(e)
  }
});

noteRouter.get('/', async (req, res) => {
  try {
    const notes = await Note.find()
    res.send(notes)
  } catch (e) {
    res.status(500).send(e)
  }
});

const log = async () => {
  const notes = await Note.find()
  console.log('notes[notes.length-1]', notes[notes.length-1])
}

// log()

export default noteRouter