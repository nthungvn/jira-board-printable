<template>
  <div class="j-card">
    <div class="j-card-header">
      <v-avatar size="16px">
        <img :src="value.issueTypeUrl" alt="Issue type">
      </v-avatar>
      <v-avatar size="16px">
        <img :src="value.priorityUrl" alt="Priority">
      </v-avatar>
      <v-avatar size="32px">
        <img :src="value.avatarUrl" alt="Assignee">
      </v-avatar>
    </div>

    <div>
      <v-breadcrumbs divider="/">
        <v-breadcrumbs-item :href='value.parentIssueKey.href' v-if='value.parentIssueKey.key != ""'>
          {{ value.parentIssueKey.key }}
        </v-breadcrumbs-item>
        <v-breadcrumbs-item :href='value.issueKey.href'>
          {{ value.issueKey.key }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </div>

    <div>
      <div class="title">{{ value.summary }}</div>
    </div>

    <div>
      <v-badge color="grey">
        <span slot="badge">{{ value.issuePoints }}</span>
      </v-badge>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {};
  }
}
</script>

<style scope>
.j-card {
  border: 1px solid grey;
  padding: 20px;
  width: 350px;
  height: 233px;
  box-sizing: border-box;
  float: left;
  margin: 2px;
  position: relative;
}

.breadcrumbs {
  padding: 0px;
}

@media print {
  .j-card {
    page-break-inside: avoid;
  }
}
</style>
