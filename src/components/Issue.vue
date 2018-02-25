<template>
  <v-container>
    <v-layout wrap justify-end class="issue">
      <v-flex xs11>
        <v-avatar size="16px">
          <img :src="value.issueTypeUrl" alt="Issue type">
        </v-avatar>
        <v-avatar size="16px">
          <img :src="value.priorityUrl" alt="Priority">
        </v-avatar>
      </v-flex>
      <v-flex xs1>
        <v-avatar size="32px">
          <img :src="value.avatarUrl" alt="Assignee">
        </v-avatar>
      </v-flex>

      <v-flex>
        <v-breadcrumbs divider="/">
          <v-breadcrumbs-item :href='value.parentIssueKey.href' v-if='value.parentIssueKey.key != ""'>
            {{ value.parentIssueKey.key }}
          </v-breadcrumbs-item>
          <v-breadcrumbs-item :href='value.issueKey.href'>
            {{ value.issueKey.key }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>

      <v-flex class="pt-4" xs12>
        <div class="title">{{ value.summary }}</div>
      </v-flex>

      <v-flex class="pt-5" xs1>
        <v-badge color="grey">
          <span slot="badge">{{ value.issuePoints }}</span>
        </v-badge>
      </v-flex>
    </v-layout>
  </v-container>
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
.issue {
  border: 1px solid grey;
  padding: 20px;
  min-height: 6cm;
}

.breadcrumbs {
  padding: 0px;
}

@media print {
  .issue {
    page-break-inside: avoid;
  }
}
</style>
