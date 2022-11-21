const utils = require('./utils/index.js')
const HtmlPlugin = require('html-webpack-plugin')
const CssFilePlugin = require('mini-css-extract-plugin') // 样式style单独打包成一个css文件
const prodConf = require('./webpack.prod.conf.js')

const baseConf = function (mode) {
  return {
    entry: './src/index.js',
    mode: mode,
    output: {
      path: utils.resolvePath('dist'),
      filename: 'assets/[name].js',
      assetModuleFilename: 'static/[hash][ext][query]',
      chunkFilename: 'assets/chunk_[contenthash].js',
      clean: true,
    },
    module: {
      rules: [
        {
            test: /\.(m?js)$/i,
            use: [
                'babel-loader'
            ]
        },
        {
          test: /\.(jpe?g|jpg|png)$/,
          type: 'asset',
          generator: {
            filename: utils.file_map['img'], // 这个优先级要比output里面静态资源模块（assetModuleFilename）优先级高
          },
          // 解析器
          parser: {
            // 当模块的大小小于这个尺寸的时候就会打包成base64注入到包中，自动地在 resource 和 inline 之间进行选择
            dataUrlCondition: {
              // 类型为object = { maxSize number = 8096 } function (source, { filename, module }) => boolean 当提供函数时，返回 true 值时告知 webpack 将模块作为一个 Base64 编码的字符串注入到包中， 否则模块文件会被生成到输出的目标目录中。
              maxSize: 8 * 1024,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            mode === 'production' ? CssFilePlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                // 这个作用是在解析当前css的时候使用前面几个loader进行帮助解析
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        {
            test: /\.less$/i,
            use: [
                mode === 'production' ? CssFilePlugin.loader : 'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    // 这个作用是在解析当前css的时候使用前面几个loader进行帮助解析
                    importLoaders: 2,
                  },
                },
                'postcss-loader',
                'less-loader'
              ],
        }
      ],
    },
    plugins: [
      new HtmlPlugin({
        title: 'react App',
        template: './public/index.html',
      }),
    ],
  }
}

const prodConfPlugin = [
  new CssFilePlugin({
    filename: utils.file_map['css'],
  }),
]

function initConf(env, argv) {
  const mode = argv.mode

  let resConf = baseConf(mode)

  if (mode === 'production') {
    Object.assign(resConf, prodConf)
    resConf.plugins = resConf.plugins.concat(...prodConfPlugin)
  }

  console.log('config=>', resConf)
  return resConf
}

module.exports = initConf
