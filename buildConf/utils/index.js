const path = require('node:path');

const rootPath = process.cwd()

exports.resolvePath = function(...paths) {
    // __dirname 拿到的是当前目录所在的地址，而不是项目的根路径
    // 所以需要node执行根目录地址
    const res = path.resolve(rootPath, ...paths)
    return res
}

// 资源配置地址
exports.file_map = {
    img: 'assets/imgs/[name]_[contenthash][ext]',
    css: 'assets/css/[name]_[contenthash].css',
  }