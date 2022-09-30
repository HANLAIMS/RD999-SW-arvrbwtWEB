import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import VueCookies from "vue-cookies"
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.config.productionTip = false
Vue.use(VueCookies);
Vue.use(PerfectScrollbar)
Vue.$cookies.config("7d");

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
