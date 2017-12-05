const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const folderDist = 'public';
const bundleJS = 'js/bundle.js';
const bundleSTYLES = 'css/bundle.css';

module.exports = {
    entry: [
        './src/js/main.js',

        // import CSS/LESS as main entry but actually they will be extracted
        // to a separate combined file
        './src/css/main.css',
        './src/less/main.less',
    ],

    output: {
        filename: bundleJS,
        path: path.resolve(__dirname, folderDist),
    },

    resolve: {
        extensions: ['.js']
    },

    plugins: [
        // clean the build folder first
        new CleanWebpackPlugin(folderDist),

        new ExtractTextPlugin(bundleSTYLES),

        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        new CopyWebpackPlugin([
            { from: './src/img', to: 'img' },
            { from: './src/data', to: 'data' }
        ])

        // new webpack.optimize.UglifyJsPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            // "env"

                            "es2015",
                            "stage-0"
                        ],
                        "plugins": [
                            // needed for object spreading like {...data}
                            // "transform-object-rest-spread",

                            "transform-runtime"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                url: false, // don't import/inline the url like in background-image : url('')
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                url: false, // don't import/inline the url like in background-image : url('')
                                sourceMap: true
                            }
                        },
                        {
                            loader: "less-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },

    // Turn on/off sourcemaps globally - for all loaders
    devtool: 'source-map'
};