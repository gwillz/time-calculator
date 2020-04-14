const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const presetMode = process.env.NODE_ENV || 'development';
const isProduction = (presetMode === 'production');
const r = path.resolve.bind(null, __dirname);

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: {
        index: r('src/index.tsx'),
    },
    output: {
        path: r('public'),
        filename: isProduction ? '[id].[hash].js' : '[name].js',
    },
    mode: presetMode,
    devtool: isProduction ? false : 'cheap-module-source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    performance: {
        maxAssetSize: 500 * 1000,
        maxEntrypointSize: 500 * 1000,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: r('src'),
                exclude: r('node_modules'),
                loader: 'ts-loader',
                options: {
                    transpileOnly: false,
                    configFile: r('tsconfig.json'),
                },
            },
            {
                test: /\.css$/,
                include: r('src'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            }
        ]
    },
    resolve: {
        extensions: [
            '.js', '.jsx', '.mjs',
            '.ts', '.ts.d', '.tsx',
            '.css',
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: r('src/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[id].[hash].css' : '[name].css',
        }),
    ],
}

if (isProduction) {
    module.exports.plugins = module.exports.plugins.concat([
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: r('report.html'),
        }),
        new OfflinePlugin({
            externals: [
                '/index.css',
                '/img/clock.ico',
                '/img/clock.png',
            ].concat(
                fs.readdirSync(r('public/webfonts')).map(f => ('/webfonts/' + f)),
            )
        }),
    ])
}
