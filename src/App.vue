<template>
  <v-app>
    <j-toolbar v-model="sprintName" :searchAction="searchIssuesCurrentSprint" :numberOfIssues="numberOfIssues"></j-toolbar>

    <v-content>
      <div v-if='!isError' class="j-printable">
        <j-issue v-for='(issue, index) in issues' :key='issue.issueKey.key' :index='index + 1' v-model='issues[index]'></j-issue>
      </div>
      <v-layout align-center v-if='isError'>
        <v-alert type="error" :value="isError">
          {{ errorMessage ? errorMessage : 'There is something wrong when the application send the request to server' }}
        </v-alert>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import SprintSearchHandler from "./assets/js/sprint-search-handler";

export default {
  data() {
    return {
      sprintName: process.env.INITIALIZATION_SPRINT_BOARD,
      isError: false,
      errorMessage: "",
      issues: []
    };
  },

  methods: {
    searchIssuesCurrentSprint() {
      let handler = new SprintSearchHandler(this.sprintName);
      handler.execute(response => Object.assign(this, response));
    }
  },

  computed: {
    numberOfIssues: function() {
      return this.issues.length;
    }
  }
};
</script>

<style>

</style>
