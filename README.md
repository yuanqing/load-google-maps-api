# load-google-maps-api [![npm Version](http://img.shields.io/npm/v/load-google-maps-api.svg?style=flat)](https://www.npmjs.com/package/load-google-maps-api) [![Build Status](https://img.shields.io/travis/yuanqing/load-google-maps-api.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/load-google-maps-api)

> A thin, [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)-returning helper for loading the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/).

## Usage

```js
import loadGoogleMapsAPI from 'load-google-maps-api';

loadGoogleMapsAPI().then((googleMaps) => {
  console.log(googleMaps); //=> Object { Animation: Object, ...
}).catch((err) => {
  console.error(err);
});
```

Read [the source](index.js) to understand how this works.

*N.B.* Just like the Google Maps API itself, this module is client-side only.

## Why

Without this module, you would need to specify a named *global* callback, and pass said callback&rsquo;s name as a parameter in the `script` tag&rsquo;s `src`. For example:

```html
<script>
window.googleMapsOnLoad = () => {
  // `google.maps` available here
}
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?callback=googleMapsOnLoad"></script>
```

This module abstracts this ceremony away, and fits better with [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/).

## API

```js
import loadGoogleMapsAPI from 'load-google-maps-api';
```

### loadGoogleMapsAPI([opts])

Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). (See [Usage](#usage).)

- **Fulfilled** if load was successful. The fulfilled callback is passed the `google.maps` object.
- **Rejected** if we weren&rsquo;t able to load the Google Maps API after `opts.timeout`.

`opts` is an optional object literal:

  Key | Description | Default
  :--|:--|:--
  `client` | [Client ID](https://developers.google.com/maps/documentation/javascript/get-api-key#specify-a-client-id-when-loading-the-api) | `undefined`
  `key` | [Your API key](https://developers.google.com/maps/documentation/javascript/get-api-key#specify-a-key-when-loading-the-api) | `undefined`
  `language` | [Language](https://developers.google.com/maps/documentation/javascript/examples/map-rtl) | `undefined`
  `libraries` | [Supplemental libraries to load](https://developers.google.com/maps/documentation/javascript/libraries) | `[]`
  `timeout` | Time in milliseconds before rejecting the promise | `10000`
  `v` | [API version](https://developers.google.com/maps/documentation/javascript/versions) | `undefined`

## Installation

Install via [npm](https://npmjs.com):

```
$ npm i --save load-google-maps-api
```

## License

[MIT](LICENSE.md)
