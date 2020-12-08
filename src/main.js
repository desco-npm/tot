import Vue from 'vue'
import vueScrollbarDirective from 'vue-scrollbar-directive'
import App from './App.vue'

import { router, } from './imports'
 
Vue.use(vueScrollbarDirective)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
