<template>
  <div class="action-container q-px-sm">
    <q-btn color="white" padding="8px" @click="interestLocation()">
      <q-icon size="45px">
        <img
          v-if="!$store.state.map.isInterest"
          src="~assets/icons/heart.svg"
          style="width: 30px"
          alt=""
          srcset=""
        />
        <img
          v-else
          style="width: 30px"
          src="~assets/icons/hearted.svg"
          alt=""
          srcset=""
        />
      </q-icon>
    </q-btn>

    <q-btn :color="getColor" @click="changeRedev" padding="8px">
      <div>
        <q-icon size="45px">
          <img src="~assets/icons/cone.svg" alt="" srcset="" />
        </q-icon>
        <div class="off text-dark notosanskr-bold">
          <!-- {{ getIsCone ? "ON" : "OFF" }} -->
          {{ getLabel }}
        </div>
      </div>
    </q-btn>

    <q-btn
      color="white"
      padding="8px"
      @click="$emit('accessUserLocation')"
      v-if="!hideGps"
    >
      <q-icon size="45px">
        <img
          style="width: 30px"
          src="~assets/icons/target.svg"
          alt=""
          srcset=""
        />
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
        { color: "white", label: "All", key: null },
        { color: "primary", label: "재개발", key: "재개발" },
        { color: "blue", label: "재건축", key: "재건축" },
        { color: "green", label: "가로주택", key: "가로주택" }
      ]
    };
  },
  methods: {
    ...mapActions("map", ["addInterestLocation", "setIsCone", "setAreaType"]),
    showRedevelopmentArea() {
      this.setIsCone(!this.getIsCone);
      this.$emit("showArea", !this.getIsCone);
    },
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
    ...mapGetters("map", ["getIsCone", "getAreaType"]),
    getLabel() {
      console.log(this.type.find((obj) => obj.key === this.getAreaType));
      console.log(this.getAreaType);
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
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    letter-spacing: -0.825px;
    color: #1a1a1a;
  }
}
</style>
