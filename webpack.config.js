const webpack = require('webpack');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCSSPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const SRC_DIR = path.resolve(__dirname, './src');

const baseConfig = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 65,
                    },
                    // optipng.enabled: false will disable optipng
                    optipng: {
                        enabled: false,
                    },
                    pngquant: {
                        quality: '65-80',
                        speed: 4,
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    // the webp option will enable WEBP
                    webp: {
                        quality: 75,
                    },
                },
            },
            {
                exclude: /\.scss?$/,
                test: /\.(png|jpg|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader',
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: [ExtractCSSPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
        new Dotenv({
            path: path.resolve(__dirname, '.env'),
        }),
        new ExtractCSSPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new CopyWebpackPlugin([
            {
                from: './public',
                to: './build',
                ignore: ['*.html'],
            },
        ]),
    ],
};

const productionConfig = {
    // Root File of server app
    ...baseConfig,
    devtool: false,
    entry: baseConfig.entry,
    mode: 'production',
    output: baseConfig.output,
    module: baseConfig.module,
    plugins: baseConfig.plugins,
    optimization: {
        minimizer: [new UglifyJsPlugin({ sourceMap: true }), new OptimizeCSSAssetsPlugin({})],
    },
};

const developmentConfig = {
    // Root File of server app
    ...baseConfig,
    devtool: 'eval-source-map',
    mode: 'development',
    entry: baseConfig.entry,
    output: baseConfig.output,
    module: baseConfig.module,
    plugins: baseConfig.plugins,
    optimization: {
        minimizer: [],
    },
    devServer: {
        contentBase: SRC_DIR,
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true,
        overlay: true,
    },
};

module.exports = (env, argv) => {
    const mode = argv.mode || 'production';
    console.log(mode);
    const isProduction = mode === 'production';
    if (isProduction) {
        return productionConfig;
    }
    return developmentConfig;
};
