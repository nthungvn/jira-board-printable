<template>
  <div class="j-card" :class="cardType">
    <div class="j-card-content">
      <div class="j-card-header">
        <div class="id">
          <b v-if='value.parentIssueKey'>{{ value.parentIssueKey }}/</b><span>{{ value.issueKey }}</span>
        </div>
        <span class="index end" v-if="index && isShowOrdering">{{ index }}</span>
      </div>

      <div class="j-card-summary">
        <div class="title">{{ value.summary }}</div>
      </div>

      <div class="j-card-footer">
        <v-avatar :size="iconSize">
          <img :src="value.issueTypeUrl" alt="Issue type">
        </v-avatar>
        <v-avatar :size="iconSize">
          <img :src="value.priorityUrl" alt="Priority">
        </v-avatar>

        <span class="badge end" v-if="value.issuePoints">{{ value.issuePoints }} pts</span>
      </div>
    </div>
  </div>
</template>

<script>
import TypeOfIssue from "../enums/type-of-issue";

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    }
  },

  data() {
    return {
      iconSize: "16px",
      avatarSize: "24px"
    };
  },

  computed: {
    cardType() {
      return this.$store.state.typeOfIssue == TypeOfIssue.STORY ? "j-card-rectangle" : "j-card-square";
    },

    isShowOrdering() {
      return this.$store.state.viewBean.issue.ordering;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/jira-variables.less";

.j-card {
  height: @card-height;

  &-square {
    width: @square-width;
  }

  &-rectangle {
    width: @rectangle-width;
  }
}
</style>
