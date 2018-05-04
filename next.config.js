const webpack = require('webpack');


// const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin(
        {
          $: 'jquery',
          jQuery: 'jquery',
          jquery: 'jquery',
          'window.jQuery': 'jquery',
        },
      ),
    );

    return config;
  },
};
