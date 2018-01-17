require('dotenv').config()
import * as koa from 'koa'
import * as mongoose from 'mongoose'
import * as keygrip from 'keygrip'
import config from '../config'
import { connectDatabase } from '../database'
import middleware from '../middleware'

const app = new koa()

/** Execute initial runtime */
export async function init() {
  try {
    await connectDatabase()
  } catch (error) {
    console.error('Unable to connect to database')
    throw error
  }
  /** require passport config */
  require('../config/passport')

  app.keys = new keygrip(config.appConfig.appKeys, config.appConfig.hmacAlgorithm, config.appConfig.encoding)
  app.use(middleware())
  // Proxy config
  // app.proxy = true
  const modules = require('../router')
  modules(app)
  return app
}



export const server = {
  get() { return app },
  start() { return app.listen(process.env.PORT) },
}
