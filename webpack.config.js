const path = require('path');
const fs = require('fs')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, options) => {
    const { mode } = options
    const isProd = mode === 'production'

    const optimization = isProd ? { minimizer: [new UglifyJsPlugin()] } : {}
    const config = '{"apiRoot": "http://kormilov_vk.hldns.ru/api/"}'

    return {
        entry: ['babel-polyfill', './src/index.js'],
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        devServer: {
            contentBase: './dist',
            historyApiFallback: true,
            hot: true
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                inject: false,
                template: require('html-webpack-template'),
                headHtmlSnippet: isProd ? `<script>window.config = ${config}</script>` : '',
                appMountId: 'app'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        optimization,
    }
};
