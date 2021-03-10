<template>
  <q-card flat>
    <q-card-section>
      <area-tags :tag="tags" />

      <div class="area-name q-mt-sm">
        {{ areaName }}
      </div>
      <div class="price-name">
        <span>매매</span>
        {{ sales }}
      </div>
      <div class="initial-investments row q-pa-sm q-mt-sm items-center">
        <q-icon>
          <img src="~assets/icons/coins.svg" alt="" />
        </q-icon>

        <div class="q-ml-md title">초기투자금</div>

        <q-separator
          class="q-ml-sm q-mr-sm"
          vertical
          inset
          style="height: 16px"
        />

        <div class="price">{{ initialInvestments }}</div>
      </div>
    </q-card-section>

    <q-separator color="grey-3" />

    <q-card-section class="bottom-title q-py-none">
      {{ quote }}
    </q-card-section>
  </q-card>
</template>

<script>
import AreaTags from "components/Utilities/AreaTags";
export default {
  name: "sale-title",
  components: {
    AreaTags
  },
  data() {
    return {};
  },
  props: {
    tags: {
      type: Object,
      default: () => {}
    },
    areaName: {
      type: String,
      default: ""
    },
    sales: {
      type: String,
      default: ""
    },
    initialInvestments: {
      type: String,
      default: ""
    },
    quote: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.bread-crumbs-badge {
  border-radius: 4px;
  font-family: "notosanskr-medium";
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.9px;
  color: #ffffff;
  padding: 5px;
  height: 24px;
  min-width: 30px;
}

.area-name {
  font-family: "notosanskr-medium";
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -1.2px;
  color: #707070;
}

.price-name {
  font-family: "notosanskr-medium";
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -2.7px;
  span {
    color: #00a4aa;
  }
}

.initial-investments {
  background: #f7f7f7;
  border-radius: 8px;

  .title {
    font-family: "notosanskr-medium";
    font-size: 17px;
    line-height: 36px;
    letter-spacing: -1.275px;
    color: #707070;
  }

  .price {
    font-family: "notosanskr-medium";
    font-weight: 500;
    font-size: 17px;
    line-height: 36px;
    letter-spacing: -1.275px;
    color: #1a1a1a;
  }
}
.bottom-title {
  font-family: "notosanskr-regular";
  font-size: 16px;
  line-height: 60px;
  letter-spacing: -1.2px;
  color: #1a1a1a;
}
</style>