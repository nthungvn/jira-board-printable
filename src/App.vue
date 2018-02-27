<template>
  <v-app>
    <v-toolbar color="blue darken-3" dark dense fixed clipped-left app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Jira Board Printable</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-layout align-center>
        <v-text-field placeholder="Sprint name" v-model='sprintName' single-line append-icon="search" :append-icon-cb="() => {}" color="white" hide-details></v-text-field>
      </v-layout>
      <v-spacer></v-spacer>

      {{ numberOfIssue }} issues
      <v-btn color="blue" @click='openPrintDialog'>Print</v-btn>
    </v-toolbar>

    <v-content>
      <div v-if='!isError' class="j-printable">
        <j-issue v-for='(issue, index) in issues' :key='issue.issueKey.key' :index='index' v-model='issues[index]'></j-issue>
      </div>
      <v-layout align-center v-if='isError'>
        <v-alert type="error" :value="isError">
          There is something wrong when the application send the request to server
        </v-alert>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import {jira} from './configs/vue-resource.js'

export default {
  data() {
    return {
      unAssigneeAvatarUrl: 'https://jira.axonivy.com/jira/secure/useravatar?size=medium&avatarId=10123',
      isError: false,
      sprintName: process.env.INITIALIZATION_SPRINT_BOARD,
      issues: []
    };
  },
  methods: {
    openPrintDialog() {
      window.print();
    },
    toJiraJson(response) {
      let rawIssues = response.issues || [];
      let data = [];
      for (let issue of rawIssues) {
        data.push({
          issueTypeUrl: issue.fields.issuetype.iconUrl,
          priorityUrl: issue.fields.priority.iconUrl,
          parentIssueKey: '',
          issueKey: issue.key,
          avatarUrl: issue.fields.assignee != undefined ? issue.fields.assignee.avatarUrls['32x32'] : this.unAssigneeAvatarUrl,
          summary: issue.fields.summary,
          issuePoints: issue.fields.customfield_10002
        })
      }
      return data;
    }
  },
  created() {
    jira.searchIssues({
      jql: `Team = Innovation AND issuetype in standardIssueTypes() AND Sprint = "${this.sprintName}" ORDER BY Rank ASC`,
      fields: 'priority,issuetype,summary,assignee,subtasks,customfield_10002'
    }).then(response => {
      this.isError = false;
      this.issues = this.toJiraJson(response.body);
    }, response => this.isError = true);
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
