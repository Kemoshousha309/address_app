const path = require("path");

module.exports = {
  entry: "./app.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  devServer: {
    static: './dist',
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
}