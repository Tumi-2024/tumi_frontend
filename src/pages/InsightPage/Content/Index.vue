<template>
  <div class="q-mt-sm" style="max-width: 1000px;">
    <q-card flat class="q-mt-sm">
      <q-card-section>
        <div class="area-title">{{insight.title}}</div>
        <div class="row area-date">
          <div class="date">{{ insight.category }}</div>
          <div class="line"></div>
          <div class="value">{{ insight.date }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-img
            class="img-background"
            :src="insight.image"
            native-context-menu
            basic
        />
      </q-card-section>
      <q-card-section class="area-description">
        {{ insight.description }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "InsightPageContent",
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    insight () {
      const id = this.$route.params.id
      return this.$store.getters.allInsights.filter(item => item.id === id)[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.area-description {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px !important;
  margin-top: 8px;
  letter-spacing: -0.98px;
  color: #707070;
  white-space: pre-line;
}
.area-title {
  font-weight: 600;
  font-size: 19px;
  line-height: 26px;
  letter-spacing: -1.35px;
  color: #1A1A1A;
  margin-left: 0px;
}

.area-date {
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.98px;
  color: #909090;
  margin-top: 8px;
  margin-left: 0px;
    div.date {
      padding-right: 4px;
    }
    div.line {
      border-right: 1px solid #E8E8E8;
      height: 12px;
      margin-top: 4px;
    }
    div.value {
      padding-left: 4px;
    }
}
</style>
