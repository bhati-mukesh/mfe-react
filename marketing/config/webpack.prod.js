const path = require('path');
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[contenthash].[name].js',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': path.resolve(__dirname, '../src/bootstrap.js')
            },
            shared: Object.keys(packageJson.dependencies),
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);