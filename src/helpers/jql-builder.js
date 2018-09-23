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

  sprint(sprint) {
    if (StringUtils.isNotEmpty(sprint)) {
      this.stringBuilder.push(`Sprint = ${sprint}`);
    }
    return this;
  }

  issueType(funtionType) {
    if (StringUtils.isNotEmpty(funtionType)) {
      this.stringBuilder.push(`issuetype in ${funtionType}`)
    }
    return this;
  }

  orderAsc(by) {
    this.stringBuilder.push(`ORDER BY ${by} ASC`);
    return this;
  }

  orderDesc(by) {
    this.stringBuilder.push(`ORDER BY ${by} DESC`);
    return this;
  }

  toString() {
    return this.stringBuilder.join(" ");
  }
}
