
module.exports = {
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
        ],
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
            },
        },
    ],
    output: {
        library: 'react-sortable-grid',
        libraryTarget: 'umd',
    },
};
