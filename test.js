const test = require('tape')
const loadGoogleMapsAPI = require('./')

test('loads the API', function(t) {
  t.plan(1)
  loadGoogleMapsAPI().then(t.ok, t.fail)
})
