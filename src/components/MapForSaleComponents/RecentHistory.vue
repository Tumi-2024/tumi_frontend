<template>
  <q-card class="bg-white notosanskr-medium">
    <q-card-section class="row q-pb-none justify-between">
      <div class="title-heading col-6">실거래가 히스토리</div>
    </q-card-section>
    <!-- recent hitory -->
    <q-card-section class="bg-white notosanskr-regular">
      <div class="flex justify-end">
        <q-select
          style="min-width: 120px"
          :dense="true"
          v-model="filterValue"
          emit-value
          map-options
          :options="getOptions"
          label="주택유형"
        />
      </div>
      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey q-mt-lg"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab
          v-for="tab in tabs"
          :key="tab.level"
          :name="tab.level"
          :label="tab.label"
        />
      </q-tabs>
      <q-separator />
      <div
        class="flex justify-end items-center"
        style="margin-top: 20px; margin-bottom: 8px"
      >
        <div
          style="
            background-color: #ff5100;
            width: 12px;
            height: 8px;
            opacity: 0.2;
            border-radius: 2px;
          "
        />
        <div style="margin-left: 5px">매매</div>
        <div
          style="
            background-color: #00a4aa;
            width: 12px;
            height: 8px;
            margin-left: 7px;
            opacity: 0.2;
            border-radius: 2px;
          "
        />
        <div style="margin-left: 5px">전세</div>
        <div
          style="
            border: 1px solid #d5d5d5;
            width: 12px;
            height: 8px;
            margin-left: 7px;
            border-radius: 2px;
          "
        />
        <div style="margin-left: 5px">월세</div>
      </div>
      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel
          class="q-pa-none"
          v-for="tab in tabs"
          :key="tab.level"
          :name="tab.level"
        >
          <q-list separator style="border-top: 1px solid #1a1a1a">
            <q-item class="item">
              <div class="flex justify-center" style="flex: 20 0">계약일</div>
              <div class="flex justify-center" style="flex: 15 0">주택유형</div>
              <div class="flex justify-center" style="flex: 15 0">거래유형</div>

              <div
                class="flex"
                style="flex: 25 0; margin-left: 10px; justify-content: center"
              >
                번지/건물단지명
              </div>
              <div class="flex justify-center" style="flex: 15 0">층수</div>
              <div style="flex: 15 0" class="justify-center flex">
                <q-select
                  style="width: 90%"
                  item-aligned
                  dense
                  v-model="select"
                  :options="getSelectOptions"
                  :option-value="(item) => (item === null ? null : item.label)"
                />
              </div>
              <div class="flex justify-center" style="flex: 20 0">거래가격</div>
              <div class="flex justify-center" style="flex: 20 0">
                면적당 가격
              </div>
            </q-item>
            <q-virtual-scroll
              style="min-height: 220px; max-height: 500px"
              :items="getTransactions"
              :virtual-scroll-slice-size="100"
              separator
            >
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
                      {{ `${item.text_road || ""}` }}
                    </span>
                    <span>
                      {{ `${item.text_danji || ""}` }}
                    </span>
                  </div>
                  <div class="flex justify-center" style="flex: 15 0">
                    {{ (item.text_floor || "").replace(/null/i, "-") }}층
                  </div>
                  <!-- 면적 -->
                  <div class="flex justify-center" style="flex: 15 0">
                    {{ getItemSize(item, select) }}
                  </div>
                  <!-- 거래가격 -->
                  <div class="flex justify-center" style="flex: 20 0">
                    {{ toMoneyString(item.price || item.price_deposit) }}
                  </div>
                  <div class="flex justify-center" style="flex: 20 0">
                    {{ toMoneyString(item.price / getItemSize(item, select)) }}
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
      activeTab: "all",
      filterValue: "",
      tabs: [
        { level: "all", label: "전체" },
        { level: "SALE", label: "매매" },
        { level: "RENT", label: "전세" },
        { level: "monthly", label: "월세" }
      ],
      select: {
        label: "전용면적",
        value: "text_size_private"
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
          label: "연립/다세대",
          disable: !this.item?.some((obj) => obj.category === "ALLIANCE")
        }
      ];
    },
    getItemSize() {
      return (item, select) => {
        let itemValue = item[select.value];
        if (
          item.category === "COMMERCIAL " &&
          (select.value === "text_size_private" ||
            select.value === "text_size_yean")
        ) {
          itemValue = item.text_size_total;
          return itemValue;
        } else if (select.value === "text_size_daeji") {
          itemValue =
            item.text_size_daeji ||
            item.text_size_land ||
            item.text_size_contract;
          return itemValue;
        } else {
          return itemValue;
        }
      };
    },
    getSelectOptions() {
      return [
        {
          label: "전용면적",
          value: "text_size_private"
        },
        {
          label: "대지면적",
          value: "text_size_daeji"
        },
        {
          label: "연면적",
          value: "text_size_yean"
        }
        // {
        //   label: "계약면적",
        //   value: "text_size_contract"
        // },
        // {
        //   label: "전용/연면적",
        //   value: "text_size_total"
        // }
      ];
    },
    getHouseType() {
      return (value) => {
        const newVal = [
          { label: "아파트", value: "APARTMENT" },
          { label: "오피스텔", value: "OFFICETEL" },
          { label: "상업업무용", value: "COMMERCIAL " },
          { label: "분양/입주권", value: "LAND" },
          { label: "연립/다세대", value: "ALLIANCE" },
          { label: "단독/다가구", value: "SINGLE" },
          { label: "토지", value: "LAND" }
        ].filter((item) => {
          return item.value === value;
        });
        return newVal[0].label;
      };
    },
    getTransactions() {
      const results = this.item?.filter((obj) => {
        if (this.filterValue === "") {
          return true;
        }
        return obj.category === this.filterValue;
      });

      if (this.activeTab === "all") {
        return results;
      }

      if (this.activeTab === "monthly") {
        return results
          .filter(({ type }) => type === "RENT")
          .filter(
            ({ text_price_monthly: priceMonthly }) =>
              !!priceMonthly && Number(priceMonthly) > 0
          );
      }

      if (this.activeTab === "RENT") {
        return results
          .filter(({ type }) => type === "RENT")
          .filter(
            ({ text_price_monthly: priceMonthly }) =>
              !priceMonthly || Number(priceMonthly) === 0
          );
      }

      return results.filter(
        (transaction) => transaction.type === this.activeTab
      );
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
  &.header {
    background-color: #f7f7f7;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
}
</style>
