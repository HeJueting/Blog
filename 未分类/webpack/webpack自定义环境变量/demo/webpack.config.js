const path = require('path');
const webpack = require('webpack');

module.exports = {
    // 入口
    entry: './src/index.js',
    // 出口
    output: {
        filename: `bundle.js`,
        path: path.join(__dirname, 'dist')
    },
    // 插件
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.MODE': JSON.stringify(process.env.MODE)
        })
    ]
};