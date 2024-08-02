const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { whenDev } = require('@craco/craco')
const { NoEmitOnErrorsPlugin } = require('webpack')
const PORT = 3002
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.webpack.js', '.web.js', '.mjs'],
    },
    configure: (webpackConfig, { env }) => {
      //  output
      webpackConfig.output = {
        ...webpackConfig.output,
        ...{
          filename: whenDev(() => 'static/js/bundle.js', 'quiz-app-frontend.js'),
          path: path.join(__dirname, '/build'),
        },
      }
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        ...{
          usedExports: true,
        },
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          }),
        ],
      }
      if (env === 'production') {
        webpackConfig.plugins = [
          ...webpackConfig.plugins,
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-report.html',
          }),
        ]
      }

      webpackConfig.plugins.push(new NoEmitOnErrorsPlugin())
      return webpackConfig
    },
  },
  babel: {
    plugins: [
      [
        'lodash',
        {
          id: 'lodash',
        },
      ],
    ],
  },
  devServer: {
    port: PORT,
    allowedHosts: 'all',
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },
}
