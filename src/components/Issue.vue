<template>
  <div class="j-card">
    <div class="j-card-content">
      <div class="j-card-header">
        <div class="j-card-id">
          <span v-if='value.parentIssueKey != ""'>{{ value.parentIssueKey }}</span>
          <span>{{ value.issueKey }}</span>
        </div>
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

        <span class="j-badge">{{ value.issuePoints }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      iconSize: '16px',
      avatarSize: '24px'
    };
  }
}
</script>

<style scope>
.j-card {
  border: 1px solid grey;
  padding: 20px;
  width: 350px;
  height: 230px;
  float: left;
  margin: 2px;
  position: relative;
}

.j-card-content {
  height: 100%;
  position: relative;
}

.j-card-id {
  color: gray;
}
.j-card-header {
  height: 24px;
}

.j-card-summary {
  padding-top: 20px;
}

.j-card-summary .title {
  line-height: 1.5em !important;
}

.j-card-footer {
  height: 25px;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.j-card-footer .j-badge {
  position: inherit;
  right: 0;
  background: grey;
  color: white;
  border-radius:50%;
  width: 20px;
  height: 20px;
  text-align: center;
}

@media print {
  .j-card {
    page-break-inside: avoid;
  }
}
</style>
