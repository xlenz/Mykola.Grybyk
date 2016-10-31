import argsHandler from './src/argsHandler'
import api from './src/beaconApi'
import beaconCharCounter from './src/beaconCharCounter'

(async () => {
  let result = {}
  let beacons = []

  // parse command line arguments
  let action = argsHandler.getAction(argsHandler.getArguments())

  // get xsd schema
  let xsdDoc = await api.getXsd()

  // get beacon
  if (action.type === 'getLast') {
    console.log('Last beacon outputValue chars count:')
    beacons.push(await api.getLast(xsdDoc))
  } else if (action.type === 'getByTimestamp') {
    console.log('Summarized beacon outputValue chars count of two dates:')
    beacons.push(await api.getByTimestamp(xsdDoc, action.params.from))
    beacons.push(await api.getByTimestamp(xsdDoc, action.params.to))
  }

  // count beacon chars
  beacons.forEach(value => { result = beaconCharCounter.count(value, result) })

  // print result
  Object.keys(result).forEach(key => {
    console.log(`${key},${result[key]}`)
  })
})()
