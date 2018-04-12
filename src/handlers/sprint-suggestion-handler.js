import Jira from '../configs/vue-resource';
import Optional from '../helpers/optional';
import Store from '../store';

export default class SprintSuggestionHandler {
  constructor(teamName) {
    this.teamName = teamName;
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
          errorMessage: Optional.ofNullable(error).map("body").map("errorMessages[0]").orElse(""),
        },
        sprintsSuggestion: []
      };
      Store.commit("updateRestfulData", payload);
    });
  }

  __mapSprints(successData) {
    return Optional.ofNullable(successData).map("body").map("results").orElse([])
      .map(el => {
        return {
          value: el.value,
          label: el.displayName.replace(/(\s*-.*\))|(\s*\(.*\))|<(.|\n)*?>/gm, '')
        }
      })
  }
}

SprintSuggestionHandler.INSTANCE = new SprintSuggestionHandler(Store.state.teamName);
