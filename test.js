const test = require('tape')
const loadGoogleMapsAPI = require('./')

test('resolves the promise to the `googleMaps` object', function (t) {
  t.plan(1)
  loadGoogleMapsAPI().then(function (googleMaps) {
    t.true(typeof googleMaps.Map === 'function')
  }, t.fail)
})
