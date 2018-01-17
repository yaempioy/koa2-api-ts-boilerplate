import * as passport from 'koa-passport'
import { Strategy } from 'passport-local'
import { User } from '../models'
import { IUser } from '../models/user'
import { isMaster } from 'cluster';

passport.serializeUser((user: IUser, done) => {
  console.log('serializeUser !!')
  done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
  console.log('deserializeUser !!')
  try {
    const user = await User.findById(id, '-password')
    // done(null, user.id)
  } catch (err) {
    done(err)
  }
})
passport.use('local', new Strategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username })
    if (!user) { return done(null, false) }

    try {
      const isMatch = await user.validatePassword(password)
      if (!isMatch) {
        return done(null, false)
      }
      done(null, user)
    } catch (err) {
      done(err)
    }

  } catch (err) {
    return done(err)
  }
}))
