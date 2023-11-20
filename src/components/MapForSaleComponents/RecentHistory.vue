<template>
  <q-card class="bg-white notosanskr-medium">
    <q-card-section class="q-pb-none justify-between items-center row">
      <div class="title-heading col-6">정비사업 실거래가 히스토리</div>
      <q-select
        style="width: 80px"
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
          class="tabs-text notosanskr-medium"
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
              :items="getTransactions"
              :virtual-scroll-slice-size="100"
              separator
            >
              <template v-slot:before>
                <q-item
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
                    v-if="activeTab === 'SALE' || activeTab === 'all'"
                  >
                    면적당 가격
                  </div>
                  <div class="flex justify-center" style="flex: 20 0" v-else>
                    월세
                  </div>
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
                      {{ item.text_sigungu }} {{ item.bonbeon || item.beonji }}
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
                    {{ toMoneyString(item.price / getItemSize(item, select)) }}
                    / {{ unitSelect.value }}
                  </div>
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
import { toMoneyString } from "src/utils";

export default {
  components: {
    // TextUnderHighlight
  },
  props: {
    item: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      areaSelected: "",
      activeTab: "SALE",
      filterValue: "",
      tabs: [
        // { level: "all", label: "전체" },
        { level: "SALE", label: "매매" },
        { level: "RENT", label: "전세" },
        { level: "monthly", label: "월세" }
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
  computed: {
    getTabLabel() {
      return ({ text_price_monthly: priceMonthly, type }) => {
        if (!!priceMonthly && Number(priceMonthly) > 0) {
          return "월세";
        }
        return this.tabs.find((tab) => tab.level === type).label;
      };
    },
    getOptions() {
      return [
        { value: "", label: "전체" },
        {
          value: "COMMERCIAL ",
          label: "상업업무용",
          disable: !this.item?.some((obj) => obj.category === "COMMERCIAL ")
        },
        {
          value: "SINGLE",
          label: "단독다가구",
          disable: !this.item?.some((obj) => obj.category === "SINGLE")
        },
        {
          value: "OFFICETEL",
          label: "오피스텔",
          disable: !this.item?.some((obj) => obj.category === "OFFICETEL")
        },
        {
          value: "APARTMENT",
          label: "아파트",
          disable: !this.item?.some((obj) => obj.category === "APARTMENT")
        },
        {
          value: "LAND",
          label: "토지",
          disable: !this.item?.some((obj) => obj.category === "LAND")
        },
        {
          value: "ALLIANCE",
          label: "연립ￜ다세대",
          disable: !this.item?.some((obj) => obj.category === "ALLIANCE")
        }
      ];
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
    getTransactions() {
      if (!this.item) return [];
      const results = this.item?.filter((obj) => {
        if (this.filterValue === "") {
          return true;
        }
        return obj.category === this.filterValue;
      });
      // console.log(
      //   results
      //     .filter(({ types }) => types.indexOf("RENT") > -1)
      //     .map((result) => {
      //       return result.recent_transactions.RENT;
      //     })
      //     .filter(
      //       ({ text_price_monthly: priceMonthly }) =>
      //         !priceMonthly || Number(priceMonthly) === 0
      //     )
      // );

      if (this.activeTab === "monthly") {
        return results
          .filter(({ types }) => types.indexOf("RENT") > -1)
          .map((result) => {
            return result.recent_transactions.RENT;
          })
          .filter(
            ({ text_price_monthly: priceMonthly }) =>
              !!priceMonthly && Number(priceMonthly) > 0
          );
      }

      if (this.activeTab === "RENT") {
        return results
          .filter(({ types }) => types.indexOf("RENT") > -1)
          .map((result) => {
            return result.recent_transactions.RENT;
          })
          .filter(
            ({ text_price_monthly: priceMonthly }) =>
              !priceMonthly || Number(priceMonthly) === 0
          );
      }

      return results
        .filter(({ types }) => types.indexOf("SALE") > -1)
        .map((result) => {
          return result.recent_transactions.SALE;
        });
    },
    isRent() {
      return (item) => item.type === this.tabs[2].level;
    },
    isSale() {
      return (item) => item.type === this.tabs[1].level;
    }
  },
  methods: {
    toMoneyString(value, add) {
      return toMoneyString(value, add);
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
