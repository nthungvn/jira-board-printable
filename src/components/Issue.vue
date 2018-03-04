<template>
  <div class="j-card" :class="cardType">
    <div class="j-card-content">
      <div class="j-card-header">
        <div class="id">
          <b v-if='value.parentIssueKey'>{{ value.parentIssueKey }}/</b><span>{{ value.issueKey }}</span>
        </div>
        <span class="index end" v-if="index">{{ index }}</span>
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
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    },
    type: {
      type: String,
      default: "rectangle",
      validator: function(value) {
        return value == "square" || value == "rectangle";
      }
    }
  },

  data() {
    return {
      iconSize: "16px",
      avatarSize: "24px"
    };
  },

  computed: {
    cardType: function() {
      return this.type == "square" ? "j-card-square" : "j-card-rectangle";
    }
  }
};
</script>

<style lang="less" scoped>
.j-card {
  height: 250px;

  &-square {
    width: 250px;
  }

  &-rectangle {
    width: 350px;
  }
}
</style>
