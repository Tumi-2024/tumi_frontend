<template>
    <div class="column">
      <div class="row items-center">
        <template v-for="(row, rIndex) of mainInfo" >
          <span
            class="q-px-sm justify-start"
            style="flex: 1 1 170px;"
            :key="`col-${rIndex}`"
          >
            <span class="col-main-text bold">{{row.title}} :&nbsp;&nbsp;&nbsp;</span>
          <q-icon size="16px" v-if="row.isDirection">
            <img src="~assets/icons/sun.svg" />
          </q-icon>
            <span class="col-main-text">{{row.value}}</span>
          </span>
        </template>
      </div>
      <q-separator />
      <div class="row q-mt-sm">
        <template v-for="(row, rIndex) of subInfo" >
          <span
            class="flex justify-between col-sm-3 col-xs-6"
            :key="`col-${rIndex}`"
          >
            <span class="col-main-text main">{{row.title}}:</span>
            <span class="col-main-text" :class="{'q-mr-md': rIndex % 4 !== 3}">{{row.value}}</span>
          </span>
        </template>
      </div>
    </div>
</template>
<script>
import { toKr } from "src/utils";

export default {
  props: {
    item: Object
  },
  methods: {
    toKr
  },
  data() {
    return {
      mainInfo: [
        { title: "층수(지상/지하)", value: '11층 / 22층' },
        { title: "방향", value: this.item.type_direction && `${toKr(this.item.type_direction)}향`, isDirection: true },
        { title: "방수/욕실수", value: '3/2' }
      ],
      subInfo: [
        { title: "세대수", value: '200세대' },
        { title: "세대당 주차대수", value: '1.8대' },
        { title: "난방방식", value: '난방방식' },
        { title: "사용승인일", value: '2020.06.10' },
        { title: "대지면적", value: '330m²' },
        { title: "연면적", value: '330m²' },
        { title: "건축면적", value: '330m²' },
        { title: "주건물구조", value: '건물' }
      ]
    }
  }
}
</script>
<style lang="scss">
  .col-main-text {
    font-size: 12px;
    color:#707070;
    &.bold {
      font-weight: bold;
    }
  }
</style>
