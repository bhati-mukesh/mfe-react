const path = require('path');
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8080/',
    },
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',

            },
            shared: Object.keys(packageJson.dependencies),
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, '../public/index.html'), // make sure this path is correct
        //     // template: '../public/index.html'
        // })
    ]
}

module.exports = merge(commonConfig, devConfig);