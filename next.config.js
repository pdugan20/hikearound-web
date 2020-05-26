const withSourceMaps = require('@zeit/next-source-maps')();

module.exports = withSourceMaps({
    webpack: (config, options) => {
        if (!options.isServer) {
            config.resolve.alias['@sentry/node'] = '@sentry/browser';
        }
        return config;
    },
    env: {
        mapkitToken: process.env.mapkitToken,
    },
});
