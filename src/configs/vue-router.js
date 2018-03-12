import Stories from '../components/Stories.vue'
import Tasks from '../components/Tasks.vue'

export const routes = [{
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
