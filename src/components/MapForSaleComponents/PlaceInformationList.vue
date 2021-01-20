<template>
  <div class="column">
    <div class="col" v-for="payload">
      <div class="row">
        <div class="col-3 label-info">
          거래유형
        </div>
        <div class="col">
          토지매매
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    payload: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.label-info {
  font-family: 'notosanskr-regular';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -1.05px;
  color: #707070;
}

.field-info {
  font-family: 'notosanskr-regular';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -1.05px;
  color: #1A1A1A;
}

</style>
