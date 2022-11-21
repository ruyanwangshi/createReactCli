const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    optimization: {
      minimizer: [
        // 如果是webpack5可以使用 `...` 和 其它优化打包插件结合使用
        `...`,
        new CssMinimizerPlugin(),
      ],
      // 如果需要分包，必须配置此项
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
