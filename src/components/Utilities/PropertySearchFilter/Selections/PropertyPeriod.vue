<template>
  <q-card-section>
    <div class="selection col q-mt-lg items-center">
      <div class="row q-mt-md justify-center">
        <q-input
          type="date"
          v-model="startDate"
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
          value="2020-"
          v-model="endDate"
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

const currentYYYYMMDD = `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}-${new Date().getDate()}`;

export default {
  components: {},
  props: {
    keyName: {
      type: String
    }
  },
  data() {
    return {
      startDate: undefined,
      endDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}-${new Date().getDate()}`
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
    getTime (date) {
      if (!date) return;
      const _date = new Date(date);
      const year = _date.getFullYear();
      const month = _date.getMonth() + 1;
      const day = _date.getDate();
      return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
    },

    onClickPreset({ value }) {
      this.startDate = this.getTime(value);
    },
    save() {
    },
    initialize() {
      this.startDate = null;
      this.endDate = currentYYYYMMDD;
    }
  },
  beforeMount() {
    const query = this.$route.query;

    if (query[this.keyName]) {
      this.startDate = query[this.keyName].split(",")[0];
      this.endDate = query[this.keyName].split(",")[1];
    }
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
