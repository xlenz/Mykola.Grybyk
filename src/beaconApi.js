import libxmljs from 'libxmljs'
import request from 'request'
const apiUrl = 'https://beacon.nist.gov/rest/record'
const xsdUrl = 'https://beacon.nist.gov/record/0.1/beacon-0.1.0.xsd'

exports.getLast = (xsdDoc) => new Promise((resolve, reject) => request.get({ url: `${apiUrl}/last` },
  (error, response, body) => {
    if (error) throw error

    // resolve promise with parsed/validated xml. Same for api calls
    resolve(validateXml(parseXml(body), xsdDoc))
  }))

exports.getByTimestamp = (xsdDoc, timestamp) => new Promise((resolve, reject) => request.get({ url: `${apiUrl}/${timestamp}` },
  (error, response, body) => {
    if (error) throw error
    resolve(validateXml(parseXml(body), xsdDoc))
  }))

exports.getXsd = () => new Promise((resolve, reject) => request.get({ url: xsdUrl },
  (error, response, body) => {
    if (error) throw error
    resolve(parseXml(body))
  }))

function validateXml(xmlDoc, xsdDoc) {
  if (!xmlDoc.validate(xsdDoc)) {
    throw xmlDoc.validationErrors
  }
  return xmlDoc
}

function parseXml(xmlStr) {
  try {
    return libxmljs.parseXmlString(xmlStr)
  } catch (error) {
    console.error('Unable to parse xml, probably beacon site is down or there are some network issues.')
    throw error
  }
}
