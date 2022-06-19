const port = process.env.port || process.env.npm_config_port || 8819
const defaultSettings = require('./src/settings.js')
const name = defaultSettings.title

module.exports = {
  publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = name
        return args
      })
  },
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    apollo: {
      lintGQL: true
    }
  }
}
