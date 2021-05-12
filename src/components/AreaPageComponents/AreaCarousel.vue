<template>
  <q-card flat class="area-interest">
    <q-card-section class="q-pa-none">
      <q-carousel
        v-model="currentSlide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        swipeable
        control-color="primary"
        class="rounded-borders"
        @transition="subcityHouses"
      >
        <q-carousel-slide
          v-for="(interest, i) in myInterestArea"
          :key="i"
          :name="i"
          class="row"
        >
          <section class="map-area">
            <div class="mask" :class="i % 2 ? 'blue' : 'orange'"></div>
            <!-- <area-google-map :position="{ lat: Number(interest.latitude), lng: Number(interest.longitude) }" class="area-map" /> -->
            <area-google-map
              :position="{
                lat: parseFloat(interest.latitude),
                lng: parseFloat(interest.longitude)
              }"
              class="area-map"
            />
          </section>

          <section class="row justify-between items-center q-pt-sm col-12">
            <div class="text-address notosanskr-medium">
              {{
                interest.address
                  ? interest.address
                      .split(" ")
                      .slice(1)
                      .join(" ")
                  : null
              }}
            </div>

            <q-btn
              unelevated
              class="delete-btn notosanskr-regular"
              padding="0px"
              @click="removeInterest(interest.id)"
            >
              관심지역 삭제
            </q-btn>
          </section>
        </q-carousel-slide>
      </q-carousel>

      <div class="row justify-center">
        <div class="q-gutter-sm">
          <q-btn
            flat
            class="carousel-btn q-pa-none q-pa-md-md"
            v-for="(slide, i) in $store.state.map.interest"
            :key="i"
            @click="currentSlide = i"
            :class="currentSlide == i ? 'bg-primary' : 'bg-grey-12'"
          ></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import AreaGoogleMap from "./AreaGoogleMap";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AreaGoogleMap
  },
  data() {
    return {
      currentSlide: 0,
      lorem: "Map content here",
      interests: [
        {
          id: 1,
          address: "sdsadasd"
        },
        {
          id: 1,
          address: "sdsadasd"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("map", ["myInterestArea"])
  },
  mounted() {
    this.subcityHouses(0);
  },
  methods: {
    ...mapActions("map", ["removeLocationInterest"]),
    ...mapActions(["getDetailHouses"]),
    removeInterest(num) {
      this.removeLocationInterest(num);
      this.currentSlide = 0;
    },
    subcityHouses(val) {
      if (this.myInterestArea[val]) {
        const subcity = this.$store.state.map.interest[val];
        this.$emit("setSubcity", subcity);
        this.getDetailHouses(`subcity=${subcity.id}&page_size=30`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.q-carousel {
  height: 230px;
}

.carousel-btn {
  width: 12px;
  height: 4px;
  border-radius: 4px;
}

.map-area {
  height: 172px;
  width: 100%;
  position: relative;
  .mask {
    width: 100%;
    height: 100%;
    &.orange {
      background: url("../../assets/map-overlay.svg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
    }
    &.blue {
      background: url("../../assets/map-overlay-blue.svg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
    }

    position: absolute;
    bottom: 0;
    top: 0;
    z-index: 10;
  }
  .area-map {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
}
.text-address {
  font-weight: 500;
  font-size: 21px;
  line-height: 32px;
  letter-spacing: -1.575px;
  color: #1a1a1a;
}

.delete-btn {
  border: 2px solid #dbdbdb;
  border-radius: 4px;
  font-size: 13px;
  line-height: 28px;
  /* identical to box height, or 215% */
  text-align: center;
  letter-spacing: -0.97px;
  color: #707070;
  padding: 0px 9px;
}

@media (min-width: 770px) {
  .q-carousel {
    min-height: 560px;
  }
  .map-area {
    height: 444px;
    max-width: 90%;
    margin: auto;
  }
}
</style>
