const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CssFilePlugin = require('mini-css-extract-plugin') // 样式style单独打包成一个css文件
const MiniCssPlugin = require('css-minimizer-webpack-plugin') // 压缩css文件
const TerserPlugin = require('terser-webpack-plugin') // 压缩js文件

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
  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name][contenthash].js',
    // assetModuleFilename: 'assets/imgs/[name][contenthash][ext]',
    clean: true, // 每一次生成build的静态资源文件是否清除上一次build文件
  },
    // mode: 'production',
  mode: 'development', // 打包或是启动模式
  // 模块解析规则
  module: {
    rules: [
      {
        test: /\.(jpeg|jpg|png)$/,
        type: 'asset',
        generator: {
          //   publicPath: 'dist/assets/',
          filename: 'assets/imgs/[name][contenthash][ext]',
        },
        // 解析器
        parser: {
          // 当模块的大小小于这个尺寸的时候就会打包成base64注入到包中
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
              // 当处理@import 引入less文件的时候，加载postcss-loader, less-loader
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
      title: 'react App',
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
