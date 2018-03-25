import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import TypeOfIssue from '../enums/type-of-issue'

export default new Vuex.Store({
  strict: true,
  state: {
    sprintName: process.env.INITIALIZATION_SPRINT_BOARD,
    typeOfIssue: TypeOfIssue.STORY
  },

  getters: {
  },

  mutations: {
    sprintName: (state, value) => state.sprintName = value,
    typeOfIssue: (state, value) => state.typeOfIssue = value,
  }
});
