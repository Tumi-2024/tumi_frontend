<template>
  <div class="action-container q-px-sm">

    <q-btn v-if="!$store.state.map.locationLoading" color="white" padding="8px" @click="interestLocation()">
      <q-icon size="24px">
        <img v-if="!$store.state.map.isInterest" src="~assets/icons/heart.svg" alt="" srcset="" />
        <img v-if="$store.state.map.isInterest" src="~assets/icons/hearted.svg" alt="" srcset="" />
      </q-icon>
    </q-btn>

    <q-btn
      :color="cone ? 'primary' : 'white'"
      @click="showRedevelopmentArea"
      padding="8px"
      v-if="!hideCone"
    >
      <div>
        <q-icon size="24px">
          <img src="~assets/icons/cone.svg" alt="" srcset="" />
        </q-icon>
        <div class="off text-dark notosanskr-bold">
          {{ cone ? "ON" : "OFF" }}
        </div>
      </div>
    </q-btn>

    <q-btn
      color="white"
      padding="8px"
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
import { mapGetters, mapActions } from "vuex"
import {
  loginModalMutation,
  loginModalStore
} from "src/components/Utilities/LoginModal/LoginModalState";

export default {
  data() {
    return {
      cone: false
    };
  },
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
  methods: {
    ...mapActions("map", [
      "addInterestLocation"
    ]),
    showRedevelopmentArea() {
      this.cone = !this.cone;
      this.$emit("showArea", this.cone);
    },
    interestLocation() {
      try {
        let token = this.$store.state.user.data.token;
        if (token) {
          this.addInterestLocation();
        } else {
          this.setModal();
        }
      } catch(e) {
        this.setModal();
      }
    },
    setModal() {
      loginModalMutation.setModal();
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
    font-size: 11px;
    line-height: 16px;
    text-align: center;
    letter-spacing: -0.825px;
    color: #1a1a1a;
  }
}
</style>
