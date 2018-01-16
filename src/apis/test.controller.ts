import * as Koa from 'koa'
import config from '../config'

export async function getApp(ctx: Koa.Context) {
  ctx.body = { message: `Hello :: ${config.appConfig.env}` }
}
