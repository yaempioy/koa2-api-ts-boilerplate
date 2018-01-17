import * as KoaRouter from 'koa-router'
import { middlewareInterface } from '../interface'
import * as controller from './auth.controller'

export const baseUrl = '/auth'
export const baseUrlMiddleware: middlewareInterface[] = []

export default [
  {
    name: 'authentication', method: 'post', route: '/login',
    middlewares: [], handler: controller.authUser, cors: true,
  },
]
