import express from 'express'
import taskRouter from './taskRouter'

const privateRouter = express.Router()

// authorization


privateRouter.use('/auth', taskRouter)

export default privateRouter