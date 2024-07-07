const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
  },
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    minimize: false,
    sourceMap: false,
    plugins: () => [autoprefixer('last 2 versions')],
  },
}

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
}

const bulkLoader = {
  loader: 'sass-bulk-import-loader',
}

const sass = ['css-hot-loader'].concat([
  MiniCssExtractPlugin.loader,
  cssLoader,
  postcssLoader,
  sassLoader,
  bulkLoader,
])

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: './index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.webpack.js', '.web.js', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.html/,
        use: ['html-loader'],
      },
      {
        test: /\.scss$/,
        include: /src/,
        use: sass,
      },
      {
        test: /\.css$/,
        use: cssLoader,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'public/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      linkType: 'text/css',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8888,
  },
}
