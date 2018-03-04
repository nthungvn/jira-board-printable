<template>
  <v-app>
    <v-toolbar color="blue darken-3" dark dense fixed clipped-left app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Jira Board Printable</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-layout align-center>
        <v-text-field placeholder="Sprint name" v-model='sprintName' single-line append-icon="search" :append-icon-cb='searchIssuesCurrentSprint' color="white" hide-details></v-text-field>
      </v-layout>
      <v-spacer></v-spacer>

      {{ numberOfIssue }} issues
      <v-btn color="blue" @click='openPrintDialog'>Print</v-btn>
    </v-toolbar>

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
import { jira } from './configs/vue-resource';
import IssueHandler from './assets/js/issue-handler'

export default {
  data() {
    return {
      isError: false,
      errorMessage: '',
      sprintName: process.env.INITIALIZATION_SPRINT_BOARD,
      issues: []
    };
  },
  methods: {
    openPrintDialog() {
      window.print();
    },
    searchIssuesCurrentSprint() {
      this.searchIssuesGivenSprint(this.sprintName);
    },
    searchIssuesGivenSprint(sprintName) {
      jira.searchIssues({
        jql: `Team = Innovation AND issuetype in standardIssueTypes() AND Sprint = "${sprintName}" ORDER BY Rank ASC`,
        fields: 'priority,issuetype,summary,assignee,subtasks,customfield_10002'
      }).then(response => {
        this.isError = false;
        let issueHandler = new IssueHandler(response.body);
        this.issues = issueHandler.getStories();
      }, response => {
        this.isError = true;
        this.errorMessage = response.body.errorMessages[0];
      });
    }
  },
  created() {
    this.searchIssuesGivenSprint(this.sprintName);
  },
  computed: {
    numberOfIssue: function() {
      return this.issues.length
    }
  }
}
</script>

<style>
</style>
