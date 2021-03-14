<template>
  <div class="action-container ">
    <q-btn color="white" padding="8px" v-if="!hideHeart">
      <q-icon size="24px">
        <img src="~assets/icons/like.svg" alt="" srcset="" />
      </q-icon>
    </q-btn>

    <q-btn :color="cone ? 'primary' : 'white'" padding="8px" v-if="!hideCone">
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
      @click="getCurrentPosition()"
      v-if="!hideGps"
    >
      <q-icon size="24px">
        <img src="~assets/icons/target.svg" alt="" srcset="" />
      </q-icon>
    </q-btn>
  </div>
</template>

<script>
import { Plugins } from "@capacitor/core";

const { Geolocation } = Plugins;
export default {
  data() {
    return {
      cone: false
    };
  },
  props: {
    hideHeart: {
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
    getCurrentPosition() {
      Geolocation.getCurrentPosition()
        .then(position => {
          const { latitude: lat, longitude: lng } = position.coords;
          // console.log("Current", lat, lng);
          this.$emit("setUserLocation", { lat, lng });
        })
        .catch(e => {
          console.log(e, "error");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.action-container {
  position: fixed;
  z-index: 1;
  padding-top: 8px;

  display: flex;
  flex-direction: column;
}
.q-btn {
  border-radius: 8px;
  margin: 4px 16px;
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
