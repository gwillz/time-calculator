const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const presetMode = process.env.NODE_ENV || 'development';
const isProduction = (presetMode === 'production');
const ROOT = path.resolve(__dirname, '.');

module.exports = {
    entry: {
        index: ROOT + '/src/index.tsx',
    },
    output: {
        path: ROOT + '/public',
    },
    mode: presetMode,
    devtool: isProduction ? false : 'cheap-module-source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: ROOT + '/src',
                exclude: ROOT + '/node_modules',
                loader: 'ts-loader',
                options: {
                    transpileOnly: false,
                    configFile: ROOT + '/tsconfig.json',
                },
            },
        ]
    },
    resolve: {
        extensions: [
            '.js', '.jsx', '.mjs',
            '.ts', '.ts.d', '.tsx',
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: ROOT + '/src/index.html',
        }),
    ],
}

if (isProduction) {
    module.exports.plugins = module.exports.plugins.concat([
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: ROOT + '/report.html',
        }),
        new OfflinePlugin({
            externals: [
                '/index.css',
                '/img/clock.ico',
                '/img/clock.png',
            ].concat(
                fs.readdirSync(ROOT + '/public/webfonts').map(f => ('/webfonts/' + f)),
            )
        }),
    ])
}
