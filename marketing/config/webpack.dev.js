const path = require('path');
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const { DefinePlugin } = require('webpack');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const commonConfig = require('./webpack.common');
const packageName = 'marketing-mfe';

function getVersionInfo() {
    const gitRevisionPlugin = new GitRevisionPlugin({
        branch: true,
        lightweightTags: true,
    });
    return {
        version: gitRevisionPlugin.version(),
        branch: gitRevisionPlugin.branch(),
        commithash: gitRevisionPlugin.commithash(),
    };
}


const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8081/',
    },
    devServer: {
        port: 8081,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new DefinePlugin({
            "APP_MODE": JSON.stringify("local"),
            "BUILD_INFO": JSON.stringify(getVersionInfo()),
            "PACKAGE_NAME": JSON.stringify(packageName),
        }),
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

console.table({
    BACKEND_POINTING: 'localhost:8080',
    WEBPACK_BUILD_MODE: process.env.NODE_ENV,
    packageName,
});

module.exports = merge(commonConfig, devConfig);
