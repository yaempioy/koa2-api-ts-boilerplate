import contextInterface from './context.interface'

type MiddlewareFuncType<Context= contextInterface> = (ctx:Context,next:() => Promise<void>) => Promise<void>
export default MiddlewareFuncType
