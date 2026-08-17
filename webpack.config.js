const path = require('path');

// Nest's bundled tsconfig-paths-webpack-plugin resolves "paths" against baseUrl,
// and falls back to the *app* tsconfig's directory when baseUrl is absent -- so
// @app/common would look under apps/<app>/libs/common/src. baseUrl is deprecated
// in TS 6.0 and removed in TS 7.0, so instead of keeping it, the same mapping is
// declared here as a webpack alias. Keep in sync with "paths" in tsconfig.json.
module.exports = (options) => ({
  ...options,
  resolve: {
    ...options.resolve,
    alias: {
      ...options.resolve?.alias,
      '@app/common': path.resolve(__dirname, 'libs/common/src'),
    },
  },
});
