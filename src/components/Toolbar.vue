<template>
  <v-toolbar color="blue darken-3" dark dense fixed clipped-left app>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="mr-5 align-center">
      <span class="title">Jira Board Printable</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn-toggle class="mr-3" mandatory v-model="typeOfIssue">
      <v-btn :value="story" color="success">Story</v-btn>
      <v-btn :value="task" color="warning">Task</v-btn>
    </v-btn-toggle>

    <v-layout align-center>
      <v-text-field placeholder="Sprint name" single-line append-icon="search" color="white" hide-details
        :append-icon-cb='search' v-model='sprintName'></v-text-field>
    </v-layout>
    <v-spacer></v-spacer>

    <span>{{ numberOfIssues }} issues</span>
    <v-btn color="blue" @click='openPrintDialog'>Print</v-btn>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';
import SprintSearchHandler from "../handlers/sprint-search-handler";
import TypeOfIssue from "../enums/type-of-issue";

export default {
  props: {
  },

  data() {
    return {
    }
  },

  methods: {
    openPrintDialog() {
      window.print();
    },

    search() {
      SprintSearchHandler.createInstance(this.$store.state.sprintName).execute();
    }
  },

  computed: {
    ...mapGetters(['numberOfIssues']),

    story() {
      return TypeOfIssue.STORY;
    },

    task() {
      return TypeOfIssue.TASK;
    },

    sprintName: {
      get() {
        return this.$store.state.sprintName;
      },
      set(value) {
        this.$store.commit('sprintName', value);
      }
    },

    typeOfIssue: {
      get() {
        return this.$store.state.typeOfIssue;
      },
      set(value) {
        this.$store.commit('typeOfIssue', value);
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
