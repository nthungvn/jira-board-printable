<template>
  <v-toolbar color="blue darken-3" dark dense fixed clipped-left app>
    <v-toolbar-side-icon @click.stop="toggleNavigation"></v-toolbar-side-icon>
    <v-toolbar-title class="mr-5 align-center">
      <span class="title">Jira Board Printable</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn-toggle class="mr-3" mandatory v-model="typeOfIssue">
      <v-btn :value="story" color="success">Story</v-btn>
      <v-btn :value="task" color="warning">Task</v-btn>
    </v-btn-toggle>

    <v-layout align-center>
      <v-select placeholder="Select or Enter sprint name" append-icon="search" autocomplete single-line hide-details cache-items
        :items="sprintsSuggestion" v-model="selectedSprint" item-value="value" item-text="label" :search-input.sync="searchValue"
        :append-icon-cb="search"></v-select>
    </v-layout>
    <v-spacer></v-spacer>

    <span>{{ numberOfIssues }} issues</span>
    <v-btn color="blue" @click='openPrintDialog'>Print</v-btn>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import SprintSearchHandler from "../handlers/sprint-search-handler";
import SprintSuggestionHandler from "../handlers/sprint-suggestion-handler";
import TypeOfIssue from "../enums/type-of-issue";

export default {
  props: {
  },

  data() {
    return {
      searchValue: "",
      typingTimer: undefined
    }
  },

  methods: {
    ...mapMutations([
      'toggleNavigation'
    ]),

    openPrintDialog() {
      window.print();
    },

    search() {
      SprintSearchHandler.createInstance(this.selectedSprint).execute();
    },

    shouldHasNewSearch(selectedSprint) {
      return this.sprintsSuggestion.filter(el => el.label == selectedSprint).length == 0;
    }
  },

  computed: {
    ...mapGetters([
      'selectedSprint',
      'numberOfIssues',
      'sprintsSuggestion'
    ]),

    story() {
      return TypeOfIssue.STORY;
    },

    task() {
      return TypeOfIssue.TASK;
    },

    selectedSprint: {
      get() {
        return this.$store.state.selectedSprint;
      },
      set(value) {
        this.$store.commit('selectedSprint', value);
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
  },

  watch: {
    searchValue(value) {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        value && this.shouldHasNewSearch(value) && SprintSuggestionHandler.createInstance(value).execute();
      }, 1000);
    }
  }
}
</script>

<style lang="less" scoped>

</style>
