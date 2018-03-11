<template>
  <v-app>
    <j-toolbar :searchAction="searchIssuesCurrentSprint" :numberOfIssues="numberOfIssues" @change="updateSprint"></j-toolbar>

    <v-content v-if="!isError">
      <router-view></router-view>
      <div class="j-printable">
        <j-issue v-for='(issue, index) in issues' :key='issue.issueKey.key' :index='issue.index' v-model='issues[index]'></j-issue>
      </div>
    </v-content>
    <v-content v-else>
      <v-layout align-center>
        <v-alert type="error" :value="isError">
          {{ errorMessage ? errorMessage : 'There is something wrong when the application send the request to server' }}
        </v-alert>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import SprintSearchHandler from "./assets/js/sprint-search-handler";
import TypeOfIssue from "./assets/js/type-of-issue";

export default {
  data() {
    return {
      sprintName: "",
      typeOfIssue: TypeOfIssue.STORY,
      isError: false,
      errorMessage: "",
      issues: []
    };
  },

  methods: {
    searchIssuesCurrentSprint() {
      let handler = new SprintSearchHandler(this.sprintName);
      handler.execute(response => Object.assign(this, response), this.typeOfIssue);
    },

    updateSprint(value) {
      Object.assign(this, value);
    }
  },

  computed: {
    numberOfIssues() {
      return this.issues.length;
    }
  }
};
</script>

<style>

</style>
