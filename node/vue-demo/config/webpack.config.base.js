const path = require('path');
const root = path.resolve(__dirname, '..');
const vueLoaderConfig = require('./vue-loader.conf');

module.exports = {
    entry: path.join(root, 'src/main.js'),  // 入口文件路径
    output: {
        path: path.join(root, 'dist'),      // 输出目录
        filename: 'bundle.js'               // 打包文件名
    },

    resolve: {
        // 配置目录别名
        alias: {
            // 在任意目录下require('components/example') 相当于require('项目根目录/src/components/example')
            components: path.join(root, 'src/components'),
            views: path.join(root, 'src/views'),
            styles: path.join(root, 'src/styles'),
            store: path.join(root, 'src/store'),
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(root, 'src')
        },
        extensions: ['.json', '.js', '.vue']    // 引用js和vue文件可以省略后缀名
        //fallback: [path.join(root, 'node_modules')] // 找不到的模块会尝试在这个数组的目录里面再寻找
    },
    /*
    resolveLoader: {
        fallback: [path.join(root, 'node_modules')] // 找不到的loader模块会尝试在这个数组的目录里面再寻找
    },
    */
    module: { // 配置loader
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                path.join(root, 'src'),
                path.join(root, 'test')
            ]
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                name: '[name].[ext]?[hash]'
            }
        }]
    }
};
