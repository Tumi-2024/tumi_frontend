<template>
  <q-item-section>
    <div class="title">
      <div
        class="column"
        @mouseover="
          () => {
            if (!redirect) return;
            isHover = true;
          }
        "
        @mouseout="
          () => {
            if (!redirect) return;
            isHover = false;
          }
        "
      >
        <div
          class="area-name cursor-pointer"
          :class="[this.textClass, { hover: isHover, redirect }]"
          @click="goToAdmin"
        >
          <q-badge outline color="primary" v-show="isRedevelop">재개발</q-badge>
          {{ (address || "").replace(/대한민국/gi, "") }}
        </div>
        <div
          class="area-name sub"
          :class="[{ hover: isHover, redirect }]"
          @click="goToAdmin"
        >
          {{ building }}
          <span style="margin-left: 5px; font-size: 14px" v-show="isHover">
            >> 매물관리 화면
          </span>
        </div>
      </div>
      <div class="column justify-end flex" v-if="created">
        <div class="flex justify-end">
          <div class="area-name-after q-mr-sm">매물 등록 일자</div>
          <div class="area-name-after bold">{{ getDate(created) }}</div>
        </div>
        <div
          class="area-name-after q-mt-xs text-weight-bold text-right redev"
          v-if="redevName"
        >
          {{ redevName }}
        </div>
      </div>
    </div>
  </q-item-section>
</template>
<script>
export default {
  props: {
    textClass: String,
    address: {
      type: String,
      required: false,
      default: ""
    },
    building: {
      type: String,
      default() {
        return "";
      }
    },
    houseId: {
      type: Number,
      required: false,
      default: 0
    },
    redirect: {
      type: Boolean,
      required: false,
      default: false
    },
    isRedevelop: {
      type: Boolean,
      default: false
    },
    created: {
      type: String,
      required: false
    },
    redevName: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      isHover: false
    };
  },
  methods: {
    goToAdmin() {
      if (!this.redirect) {
        return;
      }
      window.open(
        `${process.env.ADMIN}realestates/house/${this.houseId}/change/`,
        "_blank"
      );
    }
  },
  computed: {
    getDate() {
      return (date) => {
        const _date = new Date(date);

        const getYear = () => {
          return _date.getFullYear();
        };
        const getMonth = () => {
          const m = _date.getMonth() + 1;
          if (m < 10) {
            return "0" + m;
          }
          return m;
        };

        const getDay = () => {
          const d = _date.getDate();
          if (d < 10) {
            return "0" + d;
          }
          return d;
        };

        return `${getYear()}.${getMonth()}.${getDay()}`;
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.area-name {
  font-weight: 500;
  font-size: calc((22 / 1312) * 100vh);
  line-height: calc((24 / 1312) * 100vh);
  letter-spacing: -1.05px;
  color: #707070;
  margin-left: 0px;

  &.redirect {
    font-weight: bold;
    cursor: pointer;
  }
  &.redev {
    font-size: calc((22 / 1312) * 100vh);
  }

  &.hover {
    text-decoration: underline;
    color: rgb(255, 90, 0);
  }
  &.sub {
    line-height: calc((26 / 1312) * 100vh);

    &.hover {
      font-weight: bold;
    }
  }
  &.bold {
    font-weight: 800;
  }
}

.area-name-after {
  font-weight: 500;
  font-size: calc((20 / 1312) * 100vh);
  line-height: calc((21 / 1312) * 100vh);
  letter-spacing: -1.05px;
  color: #707070;
  margin-left: 0px;
  cursor: pointer;
  font-weight: bold;
}
</style>
