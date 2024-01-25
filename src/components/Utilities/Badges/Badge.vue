<template>
  <q-badge :class="badgeClass" outline :color="color">
    <q-tooltip
      anchor="top middle"
      self="bottom middle"
      :offset="[10, 10]"
      :content-class="badgeClass"
    >
      {{ getLabel }}
    </q-tooltip>
    <q-icon v-if="icon">
      <img :src="icon" alt="" srcset="" />
    </q-icon>
    <slot name="label">
      {{ value }}
    </slot>
  </q-badge>
</template>
<script>
export default {
  props: {
    transactionStatus: {
      type: Boolean
    },
    value: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
    icon: {
      type: String
    },
    pyeong: {
      type: Boolean
    },
    area: {
      type: Boolean
    },
    charter: {
      type: Boolean
    },
    sale: {
      type: Boolean
    },
    recommend: {
      type: Boolean
    },
    redevelopment: {
      type: Boolean
    },
    price: {
      type: Boolean
    },
    date: {
      type: Boolean
    },
    houseType: {
      type: Boolean
    }
  },
  data() {
    return {
      badgeClass: ""
    };
  },
  computed: {
    getLabel() {
      switch (true) {
        case this.transactionStatus:
          return "개발유형";
        case this.houseType:
          return "주택유형";
        case this.pyeong:
          return "전용면적";
        case this.area:
          return "면적";
        case this.recommend:
          return "추천";
        case this.redevelopment:
          return "재개발";
        case this.charter:
          return "전세";
        case this.sale:
          return "매매";
        case this.date:
          return "수정일자";
        case this.price:
          return "희망매매가";
        default:
          return "";
      }
    },
    getColor() {
      switch (true) {
        case this.transactionStatus:
          return "primary";
        case this.houseType:
          return "primary";
        case this.pyeong:
          return "green";
        case this.area:
          return "green";
        case this.recommend:
          return "white";
        case this.redevelopment:
          return "white";
        case this.charter:
          return "blue-grey";
        case this.sale:
          return "blue";
        case this.date:
          return "black";
        case this.price:
          return "blue";
        default:
          return "blue";
      }
    }
  },
  created() {
    if (this.color) {
      this.badgeClass = "";
      return;
    }
    switch (true) {
      case this.houseType:
        this.badgeClass = "text-white bg-primary";
        break;
      case this.pyeong:
      case this.area:
        this.badgeClass = "text-white bg-green";
        break;
      case this.recommend:
        this.badgeClass = "text-primary bg-white";
        break;
      case this.redevelopment:
        this.badgeClass = "re-develop bg-white";
        break;
      case this.charter:
        this.badgeClass = "bg-blue-grey";
        break;
      case this.sale:
        this.badgeClass = "bg-blue";
        break;
      case this.date:
        this.badgeClass = "date text-white bg-black";
        break;
      case this.price:
        this.badgeClass = "date text-white bg-blue";
        break;
      default:
        this.badgeClass = "bg-blue text-white";
    }
  }
};
</script>
<style lang="scss">
.q-badge {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.9px;
}
</style>
