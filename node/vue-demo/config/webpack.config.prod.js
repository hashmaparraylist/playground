const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.resolve(__dirname, '..');

module.exports = merge(baseConfig, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),       // 添加热替换插件
        // 将编译后的js注入index.html的body中
        new HtmlWebpackPlugin({
            template: path.join(root, 'index.html'),    // 模板文件
            inject: 'body' // js的script注入到body底部
        })
    ]
});
