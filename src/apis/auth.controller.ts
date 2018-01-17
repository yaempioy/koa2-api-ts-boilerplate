import * as Koa from 'koa'
import * as passport from 'koa-passport'
import config from '../config'
import { User } from '../models'
import { contextInterface as IContext } from '../interface'

export async function authUser(ctx: IContext, next: () => Promise<void>) {
  return passport.authenticate('local', (err, user) => {
    if (!user) {
      ctx.throw(401)
    }

    const token = user.generateToken()

    const response = user.toJSON()

    delete response.password

    ctx.body = {
      token,
      user: response
    }
  })(ctx, next)
}
