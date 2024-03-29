<template>
  <q-item class="column notosanskr-regular q-px-sm">
    <div class="row">
      <div class="column" style="flex: 1 0 300px; margin-right: 20px">
        <q-item-section>
          <address-with-badges
            :item="{
              isRedevelop,
              address: `${item.address}`,
              building: `${item.text_road ? item.text_road : ''}
              ${item.text_building || item.text_danji || ''}`
            }"
            :tags="getBadges(item, ctgr)"
          />
        </q-item-section>
      </div>
      <div class="flex items-center q-py-sm" style="flex: 1 1 600px">
        <area-item-info
          :infoProps="[]"
          :subInfoProps="getSubInfoProps(item)"
          col="4"
        />
      </div>
    </div>
    <q-separator style="margin-top: 20px" />
  </q-item>
</template>

<script>
import { toMoneyString, toKr } from "src/utils";
import areaItemInfo from "./AreaItemInfo";
import AddressWithBadges from "../Address/AddressWithBadges";

export default {
  name: "AreaItem",
  components: {
    "area-item-info": areaItemInfo,
    "address-with-badges": AddressWithBadges
  },
  props: {
    item: Object,
    ctgr: String,
    type: String,
    isRedevelop: Boolean
  },
  mounted() {},
  data() {
    return {
      category: [
        { key: "상업업무용", label: "상업업무용" },
        { key: "단독다가구", label: "단독다가구" },
        { key: "오피스텔", label: "오피스텔" },
        { key: "아파트", label: "아파트" },
        { key: "토지", label: "토지" },
        { key: "연립다세대", label: "연립다세대" }
      ],
      sellType: [
        { key: "SALE", label: "매매" },
        { key: "RENT", label: "임대" }
      ],
      subInfoProps: []
    };
  },
  methods: {
    toKr,
    toMoneyString,
    getdate(string1, string2) {
      if (!string1 || !string2) {
        return "";
      }
      const str2 = string2?.length === 1 ? `0${string2}` : string2;
      return string1?.slice(0, 4) + "." + string1?.slice(4, 6) + "." + str2;
    }
  },
  computed: {
    getReleaseDate() {
      return (dateString) => {
        if (!dateString) {
          return "-";
        }
        return (
          dateString.slice(0, 4) +
          "." +
          dateString.slice(4, 6) +
          "." +
          dateString.slice(6, 8)
        );
      };
    },
    getSubInfoProps() {
      return (item) => {
        switch (this.ctgr) {
          case "상업업무용":
            return [
              { label: "유형", value: item.text_type },
              {
                label: "계약일자",
                value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(
                  4,
                  6
                )}.${
                  item.text_day.length === 1
                    ? "0" + item.text_day
                    : item.text_day
                }`
              },
              {
                label: "거래금액",
                value: toMoneyString(item.price)
              },
              { label: "용도", value: item.text_type_area },
              { label: "전용/연면적", value: item.text_size_total + "m²" },
              { label: "도로조건", value: item.text_type_road },
              { label: "건축물주용도", value: item.text_type_yongdo },
              {
                label: "층",
                value: `${item.text_floor === "null" ? "-" : item.text_floor}층`
              },
              {
                label: "건축년도",
                value: `${item.text_year ? item.text_year + "년" : "-"}`
              },
              {
                label: "해제사유발생일",
                value: this.getReleaseDate(item.text_date_release)
              }
            ];
          case "단독다가구":
            return [
              { label: "주택유형", value: item.text_house_type },
              {
                label: "계약일자",
                value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(
                  4,
                  6
                )}.${
                  item.text_day.length === 1
                    ? "0" + item.text_day
                    : item.text_day
                }`
              },
              {
                label: "거래금액",
                value: toMoneyString(item.price)
              },
              {
                label: "대지면적",
                value: item.text_size_daeji ? item.text_size_daeji + "m²" : "-"
              },
              {
                label: "연면적",
                value: item.text_size_yean ? item.text_size_yean + "m²" : "-"
              },
              { label: "도로조건", value: item.text_type_road },
              {
                label: "건축년도",
                value: `${item.text_year ? item.text_year + "년" : "-"}`
              },
              {
                label: "해제사유발생일",
                value: this.getReleaseDate(item.text_date_release)
              }
            ];
          case "오피스텔":
            return [
              { label: "단지명", value: item.text_danji },
              {
                label: "계약일자",
                value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(
                  4,
                  6
                )}.${
                  item.text_day.length === 1
                    ? "0" + item.text_day
                    : item.text_day
                }`
              },
              {
                label: "거래금액",
                value: toMoneyString(item.price)
              },
              {
                label: "전용면적",
                value: item.text_size_private
                  ? item.text_size_private + "m²"
                  : "-"
              },
              {
                label: "층",
                value: `${item.text_floor === "null" ? "-" : item.text_floor}층`
              },
              {
                label: "건축년도",
                value: `${item.text_year ? item.text_year + "년" : "-"}`
              },
              {
                label: "해제사유발생일",
                value: this.getReleaseDate(item.text_date_release)
              }
            ];
          case "아파트":
            return [
              { label: "단지명", value: item.text_danji },
              {
                label: "계약일자",
                value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(
                  4,
                  6
                )}.${
                  item.text_day.length === 1
                    ? "0" + item.text_day
                    : item.text_day
                }`
              },
              {
                label: "거래금액",
                value: toMoneyString(item.price)
              },
              {
                label: "전용면적",
                value: item.text_size_private
                  ? item.text_size_private + "m²"
                  : "-"
              },
              {
                label: "층",
                value: `${item.text_floor === "null" ? "-" : item.text_floor}층`
              },
              {
                label: "건축년도",
                value: `${item.text_year ? item.text_year + "년" : "-"}`
              },
              {
                label: "해제사유발생일",
                value: this.getReleaseDate(item.text_date_release)
              }
            ];
          case "토지":
            return [
              {
                label: "계약일자",
                value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(
                  4,
                  6
                )}.${
                  item.text_day.length === 1
                    ? "0" + item.text_day
                    : item.text_day
                }`
              },
              { label: "용도", value: item.text_type_area },
              {
                label: "거래금액",
                value: toMoneyString(item.price)
              },
              { label: "계약면적", value: item.text_size_contract + "m²" },
              { label: "도로조건", value: item.text_type_road },
              { label: "지목", value: item.text_jimog },
              { label: "지분구분", value: item.text_type_land },
              {
                label: "해제사유발생일",
                value: this.getReleaseDate(item.text_date_release)
              }
            ];
          case "연립다세대":
            return [
              { label: "건물명", value: item.text_building },
              {
                label: "계약일자",
                value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(
                  4,
                  6
                )}.${
                  item.text_day.length === 1
                    ? "0" + item.text_day
                    : item.text_day
                }`
              },
              {
                label: "거래금액",
                value: toMoneyString(item.price)
              },
              {
                label: "대지권면적",
                value: item.text_size_land ? item.text_size_land + "m²" : "-"
              },
              {
                label: "전용면적",
                value: item.text_size_private
                  ? item.text_size_private + "m²"
                  : "-"
              },
              {
                label: "층",
                value: `${item.text_floor === "null" ? "-" : item.text_floor}층`
              },
              {
                label: "건축년도",
                value: `${item.text_year ? item.text_year + "년" : "-"}`
              },
              {
                label: "해제사유발생일",
                value: this.getReleaseDate(item.text_date_release)
              }
            ];
          case "분양":
            return [
              { label: "분양/입주", value: "분양/입주" },
              { label: "단지명", value: item.text_danji },
              {
                label: "전용면적",
                value: item.text_size_private
                  ? item.text_size_private + "m²"
                  : "-"
              },
              {
                label: "계약일자",
                value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(
                  4,
                  6
                )}.${
                  item.text_day.length === 1
                    ? "0" + item.text_day
                    : item.text_day
                }`
              },
              {
                label: "거래금액",
                value: toMoneyString(item.price)
              },
              {
                label: "층",
                value: `${item.text_floor === "null" ? "-" : item.text_floor}층`
              },
              {
                label: "해제사유발생일",
                value: this.getReleaseDate(item.text_date_release)
              }
            ];
          default:
            return [];
        }
      };
    },

    getBadges() {
      return (item, ctgr) => {
        const getArea = () => {
          switch (item.category) {
            case "상업업무용":
              return item.text_size_total || '-'
            case "단독다가구":
              return item.text_size_yean || '-'
            case "오피스텔":
              return item.text_size_private || '-'
            case "아파트":
              return item.text_size_private || '-'
            case "토지":
              return item.text_size_contract || '-'
            case "연립다세대":
              return item.text_size_private || '-'
          }
        }
        const getColor = (type) => {
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
        return [
          {
            type: "redevType",
            value: item.redevelopment_area?.title,
            color: getColor(item.redevelopment_area)
          },
          {
            type: "houseType",
            value: (
              this.category.find((obj) => obj.key === this.ctgr) || {
                label: ""
              }
            ).label,
            label: '주택유형'
          },
          {
            type: "area",
            label: "건물면적",
            value: getArea() + "m²"
          },
          {
            type: "price",
            label: "매매가",
            value: `${toMoneyString(item.price)}`
          },
          { type: "date", label: "거래일자", value: this.getdate(item.text_month, item.text_day) }
        ];
      };
    },
    sale() {
      const sale = {};
      sale.type = this.item.type_sale;
      if (sale.type === "sale") {
        sale.price = toMoneyString(this.item.price_sale);
        return sale;
      }

      if (sale.type === "charter" || sale.type === "half-charter") {
        sale.price =
          toMoneyString(this.item.price_rent) !== ""
            ? `${toMoneyString(this.item.price_charter)}, ${toMoneyString(
                this.item.price_rent
              )}`
            : toMoneyString(this.item.price_charter);
        return sale;
      }

      if (sale.type === "rent") {
        sale.price =
          toMoneyString(this.item.price_rent) !== ""
            ? `${toMoneyString(this.item.price_deposit)}, ${toMoneyString(
                this.item.price_rent
              )}`
            : toMoneyString(this.item.price_deposit);
        return sale;
      }

      return {
        sale: {
          type: "",
          price: ""
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.area-name {
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -1.05px;
  color: #707070;
  margin-left: 0px;
  &.sub {
    font-size: 14px;
  }
}
.area-amount {
  font-weight: 500;
  font-size: 19px;
  line-height: 26px;
  letter-spacing: -1.35px;
  color: #00a4aa;
  margin-left: 0px;
}
.additional-info {
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.9px;
  color: #3a3a3a;
  div {
    background: #f6f6f6;
    margin-right: 7px;
  }
}
</style>
