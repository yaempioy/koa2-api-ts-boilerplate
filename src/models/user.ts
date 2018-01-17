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

export interface IUserDocument extends Mongoose.Document {
  username: string
  email: string
  password: string,
  type: userType,
}

export interface IUser extends IUserDocument {
  generateToken(): string
  validatePassword(password: string): boolean
}

export const userSchema: Mongoose.Schema = new Mongoose.Schema({
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
    default: userType.USER,
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

userSchema.pre('validate', function preSave(next: () => void) {
  if (!this.isModified('password')) {
    return next()
  }
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return reject(err) }
      resolve(salt)
    })
  }).then((salt) => {
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
      if (err) { throw err }
      this.password = hash
      next()
    })
  }).catch(err => next())
})

userSchema.methods.validatePassword = function validatePassword(password: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) { return reject(err) }
      resolve(isMatch)
    })
  })
}

userSchema.methods.generateToken = () => (jwt.sign({ id: this.id }, token))

export default Mongoose.model<IUser>('user', userSchema)
