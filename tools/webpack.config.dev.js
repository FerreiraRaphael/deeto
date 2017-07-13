/**
 * Created by raphael on 19/04/17.
 */
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  devtool: "inline-source-map",
  entry: {
    app: path.resolve(__dirname, "../public/scripts/app")
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, "../public"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: "public/index.html",
      chunks: ["app"],
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
