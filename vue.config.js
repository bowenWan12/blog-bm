module.exports = {
  devServer: {
    port: 8888,
    open: true,
    proxy: {
    	'/': {
        target: 'http://localhost:80/blog/api/',
        // pathRewrite: {
        //   '^/': ''
        // }
        onProxyRes: function(proxyRes, req, res) { // 监听代理的返回结果
          const location = proxyRes.headers['location']
          const locationRE = /http(?:s)?:\/\/[0-9.:]+?(\/.*?[a-zA-Z]+)$/
          console.log(location)
          if(location) {  // 后端重定向的话返回headers中会有location
            console.log("-------------------------------------------")
            
            const matched = location.match(locationRE)
            const matchGroup = matched && matched[1]
            proxyRes.headers['location'] =  matchGroup ? `http://localhost:8888${matchGroup}` : location
          }
        },

      }
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
};
