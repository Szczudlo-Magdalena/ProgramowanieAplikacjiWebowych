const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = [
    'index',
    'edit-document',
    'new-document',
    'document-list',
];

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        ...pages.map(page => (
            new HtmlWebpackPlugin({
                filename: `${page}.html`,
                template: path.resolve(__dirname, 'src', 'index.html')
            })
        ))
      ]
};