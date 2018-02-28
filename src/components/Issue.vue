<template>
  <div class="j-card">
    <div class="j-card-content">
      <div class="j-card-header">
        <div class="id">
          <span v-if='value.parentIssueKey'>{{ value.parentIssueKey }}</span>
          <span>{{ value.issueKey }}</span>
        </div>
        <span class="index end">{{ index }}</span>
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

        <span class="badge end">{{ value.issuePoints }} pts</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "index"],
  data() {
    return {
      iconSize: "16px",
      avatarSize: "24px"
    };
  }
};
</script>

<style lang="less" scoped>
</style>
