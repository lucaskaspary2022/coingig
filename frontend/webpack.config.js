const path = require('path');

module.exports = {
  // Entry point of your application
  entry: './src/index.js',

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  

  module: {
    rules: [
      {
        test: /\.node$/, use: "node-loader",
        use: ['style-loader', 'css-loader']
      },
      // ... other rules
    ],
  }
,  

  // Plugins can be added here
  plugins: [],

  // Development server configuration
  devServer: {
    contentBase: './dist'
  }
};
