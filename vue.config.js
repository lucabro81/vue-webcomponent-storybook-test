module.exports = {
  productionSourceMap: true,
  chainWebpack: config => {

    config.module
        .rule('vue')
        .use('vue-loader')
        .tap((options) => {
            options.shadowMode = true;
            return options;
        });

    const rules = ['css', 'postcss', 'scss', 'sass', 'less', 'stylus'];
    const modules = ['vue-modules', 'vue', 'normal-modules', 'normal'];

    rules.forEach((rule) => {
      modules.forEach((module) => {
        config.module
            .rule(rule)
            .oneOf(module)
            .use('vue-style-loader')
            .tap((options) => {
              options.shadowMode = true;
              return options;
            })
      })
    })

  }
}
