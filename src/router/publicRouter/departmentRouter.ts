import express from 'express'
import { IDepartmentDoc } from 'src/client/src/types/department'
import Department from '../../models/Department'

const departmentRouter = express.Router()

departmentRouter.get('/', async (req, res) => {
  try {
    const docs: IDepartmentDoc[] = await Department.find()
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

departmentRouter.get('/:id', async (req, res) => {
  try {
    const doc: IDepartmentDoc = await Department.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default departmentRouter
