const isProd = process.env.NODE_ENV === 'production'
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const sveltePreprocess = require('svelte-preprocess')

const setConfig = () => {
  let config = {
    target: 'node',

    // Main JS File
    entry: {
      app: [
        path.resolve(`./src/main.js`),
        path.resolve(`./src/styles/index.scss`),
      ],
    },

    // Output file after compilation
    output: {
      path: path.resolve(`./www/assets`),
    },

    // Set aliases for src folders
    resolve: {
      extensions: ['.js'],
      alias: {
        '@js': path.resolve(`./src/js/`),
        '@css': path.resolve(`./src/styles/`),
        '@images': path.resolve(`./src/images/`),
        '@fonts': path.resolve(`./src/fonts/`),
        svelte: path.resolve('node_modules', 'svelte'),
      },
    },

    // Default settings for each environment
    mode: process.env.NODE_ENV,

    // Set sourcemaps if environment is not prod
    devtool: isProd ? false : 'cheap-module-source-map',

    // Webpack is watching sources if environment is not prod
    watch: !isProd,

    // Rules for each type of files
    module: {
      rules: [
        {
          test: /\.js$/, // Javascripts
          exclude: /node_modules/,
          // include: [path.resolve('node_modules/framework7')],
          use: [{ loader: 'babel-loader' }],
        },
        {
          test: /(\.scss|\.less|\.css)$/, // Sass
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.(html|svelte)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              preprocess: sveltePreprocess({
                postcss: true,
              }),
            },
          },
        },
        {
          test: /\.(svg|woff2?|ttf|otf|eot)(\?.*)?$/, // Fonts
          use: [{ loader: 'file-loader' }],
        },
        /*{
                    test: /\.(jpe?g|png|gif|bmp|svg)$/, // images
                    use: [
                        { loader: 'url-loader', options: { limit: 10 * 1024 }},
                        { loader: 'img-loader', options: {
                            plugins: [
                                require('imagemin-gifsicle')({
                                    interlaced: false
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require('imagemin-pngquant')({
                                    floyd: 0.5,
                                    speed: 2
                                }),
                                require('imagemin-svgo')({
                                    plugins: [
                                        { removeTitle: true },
                                        { convertPathData: false }
                                    ]
                                })
                            ]}
                        }
                    ]
                },*/
      ],
    },

    // Plugins
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'process.env.FLUENTFFMPEG_COV': false,
      }),
    ],
  }

  return config
}

module.exports = [setConfig()]
