<template>
  <q-card-section>
    <div class="selection col q-mt-lg items-center">
      <div class="row q-mt-md justify-center">
        <q-input
          type="date"
          @change="onChangeStartDate"
          :value="TransformDateToInput(startDate)"
          filled
          dense
          maxlength="7"
          style="width: 40%"
        />
        <span style="font-size: calc((30 / 1000) * 100vh)" class="q-mx-lg">
          ~
        </span>
        <q-input
          type="date"
          @change="onChangeEndDate"
          :value="TransformDateToInput(endDate)"
          filled
          dense
          maxlength="7"
          style="width: 40%"
        />
      </div>
    </div>

    <div style="width: 100%" class="q-mt-lg selection">
      <q-btn
        v-for="(preset, index) of getPresets"
        :key="index"
        flat
        dense
        :style="[{ width: `calc(100% / ${getPresets.length / 2})` }]"
        @click="onClickPreset(preset)"
      >
        <div
          class="column items-center"
          style="font-size: calc((12 / 1000) * 100vh)"
        >
          {{ preset.label }}
        </div>
      </q-btn>
    </div>
  </q-card-section>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { toMoneyString } from "src/utils";

export default {
  components: {},
  data() {
    return {
      startDate: null,
      endDate: null
    };
  },
  computed: {
    ...mapGetters("search", ["area", "isMultiSelect"]),
    getPresets() {
      const _date = new Date().getTime();

      const _preset = [
        { label: "3년 전", value: _date - 3 * 365 * 24 * 60 * 60 * 1000 },
        { label: "2년 전", value: _date - 2 * 365 * 24 * 60 * 60 * 1000 },
        { label: "1년 전", value: _date - 365 * 24 * 60 * 60 * 1000 },
        { label: "6개월 전", value: _date - 180 * 24 * 60 * 60 * 1000 },
        { label: "3개월 전", value: _date - 90 * 24 * 60 * 60 * 1000 },
        { label: "1개월 전", value: _date - 30 * 24 * 60 * 60 * 1000 }
      ];
      return _preset;
    }
  },
  methods: {
    toMoneyString,
    ...mapActions("search", ["setPeriod"]),
    TransformDateToInput(dateNumber, format = "yyyy-MM-dd") {
      if (!dateNumber) return;
      const date = new Date(dateNumber);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month < 10 ? `0${month}` : month}-${
        day < 10 ? `0${day}` : day
      }`;
    },

    onChangeStartDate(e) {
      const _value = e.target.value;
      this.startDate = new Date(_value).getTime();
    },
    onChangeEndDate(e) {
      const _value = e.target.value;
      this.endDate = new Date(_value).getTime();
    },

    onClickPreset({ value }) {
      this.startDate = value;
    },
    save() {
      this.setPeriod([
        this.TransformDateToInput(this.startDate),
        this.TransformDateToInput(this.endDate)
      ]);
    },
    initialize() {
      this.startDate = null;
      this.endDate = null;
      this.setPeriod([undefined, undefined]);
    }
  },
  mounted() {
    this.endDate = new Date();
  }
};
</script>

<style lang="scss" scoped>
.title {
  span {
    color: #a0a0a0;
  }
}
.selection {
  font-size: 15px;
  line-height: 24px;
  .q-btn {
    border: 1px solid rgba(128, 128, 128, 0.171);
    height: 44px;
    border-radius: 0;
    &.selected {
      border: 2px solid #fc5b2e;
      text-align: center;
      color: #ff5100;
    }
  }
}
</style>
