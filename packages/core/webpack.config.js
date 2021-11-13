const path = require("path");

module.exports = {
  mode: "production",
  entry: "./index.ts",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {},
    plugins: [],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    filename: "index.js",
  },
  externals: [],
};
