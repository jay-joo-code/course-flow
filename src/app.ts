import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import passport from 'passport'
import PassportJwt from 'passport-jwt'
import path from 'path'
import { IUserDoc } from './client/src/types/user'
import User from './models/User'
import router from './router'

dotenv.config({ path: path.resolve(__dirname, '/../.env') })

// MONGODB
const isProdDb = (process.env.NODE_ENV === 'production' && process.env.DB_PROD)
const dbType = isProdDb ? 'prod' : 'dev'
const URI = isProdDb ? process.env.DB_PROD : process.env.DB_DEV
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.once('open', () => {
  // tslint:disable-next-line
  console.log('Databse connection:', dbType)
})

// INIT
const app = express()
app.listen(process.env.PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on port ${process.env.PORT}`)
})

// MIDDLEWARES
app.use(morgan('dev'))
app.set('trust proxy', 1)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(compression())

// PASSPORT
declare global {
  namespace Express {
      interface User extends IUserDoc {}
  }
}

app.use(passport.initialize())
const { Strategy: JwtStrategy, ExtractJwt } = PassportJwt
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AUTH_SECRET,
}
passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
  User.findById(jwtPayload._id, (err, user: IUserDoc) => {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  })
}))

// ROUTING
app.use(express.static(path.join(__dirname, '/client/build/')))
app.use('/api', router)
if (process.env.NODE_ENV !== 'development') {
  app.get('*', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '/client/build/index.html'))
  })
}
