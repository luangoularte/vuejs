module.exports = {
    // ...
    resolve: {
        fallback: {
          util: require.resolve("util/"),
          querystring: require.resolve("querystring-es3/"),
          "tls": false,
          "net": false,
        }
    },
  };

