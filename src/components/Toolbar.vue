<template>
  <v-toolbar color="blue darken-3" dark dense fixed clipped-left app>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="mr-5 align-center">
      <span class="title">Jira Board Printable</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-layout align-center>
      <v-text-field placeholder="Sprint name" single-line append-icon="search" color="white" hide-details
        :append-icon-cb='searchAction' v-model='value'></v-text-field>
    </v-layout>
    <v-spacer></v-spacer>

    <span>{{ numberOfIssues }} issues</span>
    <v-btn color="blue" @click='openPrintDialog'>Print</v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },

    searchAction: {
      type: Function,
      required: true
    },

    numberOfIssues: {
      type: Number,
      default: 0
    }
  },

  methods: {
    openPrintDialog() {
      window.print();
    }
  }
}
</script>

<style lang="less" scoped>

</style>
