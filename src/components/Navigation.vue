<template>
    <v-navigation-drawer fixed clipped app v-model="isShow">
      <v-subheader class="mt-3">FILTERS</v-subheader>
      <v-divider></v-divider>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      isShow: "isShowNavigation"
    })
  }
}
</script>

<style lang="less" scoped>

</style>
