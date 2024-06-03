const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing : `marketing@${domain}/marketing/remoteEntry.js`,
                auth: `auth@${domain}/auth/latest/remoteEntry.js`,
                dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
        
            },
            shared: Object.keys(packageJson.dependencies),
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);