module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].meta = {
        viewport: 'width=device-width,initial-scale=1,user-scalable=no'
      }
      args[0].inject = true
      args[0].filename = 'index.html'
      args[0].favicon = './src/assets/images/ico.png'

      return args
    })
  },
  configureWebpack: {
    devtool: 'cheap-source-map',
    output: {
      filename: 'bundle.js'
    }
  }
}