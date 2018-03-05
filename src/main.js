import Vue from 'vue';
import Vuetify from 'vuetify';

import App from './App.vue';
import Issue from './components/Issue.vue';
import Toolbar from './components/Toolbar.vue'

import 'vuetify/dist/vuetify.min.css';
import './assets/css/jira-board.less';
import './assets/css/jira-board-print.less';

Vue.use(Vuetify);

Vue.component('j-issue', Issue);
Vue.component('j-toolbar', Toolbar)

new Vue({
  el: '#app',
  render: h => h(App)
});
