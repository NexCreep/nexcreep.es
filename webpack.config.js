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
      patterns: [
        { from: "src/index.html", to: "index.html" },
        { from: "src/assets/favicon.ico", to: "assets/favicon.ico" },
        { from: "src/assets/logo.png", to: "assets/logo.png" },
        { from: "src/assets/coding.gif", to: "assets/coding.gif" },
        { from: "src/assets/lang/en_UK.json", to: "assets/lang/en_UK.json" },
        { from: "src/assets/lang/es_ES.json", to: "assets/lang/es_ES.json" },
        { from: "src/domain-config/CNAME" },
        { from: "src/assets/third-party-licenses.txt", to: "assets/third-party-licenses.txt" }
    ],
    })
  ],
  output: {
    filename: "js/core.bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
