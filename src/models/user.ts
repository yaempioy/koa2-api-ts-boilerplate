import * as bcrypt from 'bcrypt'
import * as Mongoose from 'mongoose'
import * as jwt from 'jsonwebtoken'
import config from '../config'

const saltRounds: number = 10
const token: string = config.appConfig.jwtToken

export const enum userType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser extends Mongoose.Document {
  username: string
  email: string
  password: string,
  type: userType,
}

export const userSchema = new Mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
})

userSchema.pre('save', function preSave(next: () => void) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return reject(err) }
      resolve(salt)
    })
  }).then((salt) => {
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
      if (err) { throw err }
      user.password = hash
      next()
    })
  }).catch(err => next())
})

userSchema.methods.validatePassword = function validatePassword(password: string) {
  const user = this

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) { return reject(err) }

      resolve(isMatch)
    })
  })
}

userSchema.methods.generateToken = function generateToken() {
  const user = this
  return jwt.sign({ id: user.id }, token)
}

export default Mongoose.model<IUser>('User', userSchema)
