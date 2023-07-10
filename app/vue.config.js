const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // 打包时去掉map文件
  productionSourceMap: false,
  transpileDependencies: true,
  //关闭语法检查
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn/",
        // pathRewrite: { "^/api": "" },
      },
    },
  },
});
