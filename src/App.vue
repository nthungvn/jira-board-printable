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
import SprintSearchHandler from "./assets/js/sprint-search-handler";

export default {
  data() {
    return {
      handler: {},
      sprintName: process.env.INITIALIZATION_SPRINT_BOARD,
      isError: false,
      errorMessage: "",
      issues: []
    };
  },

  methods: {
    openPrintDialog() {
      window.print();
    },

    searchIssuesCurrentSprint() {
      this.handler = new SprintSearchHandler(this.sprintName);
      this.handler.execute(response => Object.assign(this, response));
    }
  },

  created() {
    this.handler = new SprintSearchHandler(this.sprintName);
    this.handler.execute(response => Object.assign(this, response));
  },

  computed: {
    numberOfIssue: function() {
      return this.issues.length;
    }
  }
};
</script>

<style>

</style>
