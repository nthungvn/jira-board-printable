import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import App from './App.vue';
import Issue from './components/Issue.vue';
import Toolbar from './components/Toolbar.vue'

import 'vuetify/dist/vuetify.min.css';
import './assets/css/jira-board.less';
import './assets/css/jira-board-print.less';

import { routes } from './configs/vue-router';

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.component('j-issue', Issue);
Vue.component('j-toolbar', Toolbar);

const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
