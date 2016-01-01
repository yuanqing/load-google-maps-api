'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$libraries = _ref.libraries;
  var libraries = _ref$libraries === undefined ? [] : _ref$libraries;
  var key = _ref.key;
  var client = _ref.client;
  var v = _ref.v;
  var _ref$timeout = _ref.timeout;
  var timeout = _ref$timeout === undefined ? 10000 : _ref$timeout;

  var callbackName = '__googleMapsApiOnLoadCallback';

  return new Promise(function (resolve, reject) {

    // Exit if not running inside a browser.
    if (typeof window === 'undefined') {
      return reject(new Error('Can only load the Google Maps API in the browser'));
    }

    // Prepare the `script` tag to be inserted into the page.
    var scriptElement = document.createElement('script');
    var params = ['callback=' + callbackName];
    libraries = [].concat(libraries); // Ensure that `libaries` is an array
    if (libraries.length) params.push('libraries=' + libraries.join(','));
    if (key) params.push('key=' + key);
    if (client) params.push('client=' + client);
    if (v) params.push('v=' + v);
    scriptElement.src = 'https://maps.googleapis.com/maps/api/js?' + params.join('&');

    // Timeout if necessary.
    var timeoutId = null;
    if (timeout) {
      timeoutId = setTimeout(function () {
        window[callbackName] = function () {}; // Set the on load callback to a no-op.
        reject(new Error('Could not load the Google Maps API'));
      }, timeout);
    }

    // Hook up the on load callback.
    window[callbackName] = function () {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      resolve(window.google.maps);
      delete window[callbackName];
    };

    // Insert the `script` tag.
    document.body.appendChild(scriptElement);
  });
};