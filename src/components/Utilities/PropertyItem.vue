<template>
  <q-item
    class="column  notosanskr-regular "
    :to="{ name: !disabled ? to : '' }"
  >
    <q-item-section>
      <!-- Area Tags |  -->
      <area-tags :tag="tags" />
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
import AreaTags from "components/Utilities/AreaTags";
export default {
  components: {
    AreaTags
  },
  props: {
    tags: Object,
    name: String,
    amount: String,
    to: {
      type: String,
      default: "for_sale_apartment"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.q-badge {
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.9px;

  &.date,
  &.re-develop {
    border: 1px solid #dbdbdb;
    box-sizing: border-box;
    border-radius: 4px;
    font-weight: 500;
    color: #909090;
    background: white;
  }
}
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
