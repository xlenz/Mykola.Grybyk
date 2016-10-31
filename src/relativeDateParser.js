import moment from 'moment'
import messages from './messages'

let limitations
const minTimestamp = 1378395540

function parseRelativeDate (str) {
  // invalid or no value
  if (str == null || str.trim() === '') {
    console.error(messages.formatMessage)
    return null
  }

  // getting months, days, hours, minutes
  let relativeDate = {
    months: getValueFromRelativeDate(str, /(\s|^)\d+\s+months{0,1}(?!\w)/g),
    days: getValueFromRelativeDate(str, /(\s|^)\d+\s+days{0,1}(?!\w)/g),
    hours: getValueFromRelativeDate(str, /(\s|^)\d+\s+hours{0,1}(?!\w)/g),
    minutes: getValueFromRelativeDate(str, /(\s|^)\d+\s+minutes{0,1}(?!\w)/g)
  }

  // ensure there are no more than one match of month/day/hour/minute
  if (!assertTooMuchMatches(relativeDate)) return null

  // ensure at least one of month/day/hour/minute passed
  if (!assertNoMatches(relativeDate)) {
    console.error('There should be at least one value for at least one of month/day/hour/minute')
    return null
  }

  // ensure value is adequate
  if (!assertLimitation(relativeDate)) {
    console.error('Invalid value provided for at least one of month/day/hour/minute')
    return null
  }

  // get unit time
  let unixTime = moment()
    .subtract(relativeDate.months.value, 'month')
    .subtract(relativeDate.days.value, 'day')
    .subtract(relativeDate.hours.value, 'hour')
    .subtract(relativeDate.minutes.value, 'minute')
    .unix()

  // ensure unit time is in proper range
  if (unixTime < minTimestamp) {
    console.error(messages.startTimeMessage)
    return null
  }
  if (unixTime > moment().unix() - 60) {
    console.error(messages.endTimeMessage)
    return null
  }

  return unixTime
}

function assertTooMuchMatches (relativeDate) {
  let success = true
  Object.keys(relativeDate).some(key => {
    if (relativeDate[key].matches > 1) {
      console.error('There should not be more than one ' + key)
      success = false
      return true
    }
  })
  return success
}

function assertNoMatches (relativeDate) {
  let noMatches = 0
  Object.keys(relativeDate).forEach(key => {
    if (relativeDate[key].matches === 0) noMatches++
  })
  return Object.keys(relativeDate).length !== noMatches
}

function assertLimitation (relativeDate) {
  // calculate approximate max values
  calcLimitations()

  let success = true
  Object.keys(relativeDate).some(key => {
    let numStr = relativeDate[key].value
    if (numStr.length > 10) {
      success = false
      return true
    }
    let value = parseInt(numStr)
    if (isNaN(value) || value < 0 || value > limitations[key]) {
      success = false
      return true
    }
  })
  return success
}

function getValueFromRelativeDate (str, regex) {
  let matches = str.match(regex)
  let result = { matches: 0, value: 0 }
  if (matches !== null) {
    result.matches = matches.length
    if (matches.length === 1) {
      result.value = matches[0].match(/\d+/)[0]
    }
  }

  return result
}

/**
 * calcuate very very approximate max values for months/days/hours/minutes
 */
function calcLimitations () {
  if (limitations !== undefined) return
  limitations = {}

  // year from 2013 to now
  // adding +1 because I don't want to handle months and so on
  let multiplier = moment().year() - 2013 + 1
  limitations.months = multiplier * 12
  limitations.days = limitations.months * 31
  limitations.hours = limitations.days * 24
  limitations.minutes = limitations.hours * 60
}

exports.parseRelativeDate = parseRelativeDate
