import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'

import interceptorsSetup from './core/interceptors'
import './core/filters'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false

interceptorsSetup()

Vue.use(Vuelidate)

Vue.use(Toast, {
  position: "top-right",
  timeout: 3000,
  maxToasts: 20,
  newestOnTop: true
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
