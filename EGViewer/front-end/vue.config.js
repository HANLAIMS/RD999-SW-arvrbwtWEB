module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer : {
    disableHostCheck : true,
    Proxy: 'http://rnd.hanlaims.com:3000'
}
}