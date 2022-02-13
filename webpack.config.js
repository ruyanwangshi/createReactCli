const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CssFilePlugin = require('mini-css-extract-plugin')
const MiniCssPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    // 打包分离优化
    // main: {
    //     import: './src/index.js',
    //     dependOn: 'shared'
    // },
    // fooModule: {
    //     import: './src/foo.js',
    //     dependOn: 'shared'
    // },
    // shared: 'lodash'
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name][contenthash].js',
    // assetModuleFilename: 'assets/imgs/[name][contenthash][ext]',
    clean: true,
  },
    mode: 'production',
  // mode: 'development',
  module: {
    rules: [
      {
        test: /\.(jpeg|jpg|png)$/,
        type: 'asset',
        generator: {
          //   publicPath: 'dist/assets/',
          filename: 'assets/imgs/[name][contenthash][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset',
        generator: {
          //   publicPath: 'dist/assets/',
          filename: 'assets/fonts/[name][contenthash][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
      {
        test: /\.(css)$/,
        // use: ['style-loader', {
        use: [
          CssFilePlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(less)$/,
        // use: ['style-loader', {
        use: [
          CssFilePlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      //   使用rust最新loader来继续es5转换 start
      //   {
      //     test: /\.m?js$/,
      //     exclude: /(node_modules)/,
      //     use: {
      //       // Use `.swcrc` to configure swc
      //       loader: 'swc-loader',
      //     },
      //   },
      //   {
      //     test: /\.ts$/,
      //     exclude: /(node_modules)/,
      //     use: {
      //       loader: 'swc-loader',
      //       options: {
      //         // This makes swc-loader invoke swc synchronously.
      //         sync: true,
      //         jsc: {
      //           parser: {
      //             syntax: 'typescript',
      //           },
      //         },
      //       },
      //     },
      //   },
      //   使用babel进行转换
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          // Use `.swcrc` to configure swc
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlPlugin({
      template: './public/index.html',
    }),
    new CssFilePlugin({
      filename: 'css/[contenthash].css'
    }),
  ],
  optimization: {
    // 原生是支持压缩js的但是配置了压缩css所以就需要自己单独配置了
    minimizer: [new MiniCssPlugin(), new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        vender: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}
