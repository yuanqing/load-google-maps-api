module.exports = function(config) {
  config.set({
    basePath: '.',
    browserNoActivityTimeout: 20000,
    singleRun: true,
    customLaunchers: {
      ChromeTravis: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    browsers: [process.env.TRAVIS ? 'ChromeTravis' : 'Chrome'],
    frameworks: [
      'browserify',
      'tap'
    ],
    plugins: [
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-tap',
      'karma-tape-reporter'
    ],
    reporters: [
      'tape'
    ],
    preprocessors: {
      'test/**/*.js': ['browserify']
    },
    files: [
      'test/**/*.js'
    ],
    browserify: {
      transform: [
        ['babelify']
      ]
    }
  });
};
