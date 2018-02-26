<template>
  <div class="j-card">
    <div class="j-card-content">
      <div class="j-card-header">
        <v-avatar size="16px">
          <img :src="value.issueTypeUrl" alt="Issue type">
        </v-avatar>
        <v-avatar size="16px">
          <img :src="value.priorityUrl" alt="Priority">
        </v-avatar>
        <v-avatar class="j-assignee" size="24px">
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

      <div class="j-card-summary">
        <div class="title">{{ value.summary }}</div>
      </div>

      <div class="j-card-footer">
        <v-badge color="grey">
          <span slot="badge">{{ value.issuePoints }}</span>
        </v-badge>
      </div>
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
  height: 230px;
  float: left;
  margin: 2px;
  position: relative;
}

.j-card-content {
  height: 100%;
  position: relative;
}

.j-card-header {
  height: 24px;
}

.j-card-header .j-assignee {
  position: absolute;
  top: 0;
  right: 0;
}

.j-card-footer {
  height: 25px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
}

@media print {
  .j-card {
    page-break-inside: avoid;
  }
}
</style>
