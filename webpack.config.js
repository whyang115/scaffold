const path = require("path");
const os = require("os");

const webpack = require("webpack");
const HappyPack = require("happypack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const env = process.env.NODE_ENV;
const isDev = env === "dev";
const threads = os.cpus().length;

module.exports = {
  devtool: isDev ? "inline-source-map" : "source-map",
  devServer: {
    compress: true,
    historyApiFallback: true
  },
  entry: {
    vendor: ["jquery"],
    index: "./src/scripts/index.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name]-[hash:8].js",
    chunkFilename: "[name]-[hash:8].js"
  },
  externals: {
    jquery: "window.$"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json", ".vue"]
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: [
          {
            loader: "handlebars-loader",
            options: {
              helperDirs: path.resolve(__dirname, "public/helpers"),
              extensions: ".hbs",
              exclude: /node_module/
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
          options: {
            loaders: {
              ts: "ts-loader",
              tsx: "babel-loader!ts-loader"
            }
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "happypack/loader?id=ts"
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "happypack/loader?id=js"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
      },
      {
        test: /\.s(a|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              context: path.resolve(__dirname, "assets"),
              name: isDev ? "[path][name].[ext]" : "[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        loader: [
          {
            loader: "file-loader",
            options: {
              context: path.resolve(__dirname, "assets"),
              name: isDev ? "[path][name].[ext]" : "[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name]-[hash:8].css",
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin({}),
    new CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      favicon: path.resolve(__dirname, "src/favicon.ico"),
      hash: true
    }),
    new UglifyJsPlugin({
      exclude: /node_modules/,
      cache: true,
      parallel: threads,
      sourceMap: isDev,
      uglifyOptions: {
        ie8: true,
        ecma: 8,
        compress: !isDev,
        warnings: isDev
      }
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HappyPack({
      id: "ts",
      threads: threads,
      loaders: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            happyPackMode: true,
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      ]
    }),
    new HappyPack({
      id: "js",
      threads: threads,
      loaders: [
        {
          loader: "babel-loader",
          query: {
            presets: ["env"]
          },
          options: {
            // 启用babel缓存,缓存目录node_modules/.cache
            cacheDirectory: true
          }
        }
      ]
    })
  ]
};
