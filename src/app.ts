import router from './router'
import path from 'path'
import express, { Request, Response, Router, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from "dotenv"

dotenv.config({ path: __dirname + '/../.env' });
const app = express()
const isProduction = process.env.NODE_ENV === 'production'
const origin = { origin: isProduction ? false : '*' }

app.set('trust proxy', 1)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors(origin))
app.use(helmet())
app.use(compression())

app.use(express.static(path.join(__dirname, '/client/build/')))
app.use('/api', router)
if (process.env.NODE_ENV !== 'development') {
  app.get('*', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '/client/build/index.html'))
  })
}

app.listen(process.env.PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on port ${process.env.PORT}`)
})
