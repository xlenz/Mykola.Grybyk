var test = require('tape')
var spawn = require('tape-spawn')

test('main: last', function (t) {
  var st = spawn(t, 'npm start')
  st.stdout.match(/Last beacon/)
  st.stdout.match(/.,\d/, 'char,number')
  st.succeeds()
  st.end()
})

test('main: valid --from ... --to', function (t) {
  var st = spawn(t, 'npm start -- --from "3 months 1 day 1 hour ago" --to "1 month 1 hour ago"')
  st.stdout.match(/Summarized beacon/)
  st.stdout.match(/.,\d/, 'char,number')
  st.succeeds()
  st.end()
})

test('main: --from only', function (t) {
  var st = spawn(t, 'npm start -- --from')
  st.stderr.match(/toghether/)
  st.succeeds()
  st.end()
})

test('main: --to only', function (t) {
  var st = spawn(t, 'npm start -- --to ""')
  st.stderr.match(/toghether/)
  st.succeeds()
  st.end()
})

test('main: invalid --from ... --to', function (t) {
  var st = spawn(t, 'npm start -- --from "77777777777 months 1 day 1 hour ago" --to "bla"')
  st.stderr.match(/Invalid/)
  st.succeeds()
  st.end()
})

test('main: --help', function (t) {
  var st = spawn(t, 'npm start -- --help')
  st.stdout.match(/--from/)
  st.stdout.match(/--to/)
  st.succeeds()
  st.end()
})
