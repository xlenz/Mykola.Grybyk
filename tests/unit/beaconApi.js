var path = require('path')
var tape = require('tape')
var tapeNock = require('tape-nock')
import api from '../../src/beaconApi'

var test = tapeNock(tape, {
  fixtures: path.join(__dirname, 'fixtures'),
  mode: 'dryrun' // record
})

let xsdDoc

test('beaconApi: getXsd', function (t) {
  (async () => {
    t.equal(typeof api.getXsd, 'function')
    xsdDoc = await api.getXsd()
    t.assert(xsdDoc.childNodes().length > 0)
    t.end()
  })()
})

test('beaconApi: getLast', function (t) {
  (async () => {
    t.equal(typeof api.getLast, 'function')
    let outputValueNode = getOutputValue(await api.getLast(xsdDoc))
    t.assert(outputValueNode)
    t.assert(outputValueNode.text().length === 128)
    t.end()
  })()
})

test('beaconApi: getByTimestamp', function (t) {
  (async () => {
    t.equal(typeof api.getByTimestamp, 'function')
    let outputValueNode = getOutputValue(await api.getByTimestamp(xsdDoc, '1379395540'))
    t.assert(outputValueNode)
    t.assert(outputValueNode.text().length === 128)
    t.end()
  })()
})

function getOutputValue (xmlDoc) {
  return xmlDoc.get('//xmlns:outputValue', { xmlns: 'http://beacon.nist.gov/record/0.1/' })
}
