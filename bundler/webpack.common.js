const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, '../src/script.ts'),
    output: {
        hashFunction: 'xxhash64',
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../public'),
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') },
                { from: path.resolve(__dirname, '../projects'), to: 'projects', noErrorOnMissing: true },
                { from: path.resolve(__dirname, '../assets'), to: 'assets', noErrorOnMissing: true },
                { from: path.resolve(__dirname, '../data'), to: 'data', noErrorOnMissing: true },
                { from: path.resolve(__dirname, '../cv'), to: 'cv', noErrorOnMissing: true },
                { from: path.resolve(__dirname, '../project.html'), to: 'project.html', noErrorOnMissing: true },
                { from: path.resolve(__dirname, '../404.html'), to: '404.html', noErrorOnMissing: true },
                { from: path.resolve(__dirname, '../robots.txt'), to: 'robots.txt', noErrorOnMissing: true },
                { from: path.resolve(__dirname, '../sitemap.xml'), to: 'sitemap.xml', noErrorOnMissing: true },
                { from: path.resolve(__dirname, '../manifest.webmanifest'), to: 'manifest.webmanifest', noErrorOnMissing: true },
                { from: path.resolve(__dirname, '../.nojekyll'), to: '.nojekyll', noErrorOnMissing: true },
                { from: path.resolve(__dirname, '../THIRD_PARTY_LICENSES'), to: 'THIRD_PARTY_LICENSES', noErrorOnMissing: true },
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true,
        }),
        new MiniCSSExtractPlugin(),
    ],
    resolve: {
        alias: {
            three: path.resolve('./node_modules/three'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader'],
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // JS
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

            // CSS
            {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader'],
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext]',
                },
            },
            // Audio
            {
                test: /\.(mp3|wav)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[hash][ext]',
                },
            },
            // Shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: ['glslify-import-loader', 'raw-loader', 'glslify-loader'],
            },
        ],
    },
};
