<template>
  <div class="q-mt-sm">
    <q-card flat class="area-interest">
      <q-card-section>
        <q-carousel
          v-model="currentSlide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          control-color="primary"
          class="rounded-borders"
        >
          <q-carousel-slide name="slide1" class="column no-wrap flex-center">
            <q-icon name="style" color="primary" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="slide2" class="column no-wrap flex-center">
            <q-icon name="live_tv" color="primary" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="slide3" class="column no-wrap flex-center">
            <q-icon name="layers" color="primary" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="slide4" class="column no-wrap flex-center">
            <q-icon name="terrain" color="primary" size="56px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-carousel-slide>
        </q-carousel>

        <div class="row justify-center">
          <div class="q-gutter-sm">
            <q-btn
              flat
              class="carousel-btn q-px-md q-py-xs"
              v-for="(slide, i) in slides"
              :key="i"
              @click="currentSlide = slide"
              :class="currentSlide == slide ? 'bg-primary' : 'bg-grey-12'"
            ></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "Area",
  data() {
    return {
      currentSlide: "slide1",
      slides: ["slide1", "slide2", "slide3", "slide4"],
      lorem: "heeelllos"
    };
  }
};
</script>

<style scoped>
.carousel-btn {
  width: 12px;
  height: 4px;
  border-radius: 4px;
}
</style>
