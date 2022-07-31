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
          :class="[this.textClass, { hover: isHover }]"
          @click="goToAdmin"
        >
          <q-badge outline color="primary" v-show="isRedevelop">재개발</q-badge>
          {{ address.replace(/대한민국/gi, "") }}
        </div>
        <div
          class="area-name sub"
          :class="[{ hover: isHover }]"
          @click="goToAdmin"
        >
          {{ building }}
          <span style="margin-left: 20px" v-show="isHover">
            >> 매물관리 화면
          </span>
        </div>
      </div>
      <div class="column justify-end flex" v-if="created">
        <div class="flex">
          <div class="area-name q-mr-sm">매물 등록 일자</div>
          <div class="area-name bold">{{ getDate(created) }}</div>
        </div>
        <div
          class="area-name q-mt-xs text-weight-bold text-right redev"
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

        // const getDate = (_date) => {
        //   const y = _date.getFullYear()
        //   const d = new Date(_date).getMonth();

        //   return y + String("." + d);
        // };
        return `${getYear()}.${getMonth()}.${getDay()}`;
      };
    }
  }
};
</script>
<style lang="scss">
.title {
  display: flex;
  justify-content: space-between;
}
.area-name {
  font-weight: 500;
  font-size: calc((18 / 1312) * 100vh);
  line-height: calc((22 / 1312) * 100vh);
  letter-spacing: -1.05px;
  color: #707070;
  margin-left: 0px;

  &.redev {
    font-size: calc((18 / 1312) * 100vh);
  }

  &.hover {
    text-decoration: underline;
    font-weight: bold;
    color: rgb(255, 90, 0);
  }
  &.sub {
    font-size: 13px;
    &.hover {
      font-weight: bold;
    }
  }
  &.bold {
    font-weight: 800;
  }
}
</style>
