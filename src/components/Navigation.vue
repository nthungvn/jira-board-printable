<template>
    <v-navigation-drawer fixed clipped app :value="isShow">
      <v-subheader class="mt-3">FILTERS</v-subheader>
      <v-form class="filters">
        <v-text-field label="Includes" placeholder="Ex: Acrevis, ACR" clearable v-model="includes"></v-text-field>
        <v-text-field label="Excludes" placeholder="Ex: Crosstest" clearable v-model="excludes"></v-text-field>
        <v-checkbox label="Done items" color="primary" v-model="isDoneItems"></v-checkbox>
      </v-form>
      <v-subheader class="mt-3">GLOBAL SETTINGS</v-subheader>
      <v-form class="global-settings">
        <v-text-field label="Team" placeholder="Team name" :value="teamName" disabled></v-text-field>
        <v-checkbox label="Show ordering" color="primary" v-model="showOrdering"></v-checkbox>
      </v-form>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      isShow: "isShowNavigation"
    }),

    ...mapGetters([
      "teamName",
    ]),

    includes: {
      get() {
        return this.$store.state.filters.include;
      },
      set(value) {
        this.$store.commit("filterIncludes", value);
      }
    },

    excludes: {
      get() {
        return this.$store.state.filters.exclude;
      },
      set(value) {
        this.$store.commit("filterExcludes", value);
      }
    },

    isDoneItems: {
      get() {
        return this.$store.state.filters.isDoneItems
      },

      set(value) {
        this.$store.commit("isDoneItems", value)
      }
    },

    showOrdering: {
      get() {
        return this.$store.state.viewBean.issue.ordering;
      },
      set(value) {
        this.$store.commit("toggleShowIssueOrdering", value);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.filters, .global-settings {
  padding: 0 1em;
}
</style>
