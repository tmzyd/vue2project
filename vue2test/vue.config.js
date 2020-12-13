module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/education': {
        target: 'http://47.116.143.94',
        changeOrigin: true
      }
    }
  }
}
