import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sprintName: process.env.INITIALIZATION_SPRINT_BOARD
  },

  getters: {
    sprintName: state => state.sprintName,
  }
});
