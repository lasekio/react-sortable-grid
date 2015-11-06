var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/demo/index.js',
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
    })],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
            },
            {
                test: /\.png$/,
                loader: 'file',
            },
        ],
    },
    output: {
        path: './demo',
        filename: 'demo.js',
    },
    devServer: {
        contentBase: './demo/',
        historyApiFallback: true,
        inline: true,
        hot: true,
    },
    devtool: 'eval',
};
