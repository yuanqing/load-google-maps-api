const API_URL = 'https://maps.googleapis.com/maps/api/js'
const CALLBACK_NAME = '__googleMapsApiOnLoadCallback'
const GOOGLE_SCRIPT_ID = 'google-map-script'

const optionsKeys = ['channel', 'client', 'key', 'language', 'region', 'v']

let promise = null
let preOptions = null

function isOptEq (preOptions, options) {
  optionsKeys.forEach(function (key) {
    if (options[key] !== preOptions[key]) {
      return false
    }
  })
  return preOptions.libraries.join(',') === options.libraries.join(',')
}

module.exports = function (options = {}) {
  if (isOptEq(preOptions, options) && promise !== null) {
    promise = null
    preOptions = options
    const child = document.getElementById(GOOGLE_SCRIPT_ID)
    if (child) {
      child.parentNode.removeChild(child)
      delete window.google.maps
    }
  }
  promise =
    promise ||
    new Promise(function (resolve, reject) {
      // Reject the promise after a timeout
      const timeoutId = setTimeout(function () {
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
      const scriptElement = document.createElement('script')
      const params = [`callback=${CALLBACK_NAME}`]
      optionsKeys.forEach(function (key) {
        if (options[key]) {
          params.push(`${key}=${options[key]}`)
        }
      })
      if (options.libraries && options.libraries.length) {
        params.push(`libraries=${options.libraries.join(',')}`)
      }
      scriptElement.src = `${options.apiUrl || API_URL}?${params.join('&')}`
      scriptElement.id = GOOGLE_SCRIPT_ID

      // Insert the `script` tag
      document.body.appendChild(scriptElement)
    })
  return promise
}
