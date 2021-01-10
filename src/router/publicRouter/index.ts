import express from 'express'
import listingRouter from './listingRouter'
import authRouter from './authRouter'

const publicRouter = express.Router()

publicRouter.use('/auth', authRouter)
publicRouter.use('/listing', listingRouter)

export default publicRouter
