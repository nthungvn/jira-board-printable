import Jira from '../configs/vue-resource';
import Optional from '../helpers/optional';
import Store from '../store';

export default class SprintSuggestionHandler {
  constructor(teamName) {
    this.teamName = teamName;
  }

  static createInstance(teamName) {
    return new SprintSuggestionHandler(teamName);
  }

  execute() {
    let payload = {};
    Jira.getFieldSuggestion({
      fieldName: 'Sprint',
      fieldValue: this.teamName
    }).then(success => {
      payload = {
        errorHandling: {
          isError: false,
          errorMessage: '',
        },
        sprintsSuggestion: this.__mapSprints(success)
      };
      Store.commit("updateRestfulData", payload);
    }, error => {
      payload = {
        errorHandling: {
          isError: true,
          errorMessage: Optional.ofNullable(error).mapJson("body").mapJson("errorMessages[0]").orElse(""),
        },
        sprintsSuggestion: []
      };
      Store.commit("updateRestfulData", payload);
    });
  }

  __mapSprints(successData) {
    return Optional.ofNullable(successData).mapJson("body").mapJson("results").orElse([])
      .map(el => {
        return {
          value: el.value,
          label: el.displayName.replace(/(\s*-.*\))|(\s*\(.*\))|<(.|\n)*?>/gm, '')
        }
      })
  }
}

SprintSuggestionHandler.INSTANCE = new SprintSuggestionHandler(Store.state.teamName);
