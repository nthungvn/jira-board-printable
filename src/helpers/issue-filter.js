import RegrexFilter from './regrex-filter';
import Optional from './optional';
import Store from '../store';

export default class IssueFilter {
  for(issues) {
    this.issues = issues;
    return this;
  }

  filter() {
    Optional.ofNullable(Store.state.filters.include).ifPresent(pattern => {
      let filter = new RegrexFilter(pattern);
      this.issues = this.issues.filter(issue => filter.testInclude(issue.summary))
    });
    Optional.ofNullable(Store.state.filters.exclude).ifPresent(pattern => {
      let filter = new RegrexFilter(pattern);
      this.issues = this.issues.filter(issue => filter.testExclude(issue.summary))
    });
    return this.issues;
  }
}

IssueFilter.INSTANCE = new IssueFilter();
