<template>
    <div class="row">
      <template v-for="(row, rIndex) of options" >
        <span
          class="flex justify-between col-sm-4 col-6"
          :key="`col-${rIndex}`"
        >
          <span class="col-color">{{row.title}}:</span>
          <span class="col-color q-mr-md">{{row.value}}</span>
        </span>
      </template>
    </div>
</template>
<script>

export default {
  data() {
    return {
      options: [
        { title: "층수(지상/지하)", value: '11층 / 22층' },
        { title: "공용면적", value: '330m²❘100평' },
        { title: "세대수", value: '200세대' },
        { title: "방향", value: '동남향' },
        { title: "전용면적", value: '330m²❘100평' },
        { title: "주차(지상/지하)", value: '200/500' },
        { title: "방수/욕실수", value: '3/2' },
        { title: "엘리베이터 수", value: '4' },
        { title: "난방방식", value: '난방방식' }
      ]
    }
  }
}
</script>
<style>
  .col-color {font-size: 12px; color:#707070}
</style>
