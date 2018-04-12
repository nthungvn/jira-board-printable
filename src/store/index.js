import Vue from 'vue';
import Vuex from 'vuex';

import TypeOfIssue from '../enums/type-of-issue'
import IssueHandler from '../handlers/issue-handler'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    teamName: process.env.TEAM_NAME,
    sprintName: process.env.INITIALIZATION_SPRINT_BOARD,
    typeOfIssue: TypeOfIssue.STORY,
    errorHandling: {
      isError: false,
      errorMessage: ""
    },
    issueHandler: new IssueHandler(undefined),
    sprintsSuggestion: []
  },

  getters: {
    isError: state => state.errorHandling.isError,
    errorMessage: state => state.errorHandling.errorMessage,
    issues: state => state.typeOfIssue == TypeOfIssue.STORY ? state.issueHandler.getStories() : state.issueHandler.getTasks(),
    numberOfIssues: (state, getters) => getters.issues.length
  },

  mutations: {
    // Property
    sprintName: (state, value) => state.sprintName = value,
    typeOfIssue: (state, value) => state.typeOfIssue = value,

    // Action
    updateRestfulData: (state, value) => Object.assign(state, value),
  }
});
