import RegrexFilter from './regrex-filter';
import Optional from './optional';
import StringUtils from './string-utils';
import Store from '../store';

export default class IssueFilter {
  for (issues) {
    this.issues = issues;
    return this;
  }

  filter() {
    Optional.ofNullable(Store.state.filters.include)
      .filter(StringUtils.isNotBlank)
      .ifPresent(pattern => {
        let filter = new RegrexFilter(pattern);
        this.issues = this.issues.filter(issue => filter.testInclude(issue.summary))
      });
    Optional.ofNullable(Store.state.filters.exclude)
      .filter(StringUtils.isNotBlank)
      .ifPresent(pattern => {
        let filter = new RegrexFilter(pattern);
        this.issues = this.issues.filter(issue => filter.testExclude(issue.summary))
      });
    Optional.ofNullable(Store.state.filters.isDoneItems)
      .filter(value => value === false)
      .ifPresent(value => this.issues = this.issues.filter(this.__isNotDone));
    return this.issues;
  }

  __isNotDone(issue) {
    return !Optional.ofNullable(issue)
      .map(issue => issue.status)
      .map(status => status === "Resolved" || status === "Closed")
      .orElse(false);
  }
}

IssueFilter.INSTANCE = new IssueFilter();
