import express from 'express'
import courseRouter from './courseRouter'
import authRouter from './authRouter'

const publicRouter = express.Router()

publicRouter.use('/course', courseRouter)
publicRouter.use('/auth', authRouter)

export default publicRouter
