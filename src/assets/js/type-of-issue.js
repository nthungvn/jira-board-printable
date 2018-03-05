export default class TypeOfIssue {
  constructor(name, value) {
    this.name = name;
  }

  toString() {
    return `TypeOfIssue.${this.name}`;
  }
}

TypeOfIssue.STORY = new TypeOfIssue("STORY");
TypeOfIssue.TASK = new TypeOfIssue("TASK");
