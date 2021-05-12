<template>
  <div>
    <div class="row q-mt-md q-col-gutter-sm">
      <div class="col">
        <p class="title1">"주택유형별" 매물 찾기</p>
      </div>
    </div>

    <div class="row q-mt-sm q-col-gutter-sm">
      <div class="col-3 flex justify-center" v-for="(list, index) in investments_btn" :key="index">
        <q-btn flat class="investment-btn full-width" :to="{ name: 'map_city' }">
          <q-icon class="investment-btn-icon" :name="`img:icons/home-page-icon/investment-icon/${list.icon}`" />
          <p class="investment-btn-label">{{ list.label }}</p>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			investments_btn: [
        {
          label: '아파트',
          icon: 'building.svg',
        },
        {
          label: '연립/다세대',
          icon: 'obstacle.svg',
        },
        {
          label: '단독/다가구',
          icon: 'paint.svg',
        },
        {
          label: '오피스텔',
          icon: 'home.svg',
        },
        {
          label: '토지',
          icon: 'home.svg',
        },
        {
          label: '상업/업무용',
          icon: 'home.svg',
        },
        {
          label: '분양권',
          icon: 'home.svg',
        },
        {
          label: '입주권',
          icon: 'home.svg',
        },
      ]
		}
	},
}
</script>

<style scoped>
.title1 {
  font-family: 'notosanskr-regular';
  font-size: 17px;
}

.investment-btn {
  width: 77px;
  height: 96px;
  background: #FCFCFC;
  border: 1px solid #FDFCFC;
  box-sizing: border-box;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
}

.investment-btn-icon {
  position: absolute;
  top: 0;
  margin-top: 18px;
  width: 32px;
  height: 32px;
}

.investment-btn-label {
  position: absolute;
  top: 0;
  margin-top: 60px;
  text-align: center;
  font-size: 13px
}
</style>