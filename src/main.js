import Vue from 'vue'
import Vuebar from 'vuebar';
import App from './App.vue'

import { router, store, } from './imports'

import '@/assets/scss/fonts.scss'

Vue.use(Vuebar);

Vue.config.productionTip = false

document.title = process.env.VUE_APP_TITULO

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
