import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource);

Vue.http.options.root = process.env.API_BASE_PATH;
Vue.http.headers.common['Authorization'] = process.env.API_AUTHORIZATION;

new Vue({
  el: '#app',
  render: h => h(App)
})
