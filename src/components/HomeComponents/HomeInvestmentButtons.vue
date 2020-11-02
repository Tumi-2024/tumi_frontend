<template>
  <div>
    <div class="row q-mt-md q-col-gutter-sm">
      <div class="col">
        <p class="title1">투자 매물 찾기</p>
      </div>
    </div>

    <div class="row q-mt-sm q-col-gutter-sm">
      <div class="col flex justify-center" v-for="(list, index) in investments_btn" :key="index">
        <q-btn flat class="investment-btn full-width">
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
          label: '재개발',
          icon: 'obstacle.svg',
        },
        {
          label: '가로주택',
          icon: 'paint.svg',
        },
        {
          label: '기타매물',
          icon: 'home.svg',
        }
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
  width: 31px;
    height: 18px;
}

.investment-btn-label {
  position: absolute;
  top: 0;
  margin-top: 60px;
  text-align: center;
  font-size: 13px
}
</style>