import Vue from 'vue';
import Vuex from 'vuex';

import TypeOfIssue from '../enums/type-of-issue'
import IssueHandler from '../handlers/issue-handler'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    sprintName: process.env.INITIALIZATION_SPRINT_BOARD,
    typeOfIssue: TypeOfIssue.STORY,
    rest: {
      isError: false,
      errorMessage: "",
      issueHandler: new IssueHandler(undefined)
    },
  },

  getters: {
    isError: state => state.rest.isError,
    errorMessage: state => state.rest.errorMessage,
    issues: state => state.typeOfIssue == TypeOfIssue.STORY ? state.rest.issueHandler.getStories() : state.rest.issueHandler.getTasks(),
    numberOfIssues: (state, getters) => getters.issues.length
  },

  mutations: {
    // Property
    sprintName: (state, value) => state.sprintName = value,
    typeOfIssue: (state, value) => state.typeOfIssue = value,

    // Action
    updateRestfulData: (state, value) => Object.assign(state.rest, value),
  }
});
