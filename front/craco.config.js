const path = require('path')

module.exports = {
  webpack: {
    alias: {
      'assets': path.resolve(__dirname, './src/assets'),
      'components': path.resolve(__dirname, './src/components'),
      'pages': path.resolve(__dirname, './src/pages'),
      'api': path.resolve(__dirname, './src/api'),
      'store': path.resolve(__dirname, './src/store'),
      'utils': path.resolve(__dirname, './src/helpers'),
      'types': path.resolve(__dirname, './src/types')
    }
  }
}
