import { jira } from '../../configs/vue-resource';
import IssueHandler from './issue-handler'

export default class SprintSearchHandler {
  constructor(sprintName) {
    this.sprintName = sprintName;
  }

  execute(callback) {
    let result = {};
    jira.searchIssues({
      jql: `Team = Innovation AND issuetype in standardIssueTypes() AND Sprint = "${this.sprintName}" ORDER BY Rank ASC`,
      fields: 'priority,issuetype,summary,assignee,subtasks,customfield_10002'
    }).then(response => {
      let issueHandler = new IssueHandler(response.body);
      result = {
        isError : false,
        errorMessage: '',
        issues : issueHandler.getStories()
      };
      callback(result);
    }, response => {
      result = {
        isError : true,
        errorMessage : response.body.errorMessages[0],
        issues : []
      };
      callback(result);
    });
  }
}
