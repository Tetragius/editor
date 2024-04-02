const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  // devtool: "source-map",
  entry: {
    app: ["@babel/polyfill", path.resolve(__dirname, "src/index.tsx")],
    playground: [
      "@babel/polyfill",
      path.resolve(__dirname, "src/Components/Playground/script.ts"),
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
  },
  optimization: {
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|ttf|wasm)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.ejs"),
      filename: "index.html",
      chunks: ["app"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "src/Components/Playground/playground.ejs"
      ),
      filename: "playground.html",
      chunks: ["playground"],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MonacoWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "" }],
    }),
  ],
  devServer: {
    static: { directory: path.join(__dirname, "dist") },
    hot: true,
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
};
