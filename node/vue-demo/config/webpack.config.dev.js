const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.resolve(__dirname, '..');

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var webpackConfig = merge(baseConfig, {
    devServer: {
        inline: true,               // 文件改变自动刷新页面
        port: 3000,                 // 服务器端口
    },
    devtool: 'cheap-module-eval-source-map',   // 用于标记编译后的文件与编译前的文件对应位置，便于调试
    entry: [
        'webpack/hot/dev-server',   // 热替换处理入口文件
        path.join(root, 'src/main.js')
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),       // 添加热替换插件
        // 将编译后的js注入index.html的body中
        new HtmlWebpackPlugin({
            template: path.join(root, 'index.html'),    // 模板文件
            inject: 'body' // js的script注入到body底部
        })
    ]
});

//webpackConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = webpackConfig;
