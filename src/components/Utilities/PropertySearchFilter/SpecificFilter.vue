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
        <q-card-section class="head-section bg-white notosanskr-medium">
          <div class="indicator"></div>
        </q-card-section>

        <q-card-section
          class="q-pa-none bg-white notosanskr-medium"
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
          <div class="row justify-around notosanskr-medium">
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
  ExclusiveArea,
  PriceFilter,
  PersonFilter
} from "components/Utilities/PropertySearchFilter/Selections";
import { mapActions } from "vuex";
export default {
  components: {
    PropertyType,
    ExclusiveArea,
    PriceFilter,
    PersonFilter
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
    keyName: { type: String, required: false, default: "" }
  },
  methods: {
    ...mapActions("queryBuilder", ["setIsMultiSelect"]),
    ...mapActions("area", ["fetchMapAreas"]),
    ...mapActions(["getSimpleHouses"]),

    openModal() {
      this.modal = true;
      this.setIsMultiSelect(true);
    },
    save() {
      this.$refs.component.save();
      this.modal = false;
      this.$store.dispatch("getSimpleHouses");
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
