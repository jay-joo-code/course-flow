import express from 'express'
import passport from 'passport'
import listingRouter from './listingRouter'
import taskRouter from './taskRouter'
import userRouter from './userRouter'

const privateRouter = express.Router()

// authorization
privateRouter.use(passport.authenticate('jwt', { session: false }))

privateRouter.use('/task', taskRouter)
privateRouter.use('/listing', listingRouter)
privateRouter.use('/user', userRouter)

export default privateRouter