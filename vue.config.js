module.exports = {
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = process.env.VUE_APP_TITULO

            return args
        })
        // config.resolve.alias.set('@c', config.store.get('context') + '\\src\\components')
    },
}