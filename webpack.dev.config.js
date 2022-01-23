const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        'index': './src/index.js'
    },
    output: {
        // no need for content hash on filename in dev mode
        // bewcause we dont need browser caching during development
        filename: '[name].bundle.js',
        // Absolute path required!
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    mode: 'development',
    devServer: {
        open: path.resolve(__dirname, './dist'),  // testing ON may turn off later //
        static: { 
            directory: path.resolve(__dirname, './dist')
        },
        port: 9000,
        devMiddleware: {
            writeToDisk: true
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
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // invokes right to left
                    'style-loader', 'css-loader', 'sass-loader'
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
        // No need for Terser in dev mode
        // For troubleshooting reasons its better to see full code
        
        // no need for MiniCssExtractPlugin in Dev Mode
        
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
            chunks: ['index'],
            title: 'Russian Floral Sayings Generator',
            template: 'src/page-template.hbs',
            description: 'Some description, yeah right'
        }),
    ]
}