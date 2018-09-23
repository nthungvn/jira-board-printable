import StringUtils from "./string-utils"

export default class JqlBuilder {
  constructor() {
    this.stringBuilder = [];
  }

  static createInstance() {
    return new JqlBuilder();
  }

  /**
   * And operator
   */
  and() {
    this.stringBuilder.push("AND");
    return this;
  }

  /**
   * Add team name to query
   * @param {String} teamName Name of the team
   */
  team(teamName) {
    if (StringUtils.isNotEmpty(teamName)) {
      this.stringBuilder.push(`Team = "${teamName}"`);
    }
    return this;
  }

  /**
   * Filters by sprint
   * @param {String} sprint Sprint name or Sprint ID/code
   */
  sprint(sprint) {
    if (StringUtils.isNotEmpty(sprint)) {
      this.stringBuilder.push(`Sprint = ${sprint}`);
    }
    return this;
  }

  /**
   * Filters issue type
   * @param {String} funtionType Standard function of issue type
   */
  issueType(funtionType) {
    if (StringUtils.isNotEmpty(funtionType)) {
      this.stringBuilder.push(`issuetype in ${funtionType}`)
    }
    return this;
  }

  /**
   * Sorts as ascending
   * @param {String} by Field will be sorted
   */
  orderAsc(by) {
    this.stringBuilder.push(`ORDER BY ${by} ASC`);
    return this;
  }

  /**
   * Sorts as descending
   * @param {String} by Field will be sorted
   */
  orderDesc(by) {
    this.stringBuilder.push(`ORDER BY ${by} DESC`);
    return this;
  }

  /**
   * Returns a JQL query
   */
  toString() {
    return this.stringBuilder.join(" ");
  }
}
