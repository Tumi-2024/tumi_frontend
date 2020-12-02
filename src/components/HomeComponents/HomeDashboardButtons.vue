<template>
  <div class="row">
    <div class="col-6 btn-alignment  flex justify-center items-center">
      <q-btn flat class="btn-dash-board full-width bg-primary" >
        <p class="btn-title1">추천</p>
        <p class="btn-title2">이번주 <br /> 추천급매</p>
        <q-icon class="btn-icon" name="img:icons/home-page-icon/4btns/2.svg" />
      </q-btn>
    </div>
    <div class="col-6 btn-alignment  flex justify-center items-center">
      <q-btn flat :to="{ path:'/map/' }" class="btn-dash-board full-width" style="background-color: #4B62DE" >
        <p class="btn-title1">추천</p>
        <p class="btn-title2">이번주 <br /> 추천급매</p>
        <q-icon class="btn-icon" name="img:icons/home-page-icon/4btns/1.svg" />
      </q-btn>
    </div>
    <div class="col-6 btn-alignment  flex justify-center items-center" style="padding-bottom: 24px">
      <q-btn flat class="btn-dash-board full-width" style="background-color: #00B0E8">
        <p class="btn-title1">추천</p>
        <p class="btn-title2">이번주 <br /> 추천급매</p>
        <q-icon class="btn-icon" name="img:icons/home-page-icon/4btns/3.svg" />
      </q-btn>
    </div>
    <div class="col-6 btn-alignment  flex justify-center items-center" style="padding-bottom: 24px">
      <q-btn flat :to="{ name: 'my_page' }" class="btn-dash-board full-width" style="background-color: #00CE84">
        <p class="btn-title1">추천</p>
        <p class="btn-title2">이번주 <br /> 추천급매</p>
        <q-icon class="btn-icon" name="img:icons/home-page-icon/4btns/4.svg" />
      </q-btn>
    </div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			text: null,
		}
	},
}
</script>

<style>
.btn-dash-board {
  width: 165px;
  min-height: 180px;
  color: #fff;
  border-radius: 12px;
}

.btn-title1 {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 16px;
  margin-left: 16px;
  font-size: 21px;
  font-family: 'notosanskr-medium';
}

.btn-title2 {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 50px;
  margin-left: 16px;
  font-size: 16px;
  font-family: 'notosanskr-regular';
  text-align: justify;
}

.btn-icon {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 108px;
  margin-right: 20px;
  width: 52px;
  height: 52px;
}

.btn-alignment {
  padding-right: 12px;
  padding-bottom: 12px;
}
</style>
