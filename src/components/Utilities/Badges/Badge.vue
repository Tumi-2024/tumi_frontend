<template>
  <q-badge :class="badgeClass" outline :color="color">
    <q-tooltip
    v-if="label"
    anchor="top middle"
    self="bottom middle"
    :offset="[10, 10]"
    :content-class="tooltipClass"
    >
    {{ label }}
    </q-tooltip>
    <q-icon v-if="icon">
      <img :src="icon" alt="" srcset="" />
    </q-icon>
    <slot name="label">
      {{ getValue }}
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
    },
    label: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      badgeClass: "",
      tooltipClass: ""
    };
  },
  computed: {
    getValue() {
      switch (this.value) {
        case "가로주택":
        case "모아주택":
          return "기타";
        default:
          return this.value;
      }
    },
    getLabel() {
      switch (true) {
        case this.transactionStatus:
          return "개발유형";
        case this.houseType:
          return "주택유형";
        case this.pyeong:
          return "건물면적";
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
          return "매매가";
        default:
          return "";
      }
    }
  },
  created() {
    switch (true) {
      // case this.transactionStatus:
      //   this.badgeClass = "text-primary bg-white";
      //   break;
      case this.value === "모아주택":
      case this.value === "가로주택":
        this.badgeClass = "text-green bg-white";
        this.tooltipClass = "bg-green text-white";
        break;
      case this.value === "재건축":
        this.badgeClass = "text-white bg-blue";
        this.tooltipClass = "text-white bg-blue";
        break;
      case this.houseType:
        this.badgeClass = "text-primary bg-white";
        this.tooltipClass = "text-white bg-primary";
        break;
      case this.pyeong:
      case this.area:
        this.badgeClass = "text-green bg-white";
        this.tooltipClass = "text-white bg-green";
        break;
      case this.transactionStatus:
        this.badgeClass = "text-white bg-primary";
        this.tooltipClass = "text-primary bg-white";
        break;
      case this.recommend:
        this.badgeClass = "text-white bg-primary";
        this.tooltipClass = "text-primary bg-white";
        break;
      case this.redevelopment:
        this.badgeClass = "re-develop bg-white";
        this.tooltipClass = "text-white bg-green";
        break;
      case this.charter:
        this.badgeClass = "bg-blue-grey";
        this.tooltipClass = "text-white bg-green";
        break;
      case this.sale:
        this.badgeClass = "bg-blue";
        this.tooltipClass = "text-white bg-green";
        break;
      case this.date:
        this.badgeClass = "date text-black bg-white";
        this.tooltipClass = "text-white bg-black";
        break;
      case this.price:
        this.badgeClass = "date text-blue bg-white";
        this.tooltipClass = "text-white bg-blue";
        break;
      default:
        this.badgeClass = "";
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
