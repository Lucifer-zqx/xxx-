module.exports={
    lintOnSave:false,

    configureWebpack: {
        
    },

    devServer:{
        proxy: {
            '/api': {
              target: 'http://localhost:4000',
              ws: true,
              changeOrigin: true,
              pathRewrite:{'^/api':''}
            }
        }
    },

    css: {
      loaderOptions: {
        stylus: {
          'resolve url': true,
          'import': [
            './src/theme'
          ]
        }
      }
    },

    pluginOptions: {
      'cube-ui': {
        postCompile: true,
        theme: true
      }
    }
}
