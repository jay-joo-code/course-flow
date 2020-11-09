import express from 'express'
import User from '../../models/User'
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

const runLogs = async () => {
  try {
    const users = await User.find()
    console.log('users', users)
  } catch (e) {
    console.log('e', e)
  }
}

// runLogs()

authRouter.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const newUser = await new User(req.body).save()
      const token = jwt.sign({ _id: newUser._id }, process.env.AUTH_SECRET);
      res.send({ ...newUser.toObject(), token })
    } else {
      res.status(500).send('User already exists')
    }
  } catch (e) {
    res.status(500).send(e)
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (user.validatePassword(password)) {
        const token = jwt.sign({ _id: user._id }, process.env.AUTH_SECRET);
        res.send({ ...user.toObject(), token })
      } else {
        throw new Error('Incorrect password')
      }
    } else {
      throw new Error('User does not exist')
    } 
  } catch (e) {
    res.status(500).send(e)
  }
});

export default authRouter
