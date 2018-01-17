import * as Koa from 'koa'
import config from '../config'
import { User } from '../models'

export async function createUser(ctx: Koa.Context) {
  const user = new User(ctx.request.body.user)
  try {
    await user.save()
  } catch (error) {
    console.log(error.message)
    ctx.throw(422, error.message)
  }
  const token = user.generateToken()
  const response = user.toJSON()

  ctx.body = {
    token,
    user: response,
  }
}
