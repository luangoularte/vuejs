module.exports = {
    // ...
    resolve: {
        fallback: {
          util: require.resolve("util/"),
          querystring: require.resolve("querystring-es3/"),
          "url": require.resolve("url/"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "zlib": require.resolve("browserify-zlib"),
          "path": require.resolve("path-browserify"),
          "crypto": require.resolve("crypto-browserify"),
          "os": require.resolve("os-browserify/browser"),
          "tls": false,
          "net": false,
        }
    },
  };

