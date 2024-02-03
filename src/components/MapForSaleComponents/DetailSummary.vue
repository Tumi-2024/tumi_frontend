<template>
  <q-card>
    <q-card-section>
      <badge-list :tags="getBadges(item)" class="q-my-sm" />
      <address-text-admin
        :address="areaName"
        :building="building"
        :houseId="houseId"
        :redirect="true"
        :created="created"
        :redevName="redevName"
      />
      <div class="row q-mt-md">
        <span class="text-h5 text-bold text-center full-width">
          매물 예상 가격
        </span>
        <div class="col-12 col-md-4 q-px-sm q-mt-sm">
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
        <div class="col-12 col-md-4 q-px-sm q-mt-sm">
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
        <div class="col-12 col-md-4 q-px-sm q-mt-sm">
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
        <div class="col-12 col-md-4 q-px-sm q-mt-sm">
          <div class="initial-investments row q-pa-sm q-mt-sm items-center">
            <q-icon>
              <img src="~assets/icons/coins.svg" alt="" />
            </q-icon>
            <div class="q-ml-md title">분담금</div>
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
        <div class="col-12 col-md-4 q-px-sm q-mt-sm">
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

        <div class="col-12 col-md-4 q-px-sm q-mt-sm">
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
        <div class="col-12 col-md-4 q-px-sm q-mt-sm">
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
        <div class="col-12 col-md-4 q-px-sm q-mt-sm">
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
        <div class="col-12 col-md-4 q-px-sm q-mt-sm">
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
        <div class="col-12 q-mt-md flex justify-center">
          <q-card class="flex flex-1 cursor-pointer" style="max-width: 500px">
            <div
              class="initial-investments bg-orange-1 text-primary row q-py-md q-px-lg items-center flex"
              style="border: 2px solid #ff5a00"
            >
              <div class="flex">
                <q-icon size="30px">
                  <img src="~assets/icons/phone.svg" alt="" />
                </q-icon>
              </div>
              <div class="q-ml-lg" style="flex: 1" @click="callPerson">
                <div class="row items-center">
                  <span class="text-subtitle2 col-12 text-bold">
                    {{ persons[0].rank }}
                  </span>
                  <div class="text-h6 q-my-xs col-12 flex text-bold">
                    {{ persons[0].text }}
                    <span v-if="persons[0].phone" class="q-ml-md flex"
                      >(연락처:{{ persons[0].phone }})</span
                    >
                  </div>
                </div>
                <span class="text-grey-9 text-bold">
                  이미지 클릭시 담당직원과 전화상담이 가능합니다.
                </span>
              </div>
            </div>
          </q-card>
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
import { toMoneyString, toSimpleMoneyString, toDateFormat } from "src/utils";
import AddressTextAdmin from "../Address/AddressTextAdmin.vue";
import BadgeList from "src/components/Utilities/Badges/BadgeList.vue";

export default {
  name: "sale-title",
  components: {
    // AreaTags,
    // AddressWithBadges,
    BadgeList,
    AddressTextAdmin
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
    },
    item: {
      type: Object,
      required: false
    }
  },
  methods: {
    toMoneyString(value, add) {
      return toMoneyString(value, add);
    },
    callPerson(phoneNumber) {
      if (!phoneNumber) return;
      window.location.href = "tel://" + phoneNumber;
    },
    reshape(item) {
      if (!item.group_building_house) {
        item.group_building_house = { type_house: item.type_house };
      }
      if (!item.group_individual_household) {
        item.group_individual_household = {
          size_dedicated_area: item.size_dedicated_area
        };
      }
      if (!item.group_land_use) {
        item.group_land_use = {
          type_structure_building: item.type_structure_building
        };
      }
      if (!item.group_trading_terms) {
        item.group_trading_terms = {
          price_selling_hope: item.price_selling_hope,
          price_charter_deposit_hope: item.price_charter_deposit_hope
        };
      }
      return item;
    }
  },
  computed: {
    getBadges() {
      return (item, ctgr) => {
        item = this.reshape(item);
        const getDate = (date) => {
          return toDateFormat(date, "YYYY.MM.DD");
        };
        const getColor = (label) => {
          switch (label) {
            case "재개발":
              return "primary";
            case "재건축":
              return "blue";
            case "가로주택":
              return "green";
            default:
              return "";
          }
        };
        return [
          {
            type: "transactionStatus",
            value: item.transactionStatus
              ? false
              : item.group_location.redevelopment_area?.category,
            color: getColor(item.group_location.redevelopment_area?.category)
            // icon: getIcon()
          },
          { type: "houseType", value: item.group_building_house.type_house },
          { type: "redevelopment", value: item.redevelopment },
          { type: "stageProgress", value: item.stageProgress },
          {
            type: "pyeong",
            value:
              item.group_building_house.size_supply_area_pyeong.toFixed(0) +
              "평"
          },
          {
            type: "price",
            value: `${toSimpleMoneyString(
              item.group_trading_terms.price_selling_hope ||
                item.group_trading_terms.price_charter_deposit_hope
            )}`
          },
          { type: "date", value: getDate(item.created) }
        ];
      };
    },
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
