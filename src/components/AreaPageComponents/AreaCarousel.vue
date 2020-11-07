<template>
  <q-card flat class="area-interest">
    <q-card-section class="q-pa-none">
      <q-carousel
        v-model="currentSlide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        class="rounded-borders"
      >
        <q-carousel-slide
          v-for="(slide, i) in slides"
          :key="i"
          :name="slide"
          class="row"
        >
          <div class="image-area bg-orange col-12">
            <q-icon name="style" color="secondary" size="56px" />
            {{ lorem }}
          </div>
          <div class="row justify-between items-center q-pt-sm col-12">
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
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div class="row justify-center">
        <div class="q-gutter-sm">
          <q-btn
            flat
            class="carousel-btn q-pa-none q-pa-md-md"
            v-for="(slide, i) in slides"
            :key="i"
            @click="currentSlide = slide"
            :class="currentSlide == slide ? 'bg-primary' : 'bg-grey-12'"
          ></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: "slide1",
      slides: ["slide1", "slide2", "slide3", "slide4"],
      lorem: "Map content here"
    };
  }
};
</script>

<style scoped>
.q-carousel {
  height: 230px;
}

.carousel-btn {
  width: 12px;
  height: 4px;
  border-radius: 4px;
}

.image-area {
  height: 172px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
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
    height: 460px;
  }
  .image-area {
    height: 344px;
  }
}
</style>
