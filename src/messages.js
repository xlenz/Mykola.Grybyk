const fromToMessage = '--from and --to are used toghether only'
const formatMessage = 'format should be like "X month(s) X day(s) X hour(s) X minutes(s)"'
const startTimeMessage = `start time should be bigger than 09/05/2013 11:39 a.m.`
const endTimeMessage = `end time should be less than current time - 1 minute`

exports.helpMessage = `
To get count of chars in the last beacon outputValue - do not pass any args.
To get it summarized for two dates use --from and --to toghether:
--from <relative time>
--to <relative time>
\tNOTE: ${fromToMessage}
\t<relative time> ${formatMessage}
\t${startTimeMessage}
\t${endTimeMessage}`

exports.fromToMessage = fromToMessage
exports.formatMessage = formatMessage
exports.startTimeMessage = startTimeMessage
exports.endTimeMessage = endTimeMessage
