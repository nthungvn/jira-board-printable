import Jira from '../configs/vue-resource';
import IssueHandler from './issue-handler';
import Optional from '../helpers/optional';
import Store from '../store';
import JqlBuilder from '../helpers/jql-builder';

export default class SprintSearchHandler {
  constructor(selectedSprint) {
    this.selectedSprint = selectedSprint;
  }

  static createInstance(selectedSprint) {
    return new SprintSearchHandler(selectedSprint);
  }

  execute() {
    let payload = {};
    Jira.searchIssues({
      jql: JqlBuilder.createInstance().team(Store.state.teamName).and()
        .issueType("standardIssueTypes()")
        .and().sprint(this.selectedSprint)
        .orderAsc("Rank")
        .toString(),
      fields: 'priority,issuetype,summary,assignee,subtasks,customfield_10002,status'
    }).then(success => {
      payload = {
        errorHandling: {
          isError: false,
          errorMessage: '',
        },
        issueHandler: new IssueHandler(success)
      };
      Store.commit('updateRestfulData', payload);
    }, error => {
      payload = {
        errorHandling: {
          isError: true,
          errorMessage: Optional.ofNullable(error).mapJson("body").mapJson("errorMessages[0]").orElse(""),
        },
        issueHandler: new IssueHandler(undefined)
      };
      Store.commit('updateRestfulData', payload);
    });
  }
}
