import Optional from './optional';
import StringUtils from './string-utils';

export default class RegrexFilter {
  constructor(pattern) {
    this.pattern = Optional.ofNullable(pattern).orElse("")
      .split(",")
      .filter(value => StringUtils.isNotBlank(value))
      .map(value => this.__toRegrexGroup(value.trim()))
      .join("|");
  }

  testInclude(value) {
    let regrex = new RegExp(this.pattern, "gim");
    return regrex.test(Optional.ofNullable(value).orElse(""));
  }

  testExclude(value) {
    return !this.testInclude(value);
  }

  __toRegrexGroup(value) {
    return "(" + value + ")";
  }
}
