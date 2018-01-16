interface IDBConf {
  uri:string
}
const databaseConfig = {
  development: {
    uri: process.env.MONGODB_URI,
  },
  production: {
    uri: process.env.MONGODB_URI,
  },
  test: {
    uri: process.env.TEST_MONGODB_URI,
  },
} as { [index:string]: IDBConf}

export default databaseConfig
