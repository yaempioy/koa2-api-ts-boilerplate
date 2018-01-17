import * as KoaRouter from 'koa-router'
import { middlewareInterface } from '../interface'
import * as controller from './user.controller'

export const baseUrl = '/user'
export const baseUrlMiddleware: middlewareInterface[] = []

export default [
  {
    name: 'createUser', method: 'post', route: '/register',
    middlewares: [], handler: controller.createUser, cors: true,
  },
]
