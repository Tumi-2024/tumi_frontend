<template>
  <div class="more-information notosanskr-light">
    <section class="address-section bg-white">
      <q-badge
        outline
        :color="getColor(getMapSelectedArea.category)"
        :label="getMapSelectedArea.category"
      />

      <!-- <q-badge
        outline
        color="primary"
        class="badge-type nanum-square"
        label="재개발 구역"
      /> -->
      <div class="title-heading nanum-square">
        <!-- 서울영등포 공공주택지구 -->
        {{ getMapSelectedArea.title }}
      </div>
      <div class="sub-title notosanskr-regular">
        <!-- 서울 특별시 동대문구 전농동 106-1 -->
        {{ getMapSelectedArea.address }}
      </div>
    </section>
    <section class="investment-point bg-white">
      <div class="title-heading nanum-square">정비사업 개요</div>
      <div class="row table">
        <div class="col-sm-6 col-12 row" v-for="(item, i) of getInfo" :key="i">
          <div class="q-pa-sm label" style="color: #707070">
            <span class="information text-bold">{{ item.label }}</span>
          </div>
          <a
            class="information sub flex items-center q-px-sm"
            :href="`tel:${item.value}`"
            v-if="item.phone"
          >
            {{ item.value }}
          </a>
          <span class="sub flex items-center q-px-sm" v-else>{{
            item.value
          }}</span>
        </div>
      </div>
    </section>
    <section class="investment-point bg-white">
      <div class="title-heading nanum-square">도시계획 사항</div>
      <div class="row table">
        <div
          class="col-sm-6 col-12 row"
          :class="[{ 'col-sm-12': i === 0 }, { 'col-sm-6': i < 3 }]"
          v-for="(item, i) of getInfo1"
          :key="i"
        >
          <div class="q-pa-sm label">
            <span class="information">{{ item.label }}</span>
          </div>
          <a
            class="information sub flex items-center q-px-sm"
            :href="`tel:${item.value}`"
            v-if="item.phone"
          >
            {{ item.value }}
          </a>
          <span class="sub flex items-center q-px-sm" v-else>
            {{ item.value }}
          </span>
        </div>
      </div>
    </section>
    <section class="investment-point bg-white">
      <div class="title-heading nanum-square">건축 계획</div>
      <div class="row table">
        <div class="col-sm-6 col-12 row" v-for="(item, i) of getInfo2" :key="i">
          <div class="q-pa-sm label">
            <span class="information">{{ item.label }}</span>
          </div>
          <a
            class="sub flex items-center q-px-sm"
            :href="`tel:${item.value}`"
            v-if="item.phone"
            >{{ item.value }}</a
          >
          <span class="sub flex items-center q-px-sm" v-else>{{
            item.value
          }}</span>
        </div>
      </div>
    </section>
    <section class="investment-point bg-white">
      <div class="title-heading nanum-square">주택 공급 계획</div>
      <span style="font-weight: 500">분양 계획</span>
      <div class="row table" style="margin-bottom: 20px">
        <div class="col-sm-3 col-12 row" v-for="(item, i) of getInfo3" :key="i">
          <div class="q-pa-sm label">
            <span class="information">{{ item.label }}</span>
          </div>
          <a
            class="sub flex items-center q-px-sm"
            :href="`tel:${item.value}`"
            v-if="item.phone"
          >
            {{ item.value }}
          </a>
          <span class="sub flex items-center q-px-sm" v-else>
            {{ item.value }} 세대
          </span>
        </div>
      </div>
      <span style="font-weight: 500">임대 계획</span>
      <div class="row table">
        <div class="col-sm-3 col-12 row" v-for="(item, i) of getInfo4" :key="i">
          <div class="q-pa-sm label">
            <span class="information">{{ item.label }}</span>
          </div>
          <a
            class="information sub flex items-center q-px-sm"
            :href="`tel:${item.value}`"
            v-if="item.phone"
          >
            {{ item.value }}
          </a>
          <span class="sub flex items-center q-px-sm" v-else>
            {{ item.value }} 세대
          </span>
        </div>
      </div>
    </section>
    <section class="investment-point bg-white">
      <redevelopment-progress
        :items="getRedevelopmentSteps()"
        title="진행단계"
      />
    </section>

    <section
      class="investment-point notosanskr-regular"
      v-if="getMapSelectedArea.description_investment"
    >
      <div class="title-heading nanum-square">투자포인트</div>
      <div
        class="item summernote"
        v-html="getMapSelectedArea.description_investment"
      ></div>
    </section>

    <section class="button-fixed-bottom">
      <q-btn
        @click="goToDetail"
        color="primary"
        text-color="white"
        class="nanum-square"
        label="이지역 투자매물 보러가기"
      />
    </section>

    <section style="min-height: 200px"></section>
  </div>
