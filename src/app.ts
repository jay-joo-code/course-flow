import router from './router'
import path from 'path'
import express, { Request, Response, Router, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from "dotenv"
import mongoose from 'mongoose'
import morgan from 'morgan'
import PassportJwt from 'passport-jwt'
import passport from 'passport'
import User from './models/User'

dotenv.config({ path: __dirname + '/../.env' });

// MONGODB
const isProdDb = (process.env.NODE_ENV === 'production' && process.env.DB_PROD)
const dbType = isProdDb ? 'prod' : 'dev'
const URI = isProdDb ? process.env.DB_PROD : process.env.DB_DEV
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.once('open', () => {
  // tslint:disable-next-line
  console.log('DB Type:', dbType)
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
app.use(helmet())
app.use(compression())

// PASSPORT
const { Strategy: JwtStrategy, ExtractJwt } = PassportJwt
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AUTH_SECRET,
  // issuer: 'accounts.examplesoft.com',
  // audience: 'yoursite.net',
}
passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
  User.findById(jwtPayload._id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
}));

// ROUTING
app.use(express.static(path.join(__dirname, '/client/build/')))
app.use('/api', router)
if (process.env.NODE_ENV !== 'development') {
  app.get('*', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '/client/build/index.html'))
  })
}
