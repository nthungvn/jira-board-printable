<template>
    <v-navigation-drawer fixed clipped app :value="isShow">
      <v-subheader class="mt-3">FILTERS</v-subheader>
      <v-form class="filters">
        <v-text-field label="Includes" placeholder="Ex: Acrevis, ACR" clearable v-model="includes"></v-text-field>
        <v-text-field label="Excludes" placeholder="Ex: Crosstest" clearable v-model="excludes"></v-text-field>
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
    }
  }
}
</script>

<style lang="less" scoped>
.filters {
  padding: 0 1em;
}
</style>
