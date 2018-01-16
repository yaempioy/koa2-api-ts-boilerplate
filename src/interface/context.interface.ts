import * as Koa from 'koa'
import paramsInterface from './params.interface'
import queryInterface from './query.interface'
import stateInterface from './state.interface'

export default interface ContextInterface <Params= paramsInterface ,Query= queryInterface> extends Koa.Context{
  query: Query
  params: Params
  state: stateInterface
}

