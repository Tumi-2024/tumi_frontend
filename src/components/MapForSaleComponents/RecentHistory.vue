<template>
  <q-card class="bg-white nanum-square">
    <q-card-section
      class="q-pb-none justify-between items-center row"
      style="gap: 12px; flex: 1 1 0"
    >
      <div class="title-heading">[{{ title }}] 실거래가 히스토리</div>
      <q-select
        v-if="!($q.screen.sm || $q.screen.xs)"
        style="width: 90px"
        v-model="unitSelect"
        label="단위"
        :options="[
          { label: '평', value: '평' },
          { label: '㎡', value: '㎡' }
        ]"
        :option-value="(item) => (item === null ? null : item.label)"
      />
    </q-card-section>
    <!-- recent hitory -->
    <q-card-section class="bg-white notosanskr-regular">
      <q-tabs
        v-model="activeTab"
        class="text-grey bg-white"
        active-color="primary"
        align="justify"
      >
        <q-tab
          v-for="tab in tabs"
          :key="tab.level"
          :name="tab.level"
          class="tabs-text nanum-square"
          :label="tab.label"
        />
      </q-tabs>

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel
          class="q-pa-none"
          v-for="tab in tabs"
          :key="tab.level"
          :name="tab.level"
        >
          <q-list separator>
            <q-virtual-scroll
              style="min-height: 220px; max-height: 500px"
              v-if="transactions.length"
              :items="transactions"
              :virtual-scroll-slice-size="100"
              separator
            >
              <template v-slot:before>
                <q-item
                v-if="!$q.screen.sm && !$q.screen.xs"
                  class="item"
                  style="position: sticky; top: 0; z-index: 100"
                >
                  <div class="flex justify-center" style="flex: 20 0">
                    계약일
                  </div>
                  <div class="flex justify-center" style="flex: 15 0">
                    주택유형
                  </div>
                  <div class="flex justify-center" style="flex: 15 0">
                    거래유형
                  </div>

                  <div
                    class="flex"
                    style="
                      flex: 25 0;
                      margin-left: 10px;
                      justify-content: center;
                    "
                  >
                    번지/건물단지명
                  </div>
                  <div class="flex justify-center" style="flex: 15 0">층수</div>
                  <div style="flex: 17 0" class="justify-center flex">
                    <q-select
                      style="width: 90%"
                      item-aligned
                      dense
                      v-model="select"
                      :options="getSelectOptions"
                      :option-value="
                        (item) => (item === null ? null : item.label)
                      "
                    />
                  </div>
                  <div
                    class="flex justify-center"
                    style="flex: 20 0"
                    v-if="activeTab === 'SALE'"
                  >
                    거래가격
                  </div>
                  <div class="flex justify-center" style="flex: 20 0" v-else>
                    보증금
                  </div>

                  <div
                    class="flex justify-center"
                    style="flex: 20 0"
                    v-if="activeTab === 'SALE' || activeTab === 'RENT'"
                  >
                    면적당 가격
                  </div>
                  <div class="flex justify-center" style="flex: 20 0" v-else>
                    월세
                  </div>
                </q-item>
                <q-item v-if="$q.screen.sm || $q.screen.xs">
                </q-item>
              </template>
              <template v-slot="{ item, index }">
                <q-item
                  class="item"
                  :style="{
                    backgroundColor: isSale(item)
                      ? 'rgba(255, 81, 0, 0.05)'
                      : 'rgba(0, 164, 170, 0.05)'
                  }"
                  :key="index"
                >
                  <!-- 휴대폰일 때 -->
                  <template v-if="$q.screen.sm || $q.screen.xs">
                    <!-- {{ $q.screen.sm || $q.screen.xs }} -->
                    <!-- {{ $q.screen.xs }} -->
                    <div class="flex col">
                      <div
                        style="display: flex; flex: 1; flex-direction: column; gap: 4px;"
                      >
                        <div style="display: flex; justify-content: space-between;">
                          <div style="display: flex; align-items: center; gap: 4px;">
                            <q-badge outline color="primary">{{ getHouseType(item.category) }}</q-badge>
                            <q-badge outline color="blue">{{ toMoneyString(item.price || item.price_deposit) }}</q-badge>
                            <q-badge v-if="item.price_monthly" outline class="bg-blue text-white">{{ toMoneyString(item.price_monthly) }}</q-badge>
                            <q-badge outline color="green">{{ (item.text_size_private  || item.text_size_yean || item.text_size_total) +  'm²' }}</q-badge>
                            <q-badge color="black"> {{
                            item.text_month.slice(2, 4) +
                            "." +
                            item.text_month.slice(4, 6) +
                            "." +
                            (item.text_day.length === 1
                              ? "0" + item.text_day
                              : item.text_day)
                          }}</q-badge>
                          </div>
                          <span style="font-size: 16px; width: 130px; text-align: left; font-weight: bold;">
                            <span style="font-weight: 400; font-size: 14px;">
                              대지면적  &nbsp;
                            </span>
                            {{ (item.size_daeji || item.size_land) + 'm²' }}
                          </span>
                        </div>
                        <div class="flex justify-between">
                          <span style="font-size: 16px">{{ item.address }}</span>
                          <span style="font-size: 16px; width: 130px; text-align: left; font-weight: bold;">
                            <span style="font-weight: 400; font-size: 14px;">
                              건물면적 &nbsp;
                            </span>
                             {{ (item.text_size_private  || item.text_size_yean || item.text_size_total) +  'm²' }}
                          </span>
                        </div>

                      </div>

                    </div>
                  </template>
                  <template v-else>
                    <!-- 계약일 -->
                    <div class="flex justify-center" style="flex: 20 0">
                      {{
                        item.text_month.slice(0, 4) +
                        "." +
                        item.text_month.slice(4, 6) +
                        "." +
                        (item.text_day.length === 1
                          ? "0" + item.text_day
                          : item.text_day)
                      }}
                    </div>
                    <!-- 주택 유형 -->
                    <div class="flex justify-center" style="flex: 15 0">
                      {{ getHouseType(item.category) }}
                    </div>
                    <!-- 거래 유형 -->
                    <div
                      style="flex: 15 0"
                      class="flex justify-center text-weight-medium"
                      :style="{
                        color: isSale(item)
                          ? 'rgba(255, 81, 0)'
                          : 'rgba(0, 164, 170)'
                      }"
                    >
                      {{ getTabLabel(item) }}
                    </div>

                    <!-- 번지/ 건물단지 명 -->
                    <div style="flex: 27 0">
                      <span style="display: flex; justify-content: center">
                        {{ item.text_sigungu }}
                        {{ item.bonbeon || item.beonji }}
                      </span>
                    </div>
                    <div class="flex justify-center" style="flex: 15 0">
                      {{ (item.text_floor || "").replace(/null/i, "-") }}층
                    </div>
                    <!-- 면적 -->
                    <div class="flex justify-center" style="flex: 17 0">
                      {{ getItemSize(item, select) + unitSelect.value }}
                    </div>
                    <!-- 거래가격 -->
                    <div class="flex justify-center" style="flex: 20 0">
                      {{ toMoneyString(item.price || item.price_deposit) }}
                    </div>
                    <div
                      class="flex justify-center"
                      style="flex: 20 0"
                      v-if="activeTab === 'SALE' || activeTab === 'all'"
                    >
                      {{
                        toMoneyString(item.price / getItemSize(item, select))
                      }}
                      / {{ unitSelect.value }}
                    </div>
                  </template>
                </q-item>
              </template>
            </q-virtual-scroll>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>
