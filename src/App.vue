<template>
  <v-app>
    <j-toolbar :searchAction="searchIssuesCurrentSprint" :numberOfIssues="numberOfIssues" @change="updateSprint"></j-toolbar>

    <v-content v-if="!isError">
      <div class="j-printable" :class="cardType">
        <j-issue v-for='issue in issues' :key='issue.issueKey.key' :index='issue.index' :value='issue' :type='typeOfIssue'></j-issue>
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
      typeOfIssue: TypeOfIssue.STORY,
      isError: false,
      errorMessage: "",
      issues: []
    };
  },

  methods: {
    searchIssuesCurrentSprint() {
      let handler = new SprintSearchHandler(this.$store.state.sprintName);
      handler.execute(response => this.updateSprint(response), this.typeOfIssue);
    },

    updateSprint(value) {
      Object.assign(this, value);
    }
  },

  computed: {
    numberOfIssues() {
      return this.issues.length;
    },

    cardType() {
      return this.typeOfIssue == TypeOfIssue.STORY ? "j-rectangle" : "j-square";
    }
  }
};
</script>

<style <style lang="less" scoped>
@import "./assets/css/jira-global.less";

.j-printable.j-rectangle {
  width: @story-page-width;
}

.j-printable.j-square {
  width: @task-page-width;
}

@media print {
  .j-printable.j-rectangle,
  .j-printable.j-square {
    width: auto;
  }
}
</style>
