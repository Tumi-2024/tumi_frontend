<template>
    <div class="column">
      <div class="row items-center">
        <template v-for="(row, rIndex) of mainInfo" >
          <span
            class="q-pa-xs justify-start align-start"
            style="flex: 1 1 auto;"
            :key="`col-${rIndex}`"
          >
            <span class="col-text main title">{{row.title}} :&nbsp;&nbsp;&nbsp;</span>
          <q-icon size="16px" v-if="row.isDirection">
            <img src="~assets/icons/sun.svg" />
          </q-icon>
            <span class="col-text main desc">{{row.value}}</span>
          </span>
        </template>
      </div>
      <q-separator />
      <div class="row q-mt-sm">
        <template v-for="(row, rIndex) of subInfo" >
          <span
            class="flex  col-sm-3 col-xs-6 q-px-sm"
            :key="`col-${rIndex}`"
          >
            <span class="col-text">{{row.title}}:&nbsp;&nbsp;&nbsp;</span>
            <span class="col-text">{{row.value}}</span>
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
  .col-text {
    font-size: 12px;
    color:#707070;
    &.main {
      font-size: 14px;
      &.title {
        font-weight: bold;
      }
    }
  }
</style>
