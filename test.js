const test = require('tape')
const loadGoogleMapsAPI = require('./')

test('resolves the promise to the `googleMaps` object with support for duplicate calls', function (t) {
  t.plan(2)

  const promises = [loadGoogleMapsAPI(), loadGoogleMapsAPI()]

  Promise.all(promises).then(function (values) {
    t.equal(values[0], values[1])
    t.true(typeof values[0].Map === 'function')
  }, t.fail)
})
