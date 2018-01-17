require('dotenv').config()
import * as supertest from 'supertest'
import * as mongoose from 'mongoose'
import { should } from 'chai'
import * as glob from 'glob'
import bootstrap from '../src/bin/bootstrap'
import { server } from '../src/bin/server'
import { getServer } from '../src/bin/app'
import { cleanDb } from '../src/utils'
import { ObjectId } from 'bson'

const request = supertest.agent(server.get().listen())
const routes: string[] = glob.sync(`${__dirname}/routes/*.test.ts`)
const excludeCollections: string[] = []


bootstrap().then(() => { run() })

should()
describe('Routes', () => {
  before(async () => {
    Object.keys(mongoose.connection.collections).forEach((name) => {
      mongoose.connection.collections[name].remove(() => { })
    })
  })
  routes.map(route => require(route).default(request))
  after(async () => {
  })
})
