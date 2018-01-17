import * as convert from 'koa-convert'
import * as compose from 'koa-compose'
// import * as helmet from 'koa-helmet'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as passport from 'koa-passport'


export default function middleware() {
  return compose([
    convert(bodyParser()),
    convert(logger()),
    passport.initialize(),
    passport.session()
  ])
}