<script>
import Vue from "vue";
import { toMoneyString } from "src/utils";
import { mapGetters } from "vuex";
export default {
  components: {
    // TextUnderHighlight
  },
  props: {
    item: {
      type: Array,
      require: true
    },
    title: {
      type: String,
      required: false,
      default: "정비사업"
    },
    redevId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      areaSelected: "",
      transactions: [],
      activeTab: "SALE",
      filterValue: "",
      tabs: [
        // { level: "all", label: "전체" },
        { level: "SALE", key: "MONTHLY", label: "매매" },
        { level: "RENT", key: "RENT", label: "전세" },
        { level: "MONTHLY", key: "MONTHLY", label: "월세" }
      ],
      select: {
        label: "대지면적",
        value: "대지면적"
      },
      unitSelect: {
        label: "평",
        value: "평"
      }
    };
  },
  watch: {
    activeTab () {
      this.getTransactions();
    }
  },
  methods: {
    ...mapGetters("area", ["getMapSelectedArea"]),
    toMoneyString(value, add) {
      return toMoneyString(value, add);
    },
    async getTransactions() {
      const type = this.activeTab === 'SALE' ? 'SALE' : this.activeTab === 'MONTHLY' ? "RENT" : "RENT"
      const { data } = await Vue.prototype.$axios.get(
        `redevelopment_areas/${this.redevId}/transactions/?page_size=1000&type=${type}`
      );

      if (this.activeTab === 'SALE') {
        this.transactions = data.results
      } else if (this.activeTab === 'RENT') {
        this.transactions = data.results.filter(obj => !obj.price_monthly);
      } else {
        this.transactions = data.results.filter(obj => !!obj.price_monthly);
      }
    }
  },
  beforeMount() {
    this.getTransactions();
  },
  computed: {
    getAddressWithoutSiGunGu() {
      return (address) => {
        const addressArr = address.split(" ");
        return addressArr[1] + " " + addressArr[2];
      };
    },
    getTabLabel() {
      return ({ text_price_monthly: priceMonthly, type }) => {
        if (!!priceMonthly && Number(priceMonthly) > 0) {
          return "월세";
        }
        return this.tabs.find((tab) => tab.level === type).label;
      };
    },

    getItemSize() {
      return (item, select) => {
        const unit = this.unitSelect.value === "평" ? 3.30579 : 1;

        const getRound = (value) => {
          if (this.unitSelect.value === "평") {
            return Math.round(value);
          } else {
            return value;
          }
        };
        if (select.value === "대지면적") {
          return getRound(
            Number(
              (item.text_size_land ||
                item.size_land ||
                item.text_size_daeji ||
                item.size_daeji) / unit
            )
          );
        }
        return getRound(
          Number(
            item.text_size_private ||
              item.size_private ||
              item.text_size_yean ||
              item.size_yean
          )
        );
      };
    },
    getSelectOptions() {
      return [
        {
          label: "대지면적",
          value: "대지면적"
        },
        {
          label: "건물면적",
          value: "건물면적"
        }
      ];
    },
    getHouseType() {
      return (value) => {
        const newVal = [
          { label: "아파트", value: "APARTMENT" },
          { label: "오피스텔", value: "OFFICETEL" },
          { label: "상업업무용", value: "COMMERCIAL " },
          { label: "분양/입주권", value: "LAND" },
          { label: "연립ￜ다세대", value: "ALLIANCE" },
          { label: "단독|다가구", value: "SINGLE" },
          { label: "토지", value: "LAND" }
        ].filter((item) => {
          return item.value === value;
        });
        return newVal[0].label;
      };
    },

    isRent() {
      return (item) => item.type === this.tabs[2].level;
    },
    isSale() {
      return (item) => item.type === this.tabs[1].level;
    }
  }
};
</script>
<style lang="scss" scoped>
.title-heading {
  font-size: 17px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  line-height: 26px;
  font-weight: bold;
  word-break: keep-all;
}
.unit-heading {
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  letter-spacing: -0.9px;
  color: #909090;
}

.text-30 {
  color: #707070;
}

.q-field--item-aligned {
  padding: 0;
}

.item {
  display: flex;
  align-items: center;
  background-color: white;
}
</style>
