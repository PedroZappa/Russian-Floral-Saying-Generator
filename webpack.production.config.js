const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // splitting output from 1 file to 2
    // Setting up the reception of 2 files
    entry: {
        'index': './src/index.js'
    },
    output: {
        // 'name' takes the name form property in entry
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/static/'
    },
    mode: 'production',
    // optimizes size of .js files
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 10000,
            automaticNameDelimiter: '_'

        }    
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // invokes right to left
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                // Ads access to latest Javascript code
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env' ], 
                        plugins: [ 'transform-class-properties' ]
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    // Always add Webpack plugins to --save-dev
    plugins:  [
        // Terser: in prod mode it is included by default
        // Extracts .css info from bundle.js
        new MiniCssExtractPlugin({
            // name of the output css file
            filename: '[name].[contenthash].css',
        }),
        // Removed old exports from ./dist
        new CleanWebpackPlugin({
            // to specify (multiple) folders to clean
            cleanOnceBeforeBuildPatterns: [
                // Remove all files and subdirectories inside /dist (default)
                '**/*',
                // to remove all files and subfolders inside /build
                path.join(process.cwd(), 'build/**/*')
            ]
        }),
        // Generate .html file inside /dist folder
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // specify which bundles to include in HTML
            // chunk names are specified on entry array
            // common chunk vendor adds dependencies to the ~bundles
            chunks: ['index', 'vendors~index'],
            title: 'Russian Floral Sayings Generator',
            description: 'Some description, yeah right',
            template: 'src/page-template.hbs'
        })
    ]
}