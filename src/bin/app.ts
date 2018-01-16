import bootstrap, { getLoadedServer } from './bootstrap'

export function getServer(): any {
  return bootstrap().then(() => getLoadedServer().get())
}

export function start() {
  return bootstrap().then(() => getLoadedServer().start())
}
