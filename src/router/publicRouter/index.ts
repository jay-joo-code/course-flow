import express from 'express'
import majorRouter from './majorRouter'
import departmentRouter from './departmentRouter'
import courseRouter from './courseRouter'
import authRouter from './authRouter'

const publicRouter = express.Router()

publicRouter.use('/major', majorRouter)
publicRouter.use('/department', departmentRouter)
publicRouter.use('/course', courseRouter)
publicRouter.use('/auth', authRouter)

export default publicRouter
