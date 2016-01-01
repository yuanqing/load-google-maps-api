import test from 'tape';
import loadGoogleMapsAPI from '../';

test('loads the script', (t) => {
  t.plan(2);
  loadGoogleMapsAPI().then((googleMaps) => {
    t.ok(googleMaps);
    t.ok(window.google && window.google.maps);
  });
});
