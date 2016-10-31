import test from 'tape'
import libxmljs from 'libxmljs'
import beaconCharCounter from '../../src/beaconCharCounter'

var xmlTemplate = '<record xmlns="http://beacon.nist.gov/record/0.1/"><outputValue>{{template}}</outputValue></record>'
var validBeaconExample = '18B02E561BF708520C87B36D163B26FB11B296AA7F5AB36363A32F587ED58B8B06467233A16803183BB8378AF7233922DCDAA42653ECF44C5BD2263657D8CF5C'


test('beaconCharCounter: is function', (t) => {
  t.equal(typeof beaconCharCounter.count, 'function')
  t.end()
})

test('beaconCharCounter: valid and sorted outputValue', (t) => {
  let xmlDocValid = libxmljs.parseXmlString(xmlTemplate.replace('{{template}}', validBeaconExample))
  t.same(beaconCharCounter.count(xmlDocValid), { 0: 5, 1: 7, 2: 12, 3: 15, 4: 4, 5: 9, 6: 13, 7: 8, 8: 11, 9: 2, A: 8, B: 12, C: 6, D: 6, E: 3, F: 7 })
  t.end()
})

test('beaconCharCounter: empty outputValue', (t) => {
  let xmlDocEmpty = libxmljs.parseXmlString(xmlTemplate.replace('{{template}}', ''))
  t.throws(() => beaconCharCounter.count(xmlDocEmpty), Error)
  t.end()
})

test('beaconCharCounter: invalid length outputValue', (t) => {
  let xmlDocLength = libxmljs.parseXmlString(xmlTemplate.replace('{{template}}', '8520C87B36D163B26FB11'))
  t.throws(() => beaconCharCounter.count(xmlDocLength), Error)
  t.end()
})

test('beaconCharCounter: missing outputValue', (t) => {
  let xmlDocNoOutputValue = libxmljs.parseXmlString('<record xmlns="http://beacon.nist.gov/record/0.1/"></record>')
  t.throws(() => beaconCharCounter.count(xmlDocNoOutputValue), Error)
  t.end()
})
