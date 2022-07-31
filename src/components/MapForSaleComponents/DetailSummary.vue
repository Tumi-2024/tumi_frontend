<template>
  <q-card>
    <q-card-section>
      <address-with-badges
        redirect
        :item="{ address: areaName, building }"
        :houseId="houseId"
        :created="created"
        :redevName="redevName"
      />
      <!-- <div class="items-center flex">
        <img class="q-mr-md" src="~assets/icons/phone.svg" alt="" />담당자
      </div> -->

      <div class="row">
        <div class="col-xs-12 col-sm-6 col-lg-4 q-px-sm">
          <div class="initial-investments row q-pa-sm q-mt-sm items-center">
            <q-icon>
              <img src="~assets/icons/coins.svg" alt="" />
            </q-icon>
            <div class="q-ml-md title">감정가</div>
            <q-separator
              class="self-center q-mx-sm"
              vertical
              inset
              style="height: 16px"
            />
            <div class="price">
              {{ toMoneyString(prices.price_appraised) }}
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4 q-px-sm">
          <div class="initial-investments row q-pa-sm q-mt-sm items-center">
            <q-icon>
              <img src="~assets/icons/coins.svg" alt="" />
            </q-icon>
            <div class="q-ml-md title">비례율</div>
            <q-separator
              class="self-center q-mx-sm"
              vertical
              inset
              style="height: 16px"
            />
            <div class="price">{{ prices.percentage_ratio }}%</div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4 q-px-sm">
          <div class="initial-investments row q-pa-sm q-mt-sm items-center">
            <q-icon>
              <img src="~assets/icons/coins.svg" alt="" />
            </q-icon>
            <div class="q-ml-md title">권리가</div>
            <q-separator
              class="self-center q-mx-sm"
              vertical
              inset
              style="height: 16px"
            />
            <div class="price">
              {{ toMoneyString(prices.price_rights) }}
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4 q-px-sm">
          <div class="initial-investments row q-pa-sm q-mt-sm items-center">
            <q-icon>
              <img src="~assets/icons/coins.svg" alt="" />
            </q-icon>
            <div class="q-ml-md title">초기투자금</div>
            <q-separator
              class="self-center q-mx-sm"
              vertical
              inset
              style="height: 16px"
            />
            <div class="price">
              {{ toMoneyString(prices.price_initial_investment) }}
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4 q-px-sm">
          <div class="initial-investments row q-pa-sm q-mt-sm items-center">
            <q-icon>
              <img src="~assets/icons/coins.svg" alt="" />
            </q-icon>
            <div class="q-ml-md title">프리미엄</div>
            <q-separator
              class="self-center q-mx-sm"
              vertical
              inset
              style="height: 16px"
            />
            <div class="price">{{ toMoneyString(prices.price_premium) }}</div>
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-lg-4 q-px-sm">
          <div class="initial-investments row q-pa-sm q-mt-sm items-center">
            <q-icon>
              <img src="~assets/icons/coins.svg" alt="" />
            </q-icon>
            <div class="q-ml-md title">조합원 분양가</div>
            <q-separator
              class="self-center q-mx-sm"
              vertical
              inset
              style="height: 16px"
            />
            <div class="price">{{ toMoneyString(prices.price_member) }}</div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4 q-px-sm">
          <div class="initial-investments row q-pa-sm q-mt-sm items-center">
            <q-icon>
              <img src="~assets/icons/coins.svg" alt="" />
            </q-icon>
            <div class="q-ml-md title">추가분담금</div>
            <q-separator
              class="self-center q-mx-sm"
              vertical
              inset
              style="height: 16px"
            />
            <div class="price">
              {{ toMoneyString(prices.price_additional) }}
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4 q-px-sm">
          <div class="initial-investments row q-pa-sm q-mt-sm items-center">
            <q-icon>
              <img src="~assets/icons/coins.svg" alt="" />
            </q-icon>
            <div class="q-ml-md title">총매가</div>
            <q-separator
              class="self-center q-mx-sm"
              vertical
              inset
              style="height: 16px"
            />
            <div class="price">{{ toMoneyString(prices.price_total) }}</div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4 q-px-sm">
          <div class="initial-investments row q-pa-sm q-mt-sm items-center">
            <q-icon>
              <img src="~assets/icons/coins.svg" alt="" />
            </q-icon>
            <div class="q-ml-md title">안전마진</div>
            <q-separator
              class="self-center q-mx-sm"
              vertical
              inset
              style="height: 16px"
            />
            <div class="price">
              {{ toMoneyString(prices.price_safety_margin) }}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator color="self-center grey-3" />

    <q-card-section class="bottom-title q-py-none">
      {{ quote }}
    </q-card-section>
  </q-card>
</template>

<script>
import AddressWithBadges from "../Address/AddressWithBadges.vue";
import { toMoneyString } from "src/utils";

export default {
  name: "sale-title",
  components: {
    // AreaTags,
    AddressWithBadges
  },
  data() {
    return {};
  },
  props: {
    tags: {
      type: Object,
      default: () => {}
    },
    building: {
      type: String,
      default: ""
    },
    areaName: {
      type: String,
      default: ""
    },
    sales: {
      type: String,
      default: ""
    },
    houseId: {
      type: Number,
      required: false,
      default: 0
    },
    prices: {
      type: Object,
      default() {
        return {
          initialInvestments: 0
        };
      }
    },
    quote: {
      type: String,
      default: ""
    },
    created: {
      type: String,
      default: ""
    },
    redevName: {
      type: String
    },
    persons: {
      type: Array,
      required: false
    }
  },
  methods: {
    toMoneyString(value, add) {
      return toMoneyString(value, add);
    }
  },
  computed: {
    getBadgeOptions() {
      return [
        { type: "houseType", value: this.tags.type },
        { type: "redevelopment", value: this.tags.redevelopment },
        { type: "stageProgress", value: this.tags.stageProgress },
        {
          type: "transactionStatus",
          value: this.tags.transactionStatus ? false : "재개발",
          icon: require("src/assets/icons/redevelop.svg")
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
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
    width: 100px;
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
