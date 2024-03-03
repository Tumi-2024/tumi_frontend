<template>
  <div>
    <q-btn
      unelevated
      padding="0px"
      class="modal-btn q-ma-none no-wrap"
      :class="[disable, propsClass]"
      @click="openModal"
      :disable="disable"
    >
      <span
        style="
          min-width: 5vh;
          min-height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: calc((12 / 984) * 100vh);
        "
      >
        {{ label }}
      </span>
    </q-btn>

    <!-- Dialog Section -->
    <q-dialog v-model="modal" position="bottom">
      <q-card class="notosanskr-regular">
        <q-card-section class="head-section bg-white nanum-square">
          <div class="indicator"></div>
        </q-card-section>

        <q-card-section
          class="q-pa-none bg-white nanum-square"
          style="min-height: 200px"
        >
          <component
            ref="component"
            :is="component"
            :value="value"
            :label="label"
            :keyName="keyName"
          />
        </q-card-section>

        <q-card-section class="q-pt-lg bg-white">
          <div class="row justify-around nanum-square">
            <div class="col q-mx-xs">
              <!-- reset | 초기화 -->
              <q-btn
                class="reset-btn bg-grey-3"
                flat
                text-color="black"
                label="초기화"
                padding="12px"
                style="font-size: calc((18 / 1000) * 100vh)"
                @click="initialize"
              />
            </div>
            <div class="col q-mx-xs">
              <!-- apply | 적용 -->
              <q-btn
                class="apply-btn bg-primary text-white"
                flat
                label="적용"
                padding="12px"
                style="font-size: calc((18 / 1000) * 100vh)"
                @click="save"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  PropertyType,
  PropertyPeriod,
  ExclusiveArea,
  PriceFilter,
  PersonFilter
} from "components/Utilities/PropertySearchFilter/Selections";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    PropertyType,
    ExclusiveArea,
    PriceFilter,
    PersonFilter,
    PropertyPeriod
  },
  data() {
    return {
      modal: false
    };
  },
  props: {
    label: { type: String, default: "" },
    component: { type: String, require: true },
    salePrice: { type: Boolean, default: false },
    charterPriceDeposit: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
    propsClass: { type: String, default: "" },
    value: { type: [Array, Object], require: false },
    keyName: { type: String, required: false, default: "" },
    isTransaction: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters("search", ["getCategoriesByKorean"])
  },
  methods: {
    ...mapActions("search", ["setIsMultiSelect"]),
    ...mapActions("area", ["fetchMapAreas"]),
    ...mapActions(["getSimpleHouses", "getSimpleHousesWithoutLocation"]),

    openModal() {
      this.modal = true;
      this.setIsMultiSelect(true);
    },
    save() {
      this.$refs.component.save();
      this.modal = false;
      const { query, path } = this.$route;
      const isTransaction = this.$route.name !== "listHouses";
      const area = this.$store.state.search.area;
      const price = this.$store.state.search.price;
      const initPrice = this.$store.state.search.initPrice;
      const person = this.$store.state.search.person;
      const period = this.$store.state.search.period;

      const category = this.getCategoriesByKorean;

      const getQueryArray = (keyName, params) => {
        if (keyName === "type_house__in" && params.length === 8) {
          return {};
        }
        if (Array.isArray(params)) {
          const hasValue = params.every((value) => value !== undefined);
          if (!hasValue || params.length === 0) return {};
          return {
            [keyName]: params.join(",")
          };
        }
        if (!params) return {};
        return {
          [keyName]: params
        };
      };

      if (!isTransaction) {
        if (this.$route.name !== 'listHouses') {
          if (!query.langtitude && !query.latitude) {
            this.$store.dispatch("getSimpleHousesWithoutLocation", {
              query: { subcity: query.subcity }
            });
          } else {
            this.$store.dispatch("getSimpleHouses", {
              query: { subcity: query.subcity }
            });
          }

          if (path.indexOf("list") < -1) {
            this.fetchMapAreas();
          }
        }
      } else {
        // console.log(category, 'category')
      }
      this.$emit("change", {
        page_size: 1000,
        ...getQueryArray("type_house__in", category),
        ...getQueryArray("price_selling_hope__range", [price.min, price.max]),
        ...getQueryArray("price_initial_investment__range", [
          initPrice.min,
          initPrice.max
        ]),
        ...getQueryArray([`${area?.value}__range`], [area?.min, area?.max]),
        ...getQueryArray([`modified__range`], period),
        ...getQueryArray("user__in", person),
        ...getQueryArray(
          "redevelopment_area__category"
          // getAreaTypeString()
        )
        // ...getRedevQuery(),
        // ...getAreaTypeString()
      });
    },
    initialize() {
      this.$refs.component.initialize();
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-btn {
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 500;
  line-height: calc((36 / 1312) * 100vh);
  font-size: calc((16 / 1312) * 100vh);
  text-align: center;
  letter-spacing: -1.05px;
  color: #1a1a1a;

  padding: 0 4px;
  margin: 0 2px;

  &.disable {
    color: #909090;
  }
}
.apply-btn,
.reset-btn {
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 28px;
  text-align: center;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  width: 100%;
  border-radius: 12px;
}
.q-dialog {
  .q-card {
    width: 100%;
    max-width: 1000px;
    height: auto;
    border-radius: 16px 16px 0 0;
    background: #f0f0f0;
    .empty-bottom-space {
      height: 200px;
    }
  }
  .head-section {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    line-height: 44px;
    letter-spacing: -1.275px;
    color: #1a1a1a;
    height: 44px;
    .indicator {
      background: #dbdbdb;
      padding: 2px;
      width: 49px;
    }
  }
}
</style>
