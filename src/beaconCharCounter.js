exports.count = (xmlDoc, previousResult = {}) => {
  // get outputValue
  let outputValue = xmlDoc.get('//xmlns:outputValue', { xmlns: 'http://beacon.nist.gov/record/0.1/' }).text()

  // assert ouputValue
  assertOutputValue(outputValue)

  let result = Object.assign({}, previousResult)
  let arr = outputValue.match(/.{1}/g)

  while (arr.length > 0) {
    let char = arr[0]
    let count = result[char] || 0

    // count and remove all occurrences of char
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === char) {
        count++
        arr.splice(i, 1)
        i--
      }
    }

    result[char] = count
  }

  return result
}

function assertOutputValue (outputValue) {
  if (outputValue == null) throw new Error('Unable to get outputValue in response from beacon server')
  if (outputValue.length !== 128) throw new Error('Invalid/unsupported outputValue provided by beacon server')
}
