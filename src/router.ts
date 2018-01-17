import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as KoaCors from 'kcors'
import * as glob from 'glob'

const koaCors = KoaCors({ allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'OPTIONS'] })
// const cors = require('@koa/cors')
type RouteConfig = {
  default: {
    name: string,
    method: 'get' | 'post',
    route: string,
    middlewares: any[],
    handler: any,
    cors: boolean,
  }[],
  baseUrl: string,
  baseUrlMiddleware: KoaRouter.IMiddleware[],
}

exports = module.exports = function initModules(app: Koa) {
  try {
    const matches = glob.sync(`${__dirname}/apis/*`, {
      ignore: [
        '**/*.map',
        '**/*.controller.ts',
        '**/*.controller.js'],
    })
    matches.forEach((mod) => {
      const router = require(`${mod}`) as RouteConfig
      const routes = router.default
      const baseUrl = router.baseUrl
      const baseUrlMiddleware = router.baseUrlMiddleware || []
      const baseRouter = new KoaRouter()
      const subRouter = new KoaRouter()
      if (router.default == null || baseRouter === null) {
        return console.warn(`skip: ${mod} because it don't have any working exported route`)
      }
      routes.forEach((config) => {
        const { name, method, route, middlewares, handler, cors } = config
        middlewares.push(async (ctx: Koa.Context, next: Function) => {
          await next()
        })
        /** Cross-Origin Resource Sharing */
        if (cors) {
          middlewares.push(koaCors)
          subRouter['options'](route, ...middlewares, handler)
        }
        subRouter[method](route, ...middlewares, handler)
      })
      baseRouter.use(`/api${baseUrl}`, ...baseUrlMiddleware, subRouter.routes(), subRouter.allowedMethods())
      app.use(baseRouter.routes())
    })
  } catch (error) {
    throw error
  }
}
