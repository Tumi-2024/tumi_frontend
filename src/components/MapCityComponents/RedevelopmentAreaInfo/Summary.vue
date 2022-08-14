<template>
  <div class="more-information">
    <section class="address-section bg-white">
      <q-badge
        outline
        :color="getColor(getMapSelectedArea.category)"
        class="bmedium"
        :label="getMapSelectedArea.category"
      />
      <div class="title-heading notosanskr-medium">
        {{ getMapSelectedArea.title }}
      </div>
      <div class="sub-title notosanskr-regular">
        {{ getMapSelectedArea.address }}
      </div>
    </section>
    <section class="area-stats-section bg-white">
      <div v-for="(stat, i) of getStats" :key="i">
        <div class="row q-pa-md">
          <div style="margin-right: 12px; align-items: center; display: flex">
            <img
              v-if="stat.icon"
              :width="30"
              :src="require(`assets/icons/${stat.icon}`)"
              alt=""
            />
          </div>
          <section class="column">
            <div class="stat-title notosanskr-medium">
              {{ i + 1 }}. {{ stat.title }}
            </div>
            <div class="stat-value notosanskr-medium" v-if="stat.default == 0">
              {{ stat.value | number("0,0") }} {{ stat.unit }}
            </div>
            <div class="stat-value notosanskr-medium" v-else>
              {{ stat.value }}
            </div>
          </section>
        </div>
        <q-separator inset v-if="getStats.length - 1 !== i" />
      </div>
    </section>
    <!-- <section class="investment-point bg-white">
      <div class="title-heading notosanskr-medium">
        실거래가
      </div>
      <div class="row justify-between">
        <div class="sub-title notosanskr-medium">
          실거래 정보
        </div>
        <div class="help-text">
          {{ getCurrTransactions.year }} 년 {{ getCurrTransactions.month }} 월
          기준
        </div>
      </div>
      <div class="row table">
        <div class="col-12 row">
          <div class="q-pa-sm label">
            <span class="information">실거래가</span>
          </div>
          <a class="information sub flex items-center q-px-sm">
            {{ getCurrTransactions.priceText }}
          </a>
        </div>
        <div
          class="col-sm-4 col-12 row"
          :class="`col-sm-${12 / getInfo().length}`"
          v-for="(item, i) of getInfo()"
          :key="i"
        >
          <div class="q-pa-sm label">
            <span class="information">{{ item.label }}</span>
          </div>
          <div class="row justify-between items-center" style="flex:1;">
            <span style="padding: 0 8px;" class="information sub">
              {{ item.price }} 원 / 평
            </span>
            <span
              class="information sub flex items-center q-px-sm"
              :href="`tel:${item.value}`"
              v-if="item.phone"
            >
              {{ item.value }}
            </span>
            <span class="information sub flex items-center q-px-sm" v-else>
              {{ item.value }}
            </span>
          </div>
        </div>
      </div>
      <div
        style="justify-content: flex-end; display: flex; margin-bottom: 20px;"
      >
        <q-select
          style="width: 150px; margin-right: 30px"
          label="카테고리"
          color="primary"
          label-color="primary"
          :value="ctgr1"
          emit-value
          map-options
          @input="getCtgrGraphData"
          :options="getSelectOptions"
        />
      </div>
      <LineChart
        :chart-data="datacollection"
        :options="options"
        style="margin: 0 20px"
      />
    </section> -->
    <recent-history :item="transactions" />
    <section class="button-fixed-bottom">
      <q-btn
        color="primary"
        text-color="white"
        class="notosanskr-medium"
        label="이지역 투자매물 보러가기"
      />
    </section>

    <section style="min-height: 200px"></section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Vue from "vue";
