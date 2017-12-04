const path = require("path");
const env = process.env.NODE_ENV;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: "./public/scripts/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\.jsx?$/,
        use: "babel-loader"
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
        use: ["file-loader"]
      }
    ]
  },
  plugins:
    env === "production"
      ? [
          new ExtractTextPlugin({
            filename: "[name]-[hash].css",
            allChunks: true
          })
        ]
      : []
};
