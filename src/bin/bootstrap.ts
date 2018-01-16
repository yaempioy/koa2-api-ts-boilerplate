import * as server from './server'

const BOOTSTRAP_PATH_EXECUTE = { INIT: [
  './server',
  // '../variable',
] } as {[key: string]: string[]}

export default async function () {
  const promises = BOOTSTRAP_PATH_EXECUTE['INIT'].map((path:string) => require(path).init())
  await Promise.all(promises)
}

export function getLoadedServer() {
  return server.server
}
