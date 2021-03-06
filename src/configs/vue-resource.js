import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.options.root = process.env.API_BASE_PATH;
Vue.http.headers.common['Authorization'] = process.env.API_AUTHORIZATION;

const customActions = {
  searchIssues: {
    method: 'GET',
    url: 'rest/api/2/search'
  },

  getFieldSuggestion: {
    method: 'GET',
    url: 'rest/api/2/jql/autocompletedata/suggestions'
  }
};

export default Vue.resource('', {}, customActions);
