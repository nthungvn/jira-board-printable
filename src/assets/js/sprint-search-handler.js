import Jira from '../../configs/vue-resource';
import IssueHandler from './issue-handler'
import TypeOfIssue from './type-of-issue'
import Optional from '../../helpers/optional'

export default class SprintSearchHandler {
  constructor(sprintName) {
    this.sprintName = sprintName;
  }

  execute(callback, typeOfIssue = TypeOfIssue.STORY) {
    let result = {};
    Jira.searchIssues({
      jql: `Team = Innovation AND issuetype in standardIssueTypes() AND Sprint = "${this.sprintName}" ORDER BY Rank ASC`,
      fields: 'priority,issuetype,summary,assignee,subtasks,customfield_10002'
    }).then(response => {
      let issueHandler = new IssueHandler(response.body);
      result = {
        isError : false,
        errorMessage: '',
        issues : typeOfIssue == TypeOfIssue.STORY ? issueHandler.getStories() : issueHandler.getTasks()
      };
      callback(result);
    }, response => {
      result = {
        isError : true,
        errorMessage : Optional.ofNullable(response).map("body").map("errorMessages[0]").orElse(""),
        issues : []
      };
      callback(result);
    });
  }
}
