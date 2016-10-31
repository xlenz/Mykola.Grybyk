import commandLineArgs from 'command-line-args'
import relativeDateParser from './relativeDateParser'
import messages from './messages'

const optionDefinitions = [
  { name: 'help', alias: '?' },
  { name: 'from', type: String, multiple: false },
  { name: 'to', type: String, multiple: false }
]

exports.getArguments = () => {
  try {
    return commandLineArgs(optionDefinitions)
  } catch (error) {
    console.log('Invalid console arguments provided:', error.name)
    process.exit()
  }
}

exports.getAction = (options = {}) => {
  // help
  if (options.help) {
    console.log(messages.helpMessage)
    process.exit()
  }

  // getLast
  if (options.from === undefined && options.to === undefined) return { type: 'getLast' }

  // --from and --to should be used toghether
  if (options.from === undefined || options.to === undefined) {
    console.error(messages.fromToMessage)
    process.exit()
  }

  // try get --from and --to values
  let from = relativeDateParser.parseRelativeDate(options.from)
  let to = relativeDateParser.parseRelativeDate(options.to)
  if (!from || !to) process.exit()

  // getByTimestamp
  return { type: 'getByTimestamp', params: { from: from.toString(), to: to.toString() } }
}
