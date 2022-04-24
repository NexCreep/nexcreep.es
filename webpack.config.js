const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/bundle.js",
  mode: "development",
  devServer: {
    watchFiles: ["src/**/*"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        use: ['file-loader']
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/index.html", to: "index.html" }, 
      { from: "src/assets/favicon.ico", to: "assets/favicon.ico" },
      { from: "src/assets/logo.png", to: "assets/logo.png" }
    ],
    })
  ],
  output: {
    filename: "js/core.bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
