const webpack = require("webpack");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractCSSPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

const SRC_DIR = path.resolve(__dirname, "../src");

module.exports = {
  entry: {
    app: ["./src/app/App.tsx", "webpack-hot-middleware/client"],
    vendor: ["react", "react-dom"]
  },
  output: {
    filename: "main.bundle.js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/",
    path: path.resolve(__dirname, "../build")
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        include: SRC_DIR
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "image-webpack-loader",
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: "65-80",
            speed: 4
          },
          gifsicle: {
            interlaced: false
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75
          }
        }
      },
      {
        exclude: /\.scss?$/,
        test: /\.(png|jpg|svg)$/,
        exclude: /node_modules/,
        loader: "url-loader"
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: [ExtractCSSPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "app", "index.html")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, ".env")
    }),
    new ExtractCSSPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new CopyWebpackPlugin([
      {
        from: "./public",
        to: "../build",
        ignore: ["*.html"]
      }
    ])
  ]
};
