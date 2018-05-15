var CALLBACK_NAME = '__googleMapsApiOnLoadCallback'

var OPTIONS_KEYS = ['channel', 'client', 'key', 'language', 'region', 'v']

var promise = null

module.exports = function (options) {
  options = options || {}

  if (!promise) {
    promise = new Promise(function (resolve, reject) {
      // Reject the promise after a timeout
      var timeoutId = setTimeout(function () {
        window[CALLBACK_NAME] = function () {} // Set the on load callback to a no-op
        reject(new Error('Could not load the Google Maps API'))
      }, options.timeout || 10000)

      // Hook up the on load callback
      window[CALLBACK_NAME] = function () {
        if (timeoutId !== null) {
          clearTimeout(timeoutId)
        }
        resolve(window.google.maps)
        delete window[CALLBACK_NAME]
      }

      // Prepare the `script` tag to be inserted into the page
      var scriptElement = document.createElement('script')
      var params = ['callback=' + CALLBACK_NAME]
      OPTIONS_KEYS.forEach(function (key) {
        if (options[key]) {
          params.push(key + '=' + options[key])
        }
      })
      if (options.libraries && options.libraries.length) {
        params.push('libraries=' + options.libraries.join(','))
      }
      scriptElement.src =
        'https://maps.googleapis.com/maps/api/js?' + params.join('&')

      // Insert the `script` tag
      document.body.appendChild(scriptElement)
    })
  }

  return promise
}
