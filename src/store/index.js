import Vue from 'vue';
import Vuex from 'vuex';

import TypeOfIssue from '../enums/type-of-issue';
import IssueHandler from '../handlers/issue-handler';
import IssueFilter from '../helpers/issue-filter';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    teamName: process.env.TEAM_NAME,
    selectedSprint: "undefined",
    typeOfIssue: TypeOfIssue.STORY,
    errorHandling: {
      isError: false,
      errorMessage: ""
    },
    issueHandler: new IssueHandler(undefined),
    sprintsSuggestion: [],
    filters: {
      include: "",
      exclude: "",
      isDoneItems: false,
    },
    viewBean: {
      navigation: true,
      issue: {
        ordering: true
      }
    }
  },

  getters: {
    teamName: state => state.teamName,
    selectedSprint: state => state.selectedSprint,
    isError: state => state.errorHandling.isError,
    errorMessage: state => state.errorHandling.errorMessage,
    issues: state => {
      let originialIssues = state.typeOfIssue == TypeOfIssue.STORY ? state.issueHandler.getStories() : state.issueHandler.getTasks();
      return IssueFilter.INSTANCE.for(originialIssues).filter();
    },
    numberOfIssues: (state, getters) => getters.issues.length,
    sprintsSuggestion: state => state.sprintsSuggestion,
    isShowNavigation: state => state.viewBean.navigation
  },

  mutations: {
    // Property
    selectedSprint: (state, value) => state.selectedSprint = value,
    typeOfIssue: (state, value) => state.typeOfIssue = value,
    isDoneItems: (state, value) => state.filters.isDoneItems = value,
    toggleShowIssueOrdering: (state, value) => state.viewBean.issue.ordering = value,

    // Action
    updateRestfulData: (state, value) => Object.assign(state, value),
    toggleNavigation: state => state.viewBean.navigation = !state.viewBean.navigation,
    filterIncludes: (state, value) => state.filters.include = value,
    filterExcludes: (state, value) => state.filters.exclude = value,
  }
});
