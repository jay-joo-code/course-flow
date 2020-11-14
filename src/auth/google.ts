import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import User from '../models/User'
import dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/../../.env' });

passport.use(new GoogleStrategy({
    clientID: process.env.ID_GOOGLE,
    clientSecret: process.env.SECRET_GOOGLE,
    callbackURL: "http://localhost:5000/api/public/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ providerId: profile.id })

      if (user) {
        // update providerData
        await User.findByIdAndUpdate(user._id, { providerData: profile }, { new: true })

        return done(null, user)
      } else {
        const userData = { authProvider: 'google', providerId: profile.id, providerData: profile }
        const newUser = await new User(userData).save()
        return done(null, newUser)
      }
    } catch (error) {
      return done(error, null)
    }
  }
));

export default passport
