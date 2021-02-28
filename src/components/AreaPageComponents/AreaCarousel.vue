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
      >
        <q-carousel-slide
          v-for="(slide, i) in slides"
          :key="i"
          :name="slide.id"
          class="row"
        >
          <section class="map-area">
            <div class="mask"></div>
            <area-google-map :position="slide.position" class="area-map" />
          </section>

          <section class="row justify-between items-center q-pt-sm col-12">
            <div class="text-address notosanskr-medium">
              서울시 강남구 대치동
            </div>

            <q-btn
              unelevated
              class="delete-btn notosanskr-regular"
              padding="0px"
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
            v-for="(slide, i) in slides"
            :key="i"
            @click="currentSlide = slide.id"
            :class="currentSlide == slide.id ? 'bg-primary' : 'bg-grey-12'"
          ></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import AreaGoogleMap from "./AreaGoogleMap";
export default {
  components: {
    AreaGoogleMap
  },
  data() {
    return {
      currentSlide: "slide1",
      slides: [
        {
          id: "slide1",
          areaName: "서울시 강남구 대치동",
          position: { lat: 37.54439180667893, lng: 127.04601120488171 }
        },
        {
          id: "slide2",
          areaName: "종로1가 대성스카이렉스",
          position: { lat: 37.57551921371042, lng: 127.00744586230466 }
        },
        {
          id: "slide3",
          areaName: "한남 3구역",
          position: { lat: 37.51934447679332, lng: 127.05233867508158 }
        },
        {
          id: "slide4",
          areaName: "서울시 강남구 대치동",
          position: { lat: 37.51764688948564, lng: 127.05859057443703 }
        }
      ],
      lorem: "Map content here"
    };
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  position: relative;
  .mask {
    width: 100%;
    height: 100%;
    background: url("../../assets/map-overlay.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

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
