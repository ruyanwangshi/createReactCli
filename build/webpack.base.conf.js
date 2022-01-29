const { templateContent, resolvePath : rPath } = require('./util')
const HtmlPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('html-webpack-plugin')


// 环境变量 test pre prod
const env = process.env.NODE_ENV

const ENV_MAP = {
    'test': 'development',
    'pre': 'production',
    'prod': 'production',
}

console.log(env);

module.exports = {
    mode: ENV_MAP[env],
    // devtool: env === 'test' ? 'source-map' : false,
    context: rPath(),
    entry: rPath('../src/index.js'),
    output: {
        filename: '[name].bundle.js',
        path: rPath(['../dist']),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            env: env,
            filename: 'test.html',
            // templateContent: ({ htmlWebpackPlugin }) => templateContent(htmlWebpackPlugin)
        }),
        new ManifestPlugin()
    ]
}