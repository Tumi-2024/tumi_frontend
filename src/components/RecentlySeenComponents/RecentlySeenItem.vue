<template>
  <q-item class="column  notosanskr-regular ">
    <q-item-section>
      <div class="row">

        <!-- badge for item type -->
        <custom-badge :label="tags.type"></custom-badge>
        <!-- badge for item status -->
        <custom-badge 
          :label="tags.recomend" 
          text_color="primary" 
          bg_color="white"
          outline_color="primary"
          :outline="true" 
          v-if="tags.recomend"></custom-badge>
        <!-- badge for redevelopment -->
        <custom-badge label="재개발" text_color="grey" bg_color="white" :outline="true" icon="redevelop" v-if="tags.redevelopment"></custom-badge>
        <!-- badge for item date -->
        <custom-badge :label="tags.date" text_color="grey" bg_color="white" :outline="true"></custom-badge>
      </div>
    </q-item-section>
    <q-item-section class="area-name q-pt-sm">
      {{ name }}
    </q-item-section>
    <q-item-section class="area-amount">
      {{ amount }}
    </q-item-section>
    <div class="additional-info row items-center q-pt-sm">
      <div>전용면적 116㎡(30평)</div>
      <div>고층</div>
      <q-icon size="16px">
        <img src="~assets/icons/sun.svg" />
      </q-icon>
      <div>
        남서향
      </div>
    </div>
    <q-separator style="margin-top: 20px" />
  </q-item>
</template>

<script>
import CustomBadge from 'src/components/Utilities/CustomBadge'

export default {
  props: {
    tags: Object,
    name: String,
    amount: String
  },
  components: {
    'custom-badge': CustomBadge
  }
};
</script>

<style lang="scss" scoped>
.area-name {
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -1.05px;
  color: #707070;
  margin-left: 0px;
}
.area-amount {
  font-weight: 500;
  font-size: 19px;
  line-height: 26px;
  letter-spacing: -1.35px;
  color: #00a4aa;
  margin-left: 0px;
}
.additional-info {
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.9px;
  color: #3a3a3a;
  div {
    background: #f6f6f6;
    margin-right: 7px;
  }
}
</style>
