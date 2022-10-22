<template>
  <div class="action-container q-px-sm" style="min-width: 70px">
    <!-- <q-btn color="white" padding="8px" @click="interestLocation()">
      <q-icon>
        <img
          v-if="!$store.state.map.isInterest"
          src="~assets/icons/heart.svg"
          alt=""
          srcset=""
        />
        <img v-else src="~assets/icons/hearted.svg" alt="" srcset="" />
      </q-icon>
    </q-btn> -->

    <q-btn :color="getColor" @click="changeRedev" padding="6px">
      <div>
        <q-icon size="30px">
          <img src="~assets/icons/cone.svg" alt="" srcset="" />
        </q-icon>
        <div
          :class="{ 'text-white': getColor !== 'yellow-12' }"
          class="off text-dark notosanskr-bold"
        >
          {{ getLabel }}
        </div>
      </div>
    </q-btn>

    <q-btn
      color="white"
      padding="12px"
      @click="$emit('accessUserLocation')"
      v-if="!hideGps"
    >
      <q-icon size="24px">
        <img src="~assets/icons/target.svg" alt="" srcset="" />
      </q-icon>
    </q-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { loginModalMutation } from "src/components/Utilities/LoginModal/LoginModalState";

export default {
  props: {
    disableHeart: {
      type: Boolean,
      default: false
    },
    hideCone: {
      type: Boolean,
      default: false
    },
    hideGps: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      type: [
        // { color: "yellow-12", label: "All", key: null },
        { color: "primary", label: "재개발", key: "재개발" },
        { color: "blue", label: "재건축", key: "재건축" },
        { color: "green", label: "기타사업", key: "기타사업" },
        { color: "grey-6", label: "일반", key: "일반" }
      ]
    };
  },
  methods: {
    ...mapActions("map", ["addInterestLocation", "setIsCone", "setAreaType"]),
    changeRedev() {
      const index = this.type.findIndex(({ key }) => key === this.getAreaType);
      this.setAreaType(this.type[(index + 1) % this.type.length].key);
      this.$emit("showArea", this.type[(index + 1) % this.type.length].key);
    },
    interestLocation() {
      try {
        if (this.$store.state.user.data.token) {
          this.addInterestLocation();
        } else {
          this.setModal();
        }
      } catch (e) {
        this.setModal();
      }
    },
    setModal() {
      loginModalMutation.setModal();
    }
  },
  computed: {
    ...mapGetters(["estate", "getViewRedevOnly"]),
    ...mapGetters("map", ["getAreaType"]),
    getLabel() {
      return this.type.find(({ key }) => key === this.getAreaType)?.label;
    },
    getColor() {
      return this.type.find(({ key }) => key === this.getAreaType)?.color;
    }
  }
};
</script>

<style lang="scss" scoped>
.action-container {
  background: transparent;
  position: fixed;
  z-index: 1;
  padding-top: 8px;

  display: flex;
  flex-direction: column;
}
.q-btn {
  border-radius: 8px;
  margin: 4px 0px;
  .off {
    font-weight: bold;
    font-size: calc((13 / 1312) * 100vh);
    line-height: calc((16 / 1312) * 100vh);
    text-align: center;
    letter-spacing: -0.825px;

    color: #1a1a1a;
  }
}
</style>
