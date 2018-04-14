const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader',
        exclude: /(node_moduless)/,
      },
      {
          test: /\.html$/,
          use: [{
              loader: 'html-loader',
              options: {
                  minimize: true
              }
          }]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js'
    },
  },
};
