require('dotenv').config()
require('./bin/app').start().then((server: any) => {
  return server.setTimeout(600000)
})
.catch((error: any) => {
  process.exit(1)
})
