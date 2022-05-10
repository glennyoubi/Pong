const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  watch: true,
  entry: './src/scripts/pong.js',
  mode : 'development',
  output: {
    path: path.resolve(__dirname, '../server/public'),
    filename: 'scripts/bundle.js'
  },

  devServer: {
    static: {
       publicPath: path.resolve(__dirname, 'dist'),
       watch : true
    },
    host: 'localhost',
    port : 9000,
    open : true
}
  ,
  plugins: [
    new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
    }), 

    new CopyPlugin({
        patterns: [
      {
        from: 'src/images/*',
        to:   'images/[name][ext]'
      },
      {
        from: 'src/style/*',
        to:   'style/[name][ext]'
      },
        ]
    })
]
};