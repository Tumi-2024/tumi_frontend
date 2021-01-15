<template>
<div class="row bg-white notosanskr-medium" style="padding: 24px 0 20px; margin-bottom: 8px;">
  <div class="col-12">
    <div class="row" style="padding: 0 16px 16px;">
      <div class="col-12">
        <span style="font-size: 17px; letter-spacing: -1.275px; color: #1A1A1A; line-height: 26px;">
        학교
      </span>
      </div>
    </div>
    <div class="row">
    <div class="col-12">
      <q-tabs
        v-model="school_tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab  v-for="tab in school_tabs" :key="tab.level" :name="tab.level" :label="tab.label" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="school_tab" animated>
        <q-tab-panel v-for="tab in school_tabs" :key="tab.level" :name="tab.level" >
          <div class="row school" v-for="school in tab.schools" :key="school.name">
            <div class="col-6">{{ school.name }}</div>
            <div class="col-6 text-right">{{ school.distance }}</div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      school_tabs: [
        { 'level': 'kindergarten', 'label': '유치원', 
          schools: [
            {'name': '새나라 어린이집', 'distance': '500M이내' },
            {'name': '금모래 유치원', 'distance': '620M이내' },
            {'name': '푸리울 어린이집', 'distance': '620M이내' },
            {'name': '꿈샘 어린이집', 'distance': '700M이내' },
            {'name': '노랑노랑 유치원', 'distance': '700M이내' }
          ] 
        },
        { 'level': 'elementary', 'label': '초등학교' },
        { 'level': 'middle', 'label': '중학교' },
        { 'level': 'high', 'label': '고등학교' },
      ],
      school_tab: 'kindergarten',
    }
  }
}
</script>
<style lang="scss" scoped>
.school {
  font-size: 14px;
  line-height: 44px;
  letter-spacing: -1.05px;
  border-bottom: 1px solid #E8E8E8;
}

.school div:nth-child(1) {
  color: #1A1A1A;
}
.school div:nth-child(2) {
  color: #909090;
}
</style>