const path = require("path");
const os = require("os");
const env = process.env.NODE_ENV;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HappyPack = require("happypack");
const isDev = env === "dev";
const threads = os.cpus().length;
module.exports = {
  devtool: isDev ? "inline-source-map" : "source-map",
  entry: "./public/scripts/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json"]
  },
  module: {
    rules: [
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
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "happypack/loader?id=js"
      //   }
      // },
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
        use: ["file-loader"]
      }
    ]
  },
  plugins:  [
        new ExtractTextPlugin({
          filename: "[name]-[hash].css",
          allChunks: true
        }),
        new HappyPack({
          id: "ts",
          threads: threads,
          loaders: [
            {
              loader: "ts-loader",
              options: {
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
