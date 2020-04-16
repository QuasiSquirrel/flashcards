import Vue from 'vue'
import App from './App.vue'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true
})
Vue.config.productionTip = false
export const bus = new Vue({});

new Vue({
  render: h => h(App),
}).$mount('#app')
