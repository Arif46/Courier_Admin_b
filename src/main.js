import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { router } from './router'
import store from './store'
import moment from 'moment'
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import i18n from './i18n'
import excel from 'vue-excel-export'
import VueHtmlToPaper from "vue-html-to-paper";
import Permissions from './mixins/Permissions';

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

import Echo from "laravel-echo"

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})


Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)


Vue.mixin(Permissions);

Vue.filter('dateformat',(arg)=> {
  return moment(arg).format("DD MMM YYYY");
})

Vue.filter('timeformat',(arg)=> {
  return moment(arg).format("h:mm a");
})
Vue.use(VueHtmlToPaper);

// Toastr config
const toastrConfigs = {
  position: 'top right',
  errorColor: '#D6E09B',
  warningColor: '#D6E09B',
  showDuration: 1000,
  timeOut: 3000
}
Vue.use(CxltToastr, toastrConfigs)

Vue.use(excel)
Vue.use(VueAxios,axios)

//Vue.prototype.$image_path = 'http://localhost:8000/';
Vue.prototype.$image_path = 'https://api.bahokbd.com/';
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_WEBSOCKETS_KEY,
    wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
});

//if unauthenticated redirect to login page
axios.interceptors.response.use(response => {
  console.log('response = ', response)
  return response;
}, error => {
  console.log('errorsss = ', error)
  if (error.response.status === 401) {
    this.$router.push('/login')
  }
  return error;
});

var vm = new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.vm = vm