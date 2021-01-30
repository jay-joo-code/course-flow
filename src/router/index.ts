import express from 'express'
import { fetchClasses, fetchSubjects, fetchAllClasses } from '../util/roster'
import privateRouter from './privateRouter'
import publicRouter from './publicRouter'

const router = express.Router()

router.use('/public', publicRouter)
router.use('/private', privateRouter)

router.get('/ping', async (req, res) => {
  res.send('pong')
})

const test = async () => {
  const subjects = await fetchSubjects('SP21')
  const allClasses = []
  console.log('subjects.length', subjects.length)
  subjects.forEach(async ({ value }) => {
    // const classes = await fetchAllClasses(value)
    // allClasses.concat(classes)
  })
  console.log('allClasses.length', allClasses.length)
  // const classes = await fetchClasses('FA20', 'CS')
  // console.log('classes', classes.length)
  // classes.forEach(({ catalogNbr, ...rest }) => {
  //   if (catalogNbr === '1110') {
  //     console.log('{...rest}', { ...rest })
  //   }
  // })
  // const results = await fetchAllClasses('INFO')
  // console.log('results.length', results.length)
}

test()

export default router
