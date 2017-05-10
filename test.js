const test = require('tape')
const loadGoogleMapsAPI = require('./')

test('loads the API', function(t) {
  t.plan(2)
  loadGoogleMapsAPI().then(function(googleMaps) {
    t.ok(googleMaps)
    t.ok(window.google && window.google.maps)
  })
})