// import LineChart from "src/utils/lineChart";
import { toMoneyString, toSimpleMoneyString } from "src/utils";
import { RecentHistory } from "components/MapForSaleComponents";
export default {
  components: {
    // LineChart,
    "recent-history": RecentHistory
  },
  data() {
    return {
      // ctgr1: "ALLIANCE",
      transactions: [],

      datacollection: {
        maintainAspectRatio: false,
        datasets: [
          {
            backgroundColor: ({ dataIndex: index }) => {
              switch (index) {
                case 0:
                  return "rgba(255, 125, 54, 0.2)";
                case 1:
                  return "rgba(255, 125, 54, 0.6)";
                case 2:
                  return "rgba(255, 125, 54, 1)";
                default:
                  return "rgba(255, 125, 54, 0.2)";
              }
            },
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            formatter: (d) => toMoneyString(d)
          }
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                drawTicks: false,
                drawOnChartArea: false
              },
              ticks: {
                min: 20000,
                callback: function (val, index) {
                  // Hide the label of every 2nd dataset
                  return index % 2 === 0 ? toSimpleMoneyString(val) : "";
                }
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                drawTicks: false,
                drawOnChartArea: false
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    };
  },
  methods: {
    getStatValue(value) {
      switch (value) {
        case "size_area":
          return this.getMapSelectedArea.size_area || 0;
        case "count_house":
          return this.getMapSelectedArea.count_house || 0;
        case "count_owner":
          return this.getMapSelectedArea.count_owner || 0;
        case "count_member":
          return this.getMapSelectedArea.count_member || 0;
        // case "redevelopment_step":
        //   return this.getMapSelectedArea.redevelopment_step
        //     ? this.getMapSelectedArea.redevelopment_step.title
        //     : "-";
        default:
          return this.getMapSelectedArea[value] || "-";
      }
    }
  },
  computed: {
    ...mapGetters("area", ["getMapSelectedArea"]),
    getStats() {
      return [
        {
          title: "개발 세부유형",
          value: this.getMapSelectedArea.subcategory
        },
        {
          title: "현재 사업추진단계",
          value: this.getMapSelectedArea.redevelopment_step
        },
        {
          title: "건립 세대 수 (예상 수치)",
          value:
            this.getMapSelectedArea.count_sale +
            this.getMapSelectedArea.count_rent
        },
        {
          title: "조합원 수",
          value: this.getMapSelectedArea.count_member
        },
        {
          title: "일반 분양 수 (예상 수치)",
          value:
            this.getMapSelectedArea.count_sale -
            this.getMapSelectedArea.count_member
        },
        {
          title: "전매 관리",
          value: this.getMapSelectedArea.category_resale
        },
        {
          title: "부동산 대책",
          value: this.getMapSelectedArea.category_policy
        },
        {
          title: "근거법",
          value: this.getMapSelectedArea.category_ground_law
        },
        {
          title: "권리산정기준일",
          value: this.getMapSelectedArea.category_date_rights
        },
        {
          title: "이주비/중도금 대출 조건",
          value: this.getMapSelectedArea.description_loan_condition
        },
        {
          title: "기타 특이사항",
          value: this.getMapSelectedArea.description_etc
        }
      ];
    },
    getColor() {
      return (type) => {
        switch (type) {
          case "재개발":
            return "primary";
          case "재건축":
            return "blue";
          case "가로주택":
            return "green";
          case "일반":
            return "purple";
          default:
            return "black";
        }
      };
    },
    getCurrTransactions() {
      // "202007"
      const _currTrArr = this.transactions
        // .filter(({ category }) => category === this.ctgr1)
        .filter(({ type }) => type === "SALE");

      const currTrArr = _currTrArr.filter(
        ({ text_month: tm }) => tm === _currTrArr[0].text_month
      );
      const currTr = currTrArr.reduce(
        (acc, curr) => {
          return {
            size_contract: acc.size_contract + curr.size_contract,
            size_daeji: acc.size_daeji + curr.size_daeji,
            size_land: acc.size_land + curr.size_land,
            size_private: acc.size_private + curr.size_private,
            size_total: acc.size_total + curr.size_total,
            size_yean: acc.size_yean + curr.size_yean,
            price: acc.price + curr.price
          };
        },
        {
          size_contract: 0,
          size_daeji: 0,
          size_land: 0,
          size_private: 0,
          size_total: 0,
          size_yean: 0,
          price: 0
        }
      );

      for (const tr in currTr) {
        currTr[tr] = currTr[tr] / currTrArr.length;
      }
      currTr.year = currTrArr[0]?.text_month.slice(0, 4);
      currTr.month = currTrArr[0]?.text_month.slice(4, 6);
      currTr.priceText = toMoneyString(currTr.price);

      return currTr;
    },
    getInfo() {
      return () => {
        const options = [];
        const TI = this.getCurrTransactions;

        if (
          this.ctgr1 === "APARTMENT" ||
          this.ctgr1 === "OFFICETEL" ||
          this.ctgr1 === "COMMERCIAL "
        ) {
          options.push({
            label: "전용/연면적",
            value: `${
              TI?.size_private
                ? (TI?.size_private / 3.3).toFixed(2) + " 평 "
                : " -"
            }/${
              TI?.size_yean ? (TI?.size_yean / 3.3).toFixed(2) + " 평 " : " -"
            }`
          });
        } else if (this.ctgr1 === "ALLIANCE" || this.ctgr1 === "SINGLE") {
          options.push({
            label: "전용/연면적",
            price: `${(
              (this.getCurrTransactions.price / (TI?.size_private / 3.3)) *
              10000
            ).toFixed(0)}`,
            value: `거래면적 : ${
              TI?.size_private
                ? (TI?.size_private / 3.3).toFixed(2) + " 평 "
                : " -"
            }`
          });
          options.push({
            label: "대지(권)면적",
            price: `${(
              (this.getCurrTransactions.price / (TI?.size_land / 3.3)) *
              10000
            ).toFixed(0)}`,
            value: `거래면적 : ${
              TI?.size_land ? (TI?.size_land / 3.3).toFixed(2) + " 평 " : " -"
            }`
          });
        } else {
          options.push({
            label: "토지 계약 면적",
            price: `${(
              (this.getCurrTransactions.price / (TI.size_daeji / 3.3)) *
              10000
            ).toFixed(0)}`,
            value: `거래면적 : ${
              TI.size_daeji ? (TI.size_daeji / 3.3).toFixed(2) + " m² " : " -"
            }`
          });
        }
        return options;
      };
    },
    // getTransactions() {
    //   return this.transactions.filter(
    //     ({ category }) => category === this.ctgr1
    //   );
    // },
    getSelectOptions() {
      const options = [
        { label: "아파트", value: "APARTMENT" },
        { label: "오피스텔", value: "OFFICETEL" },
        { label: "상업업무용", value: "COMMERCIAL " },
        { label: "분양/입주권", value: "LAND" },
        { label: "연립ￜ다세대", value: "ALLIANCE" },
        { label: "단독|다가구", value: "SINGLE" },
        { label: "토지", value: "LAND" }
      ];

      const getDisable = (value) =>
        !this.transactions.some((transaction) => {
          return transaction.category === value;
        });

      return options.map((option) => {
        return { ...option, disable: getDisable(option.value) };
      });
    }
  },
  async beforeMount() {
    const { data } = await Vue.prototype.$axios.get(
      `redevelopment_areas/${this.getMapSelectedArea.id}/transactions/?page_size=1000`
    );
    this.transactions = data.results;
  }
};
</script>

<style lang="scss" scoped>
.more-information {
  overflow-y: auto;
  height: 90vh;
  margin-bottom: 200px;
}
.table {
  border-top: 2px solid #555555;
  > .row {
    @media (max-width: 599px) {
      &:not(:nth-last-child(-n + 1)) {
        border-bottom: 1px solid #e9e9e9;
      }
    }
    @media (min-width: 600px) {
      &:not(:nth-last-child(-n + 2)) {
        border-bottom: 1px solid #e9e9e9;
      }
    }
    > .label {
      background-color: #f6f6f6;
      width: 160px;
    }
  }
}
.information {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -1.05px;
  color: #707070;
  margin-left: 0px;
  &.sub {
    font-weight: 500;
  }
}
.heading-title {
  font-family: "notosanskr-medium";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}

.more-information {
  overflow-y: auto;
  height: 90vh;
  margin-bottom: 200px;

  .address-section {
    padding: 24px 16px;
    .q-badge {
      font-weight: bold;
      font-size: 12px;
      line-height: 24px;
      letter-spacing: -0.9px;
      color: #ff5100;
      padding: 0 4px;
    }
    .title-heading {
      font-weight: 500;
      font-size: 21px;
      line-height: 32px;
      letter-spacing: -1.575px;
      color: #1a1a1a;
    }
  }
  .sub-title {
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -1.2px;
    color: #1a1a1a;
  }
  .help-text {
    font-size: 12px;
    line-height: 24px;
    color: #707071;
  }

  .area-stats-section {
    margin: 8px 0;
    .stat-title {
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      letter-spacing: -0.97px;
      color: #707070;
    }
    .stat-value {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -1.2px;
      color: #1a1a1a;
    }
  }

  .investment-point {
    background: white;
    margin-top: 8px;
    padding: 24px 16px;
    .title-heading {
      font-weight: 500;
      font-size: 17px;
      line-height: 26px;
      letter-spacing: -1.275px;
      color: #1a1a1a;
      padding-bottom: 10px;
    }

    .item {
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -1.05px;
      color: #1a1a1a;
      padding-top: 10px;
    }
  }
  .button-fixed-bottom {
    width: 100%;
    max-width: 1000px;
    position: fixed;
    bottom: 0;
    z-index: 1;

    text-align: center;
    padding: 0 16px;
    margin-bottom: 8px;
    .q-btn {
      background: #ff5100;
      width: 100%;
      font-weight: 500;
      font-size: 17px;
      line-height: 52px;
      /* identical to box height, or 306% */

      text-align: center;
      letter-spacing: -1.25px;
      border-radius: 12px;
    }
  }
}
</style>
