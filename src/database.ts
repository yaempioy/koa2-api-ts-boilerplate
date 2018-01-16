import * as mongoose from 'mongoose'
import config from './config'

export function connectDatabase() {
  const env = process.env.NODE_ENV as 'development' | 'test' | 'production'
  const db = config.databaseConfig[env]
  console.log('NODE_ENV::', process.env.NODE_ENV)
  console.log('DB CONF::', db)
  mongoose.PromiseProvider.set(global.Promise)
  mongoose.connect(db.uri, { useMongoClient: true })
  mongoose.connection.once('open', () => {
    console.log('We are connected to', mongoose.connection.db.databaseName)
  })
  return mongoose.connection
  // mongoose.connection
  //   .on('error', (error) => { throw error })
  //   .on('close', () => console.log('Database connection closed.'))
  //   .once('open', () => { return mongoose.connection })
}
