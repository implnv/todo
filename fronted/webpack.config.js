
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

module.exports = {
    entry: './src/index.jsx',
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            options: { presets: ["@babel/preset-env"] }
        }, 
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        }]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'TODOS' }),
        new HtmlWebpackPartialsPlugin({
            path: path.resolve(__dirname, 'src/root.html')
        })
    ],
    devServer: {
        static: './dist',
        open: true,
        historyApiFallback: true
    }
};