<template>
  <q-card class="bg-white notosanskr-medium">
    <q-card-section class="heading-title">
      학교
    </q-card-section>

    <q-card-section>
      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab
          v-for="tab in tabs"
          :key="tab.level"
          :name="tab.level"
          :label="tab.label"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel v-for="tab in tabs" :key="tab.level" :name="tab.level">
          <div
            class="row school"
            v-for="school in tab.schools"
            :key="school.name"
          >
            <div class="col-6 label">{{ school.name }}</div>
            <div class="col-6 text-right value">{{ school.distance }}</div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  data() {
    return {
      activeTab: ""
    };
  },
  props: {
    active: {
      type: String,
      default: ""
    },
    tabs: {
      type: Array,
      default: () => [
        {
          level: "kindergarten",
          label: "유치원",
          schools: [{ name: "_", distance: "_" }]
        },
        { level: "elementary", label: "초등학교" },
        { level: "middle", label: "중학교" },
        { level: "high", label: "고등학교" }
      ]
    }
  },
  created() {
    this.activeTab = this.active || "kindergarten";
  }
};
</script>
<style lang="scss" scoped>
.heading-title {
  font-size: 17px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  line-height: 26px;
}
.school {
  font-size: 14px;
  line-height: 44px;
  letter-spacing: -1.05px;
  border-bottom: 1px solid #e8e8e8;
  .label {
    color: #1a1a1a;
  }
  .value {
    color: #909090;
  }
}
</style>
