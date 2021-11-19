module.exports = {
  lintOnSave: false,
  // 不希望打包後的檔名出現雜湊值
  filenameHashing: false,
  // 部屬
  publicPath:
    process.env.NODE_ENV === "production" ? "/vue3-simple-news/" : "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
             @import "@/scss/index.scss";
          `,
      },
    },
  },
};
