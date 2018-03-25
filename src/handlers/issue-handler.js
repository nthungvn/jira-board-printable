import Optional from '../helpers/optional'

export default class IssueHandler {

  constructor(rawResponse) {
    this.rawIssues = Optional.ofNullable(rawResponse).map("body").map("issues").orElse([]);
  };

  /**
   * Gets all stories
   */
  getStories() {
    let stories = [];
    this.rawIssues.forEach((story, index) => {
      let {
        fields,
        key
      } = story;
      stories.push({
        index: index + 1,
        issueKey: key,
        summary: fields.summary,
        issueTypeUrl: this.__getIssueTypeUrl(fields.issuetype),
        priorityUrl: this.__getPriorityUrl(fields.priority),
        issuePoints: fields.customfield_10002
      })
    });
    return stories;
  }

  /**
   * Gets all tasks
   */
  getTasks() {
    let tasks = [];
    this.rawIssues.forEach((story, index) => {
      story.fields.subtasks.forEach(task => {
        let {
          fields,
          key
        } = task;
        tasks.push({
          index: index + 1,
          parentIssueKey: story.key,
          issueKey: key,
          summary: fields.summary,
          issueTypeUrl: this.__getIssueTypeUrl(fields.issuetype),
          priorityUrl: this.__getPriorityUrl(fields.priority)
        })
      });
    });
    return tasks;
  }

  __getPriorityUrl(priority) {
    return priority.iconUrl;
  }

  __getIssueTypeUrl(issueType) {
    return issueType.iconUrl;
  }

}
