import Jira from '../configs/vue-resource';
import IssueHandler from './issue-handler';
import TypeOfIssue from '../enums/type-of-issue';
import Optional from '../helpers/optional';
import Store from '../store';

export default class SprintSearchHandler {
  constructor(sprintName) {
    this.sprintName = sprintName;
  }

  static createInstance(sprintName) {
    return new SprintSearchHandler(sprintName);
  }

  execute() {
    let payload = {};
    Jira.searchIssues({
      jql: `Team = "${Store.state.teamName}" AND issuetype in standardIssueTypes() AND Sprint = ${this.sprintName} ORDER BY Rank ASC`,
      fields: 'priority,issuetype,summary,assignee,subtasks,customfield_10002'
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
          errorMessage: Optional.ofNullable(error).map("body").map("errorMessages[0]").orElse(""),
        },
        issueHandler: new IssueHandler(undefined)
      };
      Store.commit('updateRestfulData', payload);
    });
  }
}
