# load-google-maps-api [![npm Version](http://img.shields.io/npm/v/load-google-maps-api.svg?style=flat)](https://www.npmjs.com/package/load-google-maps-api) [![Build Status](https://img.shields.io/travis/yuanqing/load-google-maps-api.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/load-google-maps-api)

> A thin, [Promise](https://developers.google.com/web/fundamentals/primers/promises)-returning helper for loading the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/).

- The Promise&rsquo;s fulfilled callback is passed the `google.maps` object
- Optionally set a timeout, an API key, the language, [and more](#loadgooglemapsapioptions)
- 424 bytes gzipped

## Usage

> [**Editable demo (CodePen)**](https://codepen.io/lyuanqing/pen/YeYBrN)

```js
const loadGoogleMapsApi = require('load-google-maps-api')

loadGoogleMapsApi().then(function (googleMaps) {
  new googleMaps.Map(document.querySelector('.map'), {
    center: {
      lat: 40.7484405,
      lng: -73.9944191
    },
    zoom: 12
  })
}).catch(function (error) {
  console.error(error)
})
```

*N.B.* Just like the Google Maps API itself, this module is client-side only.

## Why

[Without this module](https://developers.google.com/maps/documentation/javascript/tutorial#Loading_the_Maps_API), you would need to specify a named *global* callback, and pass said callback&rsquo;s name as a parameter in the `script` tag&rsquo;s `src`. For example:

```html
<script>
window.googleMapsOnLoad = function () {
  // `window.google.maps` available here
}
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?callback=googleMapsOnLoad"></script>
```

This module abstracts this ceremony away, and fits better with modern bundlers like [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/).

## API

```js
const loadGoogleMapsApi = require('load-google-maps-api')
```

### loadGoogleMapsApi([options])

Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

- **Fulfilled** if loading was successful. The fulfilled callback is passed the `google.maps` object. If `loadGoogleMapsApi` is called multiple times on a page, the fulfilled callback will be passed the previously-loaded `google.maps` object.
- **Rejected** if we weren&rsquo;t able to load the Google Maps API after `options.timeout`.

See [Usage](#usage).

`options` is an optional object literal:

  Key | Description | Default
  :--|:--|:--
  `channel` | [Client usage reporting channel](https://developers.google.com/maps/premium/reports/usage-reports#channels) | `undefined`
  `client` | [Client ID](https://developers.google.com/maps/documentation/javascript/get-api-key#specifying-a-client-id-when-loading-the-api) | `undefined`
  `key` | [Your API key](https://developers.google.com/maps/documentation/javascript/get-api-key#step-2-add-the-api-key-to-your-application) | `undefined`
  `language` | [Language](https://developers.google.com/maps/documentation/javascript/localization#Language) | `undefined`
  `libraries` | [Supplemental libraries to load](https://developers.google.com/maps/documentation/javascript/libraries) | `[]`
  `region` | [Region](https://developers.google.com/maps/documentation/javascript/localization#Region) | `undefined`
  `timeout` | Time in milliseconds before rejecting the Promise | `10000`
  `v` | [API version](https://developers.google.com/maps/documentation/javascript/versions) | `undefined`

## Installation

Install via [yarn](https://yarnpkg.com):

```sh
$ yarn add load-google-maps-api
```

Or [npm](https://npmjs.com):

```sh
$ npm install --save load-google-maps-api
```

## License

[MIT](LICENSE.md)
