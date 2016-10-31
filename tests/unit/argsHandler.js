import test from 'tape'
import argsHandler from '../../src/argsHandler'

test('argsHandler: getAction is a function', (t) => {
  t.equal(typeof argsHandler.getAction, 'function')
  t.end()
})

test('argsHandler: getLast', (t) => {
  t.same(argsHandler.getAction({}), { type: 'getLast' })
  t.same(argsHandler.getAction(), { type: 'getLast' })
  t.end()
})

test('argsHandler: --from ... --to', (t) => {
  let action = argsHandler.getAction({ 'from': '3 months 1 day 1 hour ago', 'to': '1 month 1 hour ago' })
  t.assert(action.type === 'getByTimestamp')
  t.assert(action.params !== undefined)
  t.assert(action.params.from.length === 10)
  t.assert(action.params.to.length === 10)
  t.end()
})
