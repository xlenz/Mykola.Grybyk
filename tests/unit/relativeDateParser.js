import test from 'tape'
import relativeDateParser from '../../src/relativeDateParser'
import moment from 'moment'

test('relativeDateParser: no (s), with (s)', (t) => {
  // there may be a time shift, so I have to handle it somehow.
  // seconds should be more than enough. Same for other tests.
  t.assert(moment().subtract(1, 'month').subtract(1, 'day').subtract(1, 'hour').subtract(1, 'minute').unix() -
    relativeDateParser.parseRelativeDate('1 month 1 day 1 hour 1 minute') < 2)

  t.assert(moment().subtract(2, 'month').subtract(2, 'day').subtract(2, 'hour').subtract(2, 'minute').unix() -
    relativeDateParser.parseRelativeDate('2 months 2 days 2 hours 2 minutes ago') < 2)

  t.end()
})

test('relativeDateParser: combinations', (t) => {
  t.assert(moment().subtract(11, 'month').unix() -
    relativeDateParser.parseRelativeDate('11 months') < 2)

  t.assert(moment().subtract(11, 'day').unix() -
    relativeDateParser.parseRelativeDate('11 days') < 2)

  t.assert(moment().subtract(11, 'hour').unix() -
    relativeDateParser.parseRelativeDate('11 hour') < 2)

  t.assert(moment().subtract(11, 'minute').unix() -
    relativeDateParser.parseRelativeDate('11 minutes') < 2)

  t.assert(moment().subtract(2, 'day').subtract(2, 'hour').unix() -
    relativeDateParser.parseRelativeDate('2 days 2 hours') < 2)

  t.assert(moment().subtract(2, 'month').subtract(2, 'hour').subtract(2, 'minute').unix() -
    relativeDateParser.parseRelativeDate('2 months 2 hours 2 minutes') < 2)

  t.end()
})

test('relativeDateParser: vice versa', (t) => {
  t.assert(moment().subtract(2, 'month').subtract(2, 'day').subtract(2, 'hour').subtract(2, 'minute').unix() -
    relativeDateParser.parseRelativeDate('ago 2 minutes 2 hours 2 days 2 months') < 2)

  t.end()
})

test('relativeDateParser: whitespaces', (t) => {
  t.assert(moment().subtract(1, 'month').subtract(1, 'day').subtract(1, 'hour').subtract(1, 'minute').unix() -
    relativeDateParser.parseRelativeDate('  1   month  1    day  1   hour  1       minute  ago ') < 2)

  t.end()
})

test('relativeDateParser: negative', (t) => {
  t.equal(relativeDateParser.parseRelativeDate(''), null)
  t.equal(relativeDateParser.parseRelativeDate('bla'), null)
  t.equal(relativeDateParser.parseRelativeDate('99999999999 month'), null)
  t.equal(relativeDateParser.parseRelativeDate('2month'), null)
  t.equal(relativeDateParser.parseRelativeDate('1 month 2 months'), null)
  t.equal(relativeDateParser.parseRelativeDate('bla-1 month'), null)

  let multiplier = moment().year() + 2
  let months = multiplier * 12
  let days = months * 31
  let hours = days * 24
  let minutes = hours * 60
  t.equal(relativeDateParser.parseRelativeDate(`${months} months 1 day 1 hour 1 minute`), null)
  t.equal(relativeDateParser.parseRelativeDate(`1 months ${days} days 1 hour 1 minute`), null)
  t.equal(relativeDateParser.parseRelativeDate(`1 months 1 day ${hours} hours 1 minute`), null)
  t.equal(relativeDateParser.parseRelativeDate(`1 months 1 day 1 hour ${minutes} minutes`), null)
  t.end()
})
