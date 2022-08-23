const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|jpg|png|mp4)$/,
        use: {
          loader: require.resolve('file-loader'),
          options: {
            name: '/static/media/[name].[hash:8].[ext]',
          },
        }
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns:[
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'build'),
        }
      ]
    })
  ],
  devServer: {
    static: './build',
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },
    }
  },
};
