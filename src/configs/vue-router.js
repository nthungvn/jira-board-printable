import Vue from 'vue';
import VueRouter from 'vue-router';

import Stories from '../components/Stories.vue';
import Tasks from '../components/Tasks.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: Stories
  },
  {
    path: "/stories",
    component: Stories
  },
  {
    path: "/tasks",
    component: Tasks
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});
