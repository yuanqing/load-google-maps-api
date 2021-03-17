const
  API_URL = 'https://maps.googleapis.com/maps/api/js',
  CALLBACK_NAME = '__googleMapsApiOnLoadCallback',
  optionalOptions = ['channel', 'client', 'key', 'language', 'region', 'v']
;

/**
 * @param {{
 *  apiUrl: ?string,
 *  callbackName: ?string
 *  libraries: ?string[],
 *  timeout: ?number,
 *  channel: ?any,
 *  client: ?any,
 *  key: string,
 *  language: ?string,
 *  region: ?string,
 *  v: ?any,
 * }} options
 * @returns {Promise<object>}
 */
export default async function loadGoogleMapsApi(options = {}) {
  options.apiUrl = options.apiUrl || API_URL;
  options.callbackName = options.callbackName || CALLBACK_NAME;
  options.libraries = options.libraries || [];
  options.timeout = options.timeout || 10000;
  return new Promise((resolve, reject) => {
    // Set up timeout
    const
        timeoutId = setTimeout(function () {
          window[options.callbackName] = function () {} // Set the on load callback to a no-op
          reject(new Error('Could not load the Google Maps API'));
        }, options.timeout),
        script = document.createElement('script'),
        params = [`callback=${options.callbackName}`]
    ;

    // set up callback
    window[options.callbackName] = function () {
      if (null !== timeoutId) {
        clearTimeout(timeoutId);
      }
      resolve(window['google']['maps']);
      delete window[options.callbackName];
    }

    for (let set of optionalOptions.filter(k => !!options[k])) {
      params.push(`${set}=${options[set]}`);
    }
    if (options.libraries.length) {
      params.push(`libraries=${options.libraries.join(',')}`);
    }

    // Insert the `script` tag
    document.body.appendChild(script);
    script.src = `${options.apiUrl}?${params.join('&')}`;
  });
}
