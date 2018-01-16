import * as KoaRouter from 'koa-router'
import { middlewareInterface } from '../interface'
import * as controller from './test.controller'

export const baseUrl = '/api'
export const baseUrlMiddleware: middlewareInterface[] = []

export default [
  { name: 'helloWorld', method: 'get', route: '/hello', middlewares: [], handler: controller.getApp, cors: true },
]
