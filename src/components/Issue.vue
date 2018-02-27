<template>
  <div class="j-card">
    <div class="j-card-content">
      <div class="j-card-header">
        <div class="j-card-id">
          <span v-if='value.parentIssueKey != ""'>{{ value.parentIssueKey }}</span>
          <span>{{ value.issueKey }}</span>
        </div>
        <span class="j-index j-end">{{ index + 1 }}</span>
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

        <span class="j-badge j-end">{{ value.issuePoints }} pts</span>
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
.j-card-footer {
  .j-badge {
    background: grey;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
  }
}

@media print {
  .j-card-footer {
    .j-badge {
      color: black;
      width: auto;
      height: auto;
    }
  }
}
</style>