</template>

<script>
import RedevelopmentProgress from "components/Utilities/RedevelopmentProgress";

import { toMoneyString } from "src/utils";
import { mapGetters } from "vuex";
export default {
  components: {
    "redevelopment-progress": RedevelopmentProgress
    // BarChart,
  },

  computed: {
    ...mapGetters("area", ["getMapSelectedArea"]),
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
    getInfo() {
      return [
        {
          label: "개발사업 유형",
          value: this.getMapSelectedArea.business_type
        },
        { label: "개발구역 명칭(단축)", value: this.getMapSelectedArea.title },
        {
          label: "개발구역 명칭(조합)",
          value: this.getMapSelectedArea.title_area
        },
        {
          label: "사업 추진 경과",
          value: this.getMapSelectedArea.redevelopment_step
        },
        { label: "사업 유형", value: this.getMapSelectedArea.business_type },
        {
          label: "사업 구분",
          value: this.getMapSelectedArea.business_classification
        },
        {
          label: "추진위 수행여부",
          value: this.getMapSelectedArea.status_promotion_committee
        },
        {
          label: "공공지원 대상여부",
          value: this.getMapSelectedArea.status_public_support
        },
        {
          label: "건축계획",
          value: this.getMapSelectedArea.status_architectural_plan
        },
        {
          label: "주택공급계획",
          value: this.getMapSelectedArea.status_sharing_plan
        },
        { label: "정비구역 위치", value: this.getMapSelectedArea.area },
        {
          label: "구역면적 (m²)",
          value: this.getValueWithUnit(this.getMapSelectedArea.size_area, "m²")
        },
        {
          label: "조합원 수",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.count_member,
            "명"
          )
        },
        {
          label: "부동산 소유자 수",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.count_owner,
            "명"
          )
        },
        {
          label: "세입자 수",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.count_house,
            "명"
          )
        }
      ];
    },
    getInfo1() {
      return [
        { label: "용도 지역", value: this.getMapSelectedArea.usage_area },
        { label: "용도 지구", value: this.getMapSelectedArea.district },
        { label: "주용도", value: this.getMapSelectedArea.main_use },
        {
          label: "건폐율",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.percentage_building_to_land,
            "%"
          )
        },
        {
          label: "용적률",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.percentage_floor_area,
            "%"
          )
        },
        {
          label: "층수(지상 | 지하)",
          value: `${this.getMapSelectedArea.floor_up}층 | ${this.getMapSelectedArea.floor_down}층`
        }
      ];
    },
    getInfo2() {
      return [
        {
          label: "대지 면적(m²)",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.size_land_area,
            "m²"
          )
        },
        {
          label: "연 면적(m²)",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.size_total_area,
            "m²"
          )
        },
        {
          label: "건축 면적(m²)",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.size_building_area,
            "m²"
          )
        },
        {
          label: "구역 면적(m²)",
          value: this.getValueWithUnit(this.getMapSelectedArea.size_area, "m²")
        },
        {
          label: "택지 면적(m²)",
          value: this.getValueWithUnit(this.getMapSelectedArea.size_land, "m²")
        },
        {
          label: "도로 면적(m²)",
          value: this.getValueWithUnit(this.getMapSelectedArea.size_road, "m²")
        },
        {
          label: "공원 면적(m²)",
          value: this.getValueWithUnit(this.getMapSelectedArea.size_park, "m²")
        },
        {
          label: "녹지 면적(m²)",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.size_greenery,
            "m²"
          )
        },
        {
          label: "공공공지 면적(m²)",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.size_public,
            "m²"
          )
        },
        {
          label: "학교 면적(m²)",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.size_school,
            "m²"
          )
        },
        {
          label: "기타 면적(m²)",
          value: this.getValueWithUnit(this.getMapSelectedArea.size_etc, "m²")
        }
      ];
    },
    // 주택 공급 계획 (분양)
    getInfo3() {
      return [
        {
          label: "총 세대수",
          value: this.getValueWithUnit(this.getMapSelectedArea.count_sale, "")
        },
        {
          label: "60m² 이하",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.count_sale_lt_60,
            ""
          )
        },
        {
          label: "60m² ~ 85m²",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.count_sale_gt_60_lt_85,
            ""
          )
        },
        {
          label: "85m² 초과",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.count_sale_gt_85,
            ""
          )
        }
      ];
    },
    // 주택 공급 계획 (임대)
    getInfo4() {
      return [
        {
          label: "총 세대수",
          value: this.getValueWithUnit(this.getMapSelectedArea.count_rent, "")
        },
        {
          label: "60m² 이하",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.count_rent_lt_40,
            ""
          )
        },
        {
          label: "60m² ~ 85m²",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.count_rent_gt_40_lt_85,
            ""
          )
        },
        {
          label: "85m² 초과",
          value: this.getValueWithUnit(
            this.getMapSelectedArea.count_rent_gt_85,
            ""
          )
        }
      ];
    },
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
        this.transactions.every((transaction) => {
          return !transaction.recent_transactions[value];
        });

      return options.map((option) => {
        return { ...option, disable: getDisable(option.value) };
      });
    }
  },
  methods: {
    goToDetail() {
      this.$router.push({
        name: "listHouses",
        query: {
          redevelopment_area: this.getMapSelectedArea.id,
          title: this.getMapSelectedArea.title
        }
      });
    },
    getValueWithUnit(value, unit) {
      if (value === undefined || value === null) {
        return "-";
      }
      const _value = Number(value);
      return _value.toLocaleString() + " " + unit;
    },
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
        case "redevelopment_step":
          return this.getMapSelectedArea.redevelopment_step
            ? this.getMapSelectedArea.redevelopment_step.title
            : "-";
        default:
          return this.getMapSelectedArea.construction_company || "-";
      }
    },
    toMoneyString(value, add) {
      return toMoneyString(value, add);
    },
    getRedevelopmentSteps() {
      let steps = [];
      if (this.getMapSelectedArea.steps) {
        steps = this.getMapSelectedArea.steps.map((item) => ({
          title: item.title,
          date: item.date
        }));
      }
      return steps;
    }
  }
};
</script>

<style lang="scss" scoped>
.information {
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -1.05px;
  color: rgb(112, 112, 112);
  margin-left: 0px;
  word-break: break-all;
  font-weight: bold;
}
.more-information {
  overflow-y: auto;
  height: 90vh;
  margin-bottom: 200px;
  color: #707070;
  .table {
    border-top: 2px solid #555555;
    border-bottom: 1px solid #e9e9e9;
    > .row {
      @media (max-width: 599px) {
        &:not(:nth-last-child(-n + 1)) {
          border-bottom: 1px solid #e9e9e9;
        }
      }
      &:not(:nth-last-child(-n + 2)) {
        border-bottom: 1px solid #e9e9e9;
      }
      > .label {
        background-color: #f6f6f6;
        width: 130px;
      }
    }
  }

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
    .sub-title {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -1.2px;
      color: #707070;
    }
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
    .table {
      margin-top: 10px;
      border-top: 1px solid #1a1a1a;
    }
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
