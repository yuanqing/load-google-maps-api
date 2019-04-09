const test = require('tape')
const loadGoogleMapsApi = require('./')

test('resolves the promise to the `googleMaps` object', function (t) {
  t.plan(1)
  loadGoogleMapsApi().then(function (googleMaps) {
    t.true(typeof googleMaps.Map === 'function')
  }, t.fail)
})

test('resolves the promise to the `googleMaps` object, with support for duplicate calls', function (t) {
  t.plan(2)
  const promises = [loadGoogleMapsApi(), loadGoogleMapsApi()]
  Promise.all(promises).then(function (values) {
    t.equal(values[0], values[1])
    t.true(typeof values[0].Map === 'function')
  }, t.fail)
})
