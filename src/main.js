import Vue from 'vue';
import Vuetify from 'vuetify';

import App from './App.vue';
import Issue from './components/Issue.vue';
import Toolbar from './components/Toolbar.vue';
import Navigation from './components/Navigation.vue';

import 'vuetify/dist/vuetify.min.css';
import './assets/css/jira-board.less';
import './assets/css/jira-board-print.less';

import router from './configs/vue-router';
import store from './store';

Vue.use(Vuetify);

Vue.component('j-issue', Issue);
Vue.component('j-toolbar', Toolbar);
Vue.component('j-navigation', Navigation);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
